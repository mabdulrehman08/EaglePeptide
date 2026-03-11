import express from "express";
import Stripe from "stripe";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4242;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const CORS_ORIGINS = (process.env.CORS_ORIGINS || CLIENT_URL)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const REQUIRED_ENV = [
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "SUPABASE_ANON_KEY",
];

for (const key of REQUIRED_ENV) {
  if (!process.env[key]) {
    throw new Error(`Missing ${key}. Add it to your environment variables.`);
  }
}


function getStripeModeFromSecretKey(secretKey) {
  if (typeof secretKey !== "string") return null;
  if (secretKey.startsWith("sk_test_")) return "test";
  if (secretKey.startsWith("sk_live_")) return "live";
  return null;
}

function getStripeModeFromWebhookSecret(webhookSecret) {
  if (typeof webhookSecret !== "string") return null;
  // Stripe webhook secrets are whsec_ in both test + live.
  // Use optional STRIPE_WEBHOOK_MODE to avoid accidental key mixing.
  const explicitMode = process.env.STRIPE_WEBHOOK_MODE;
  if (explicitMode === "test" || explicitMode === "live") return explicitMode;
  return null;
}

function validateStripeModeConfiguration() {
  const keyMode = getStripeModeFromSecretKey(process.env.STRIPE_SECRET_KEY);
  const webhookMode = getStripeModeFromWebhookSecret(process.env.STRIPE_WEBHOOK_SECRET);

  if (!keyMode) {
    throw new Error("Unrecognized STRIPE_SECRET_KEY format. Must start with sk_test_ or sk_live_.");
  }

  if (webhookMode && webhookMode !== keyMode) {
    throw new Error(
      `Stripe mode mismatch: STRIPE_SECRET_KEY is ${keyMode} but STRIPE_WEBHOOK_MODE is ${webhookMode}. Use matching test/test or live/live values.`
    );
  }

  return keyMode;
}

const STRIPE_MODE = validateStripeModeConfiguration();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const supabaseAuth = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (CORS_ORIGINS.includes(origin)) return callback(null, true);
      return callback(new Error("CORS origin not allowed"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const rateLimitStore = new Map();

function applyRateLimit({ key, limit, windowMs }) {
  const now = Date.now();
  const existing = rateLimitStore.get(key);

  if (!existing || existing.expiresAt <= now) {
    rateLimitStore.set(key, { count: 1, expiresAt: now + windowMs });
    return { ok: true };
  }

  existing.count += 1;
  if (existing.count > limit) {
    return { ok: false, retryAfterSec: Math.ceil((existing.expiresAt - now) / 1000) };
  }

  return { ok: true };
}

function getBearerToken(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
  return authHeader.slice(7).trim();
}

async function requireAuthenticatedUser(req, res) {
  const token = getBearerToken(req);
  if (!token) {
    res.status(401).json({ error: "Missing bearer token" });
    return null;
  }

  const { data, error } = await supabaseAuth.auth.getUser(token);
  if (error || !data.user) {
    res.status(401).json({ error: "Invalid authentication token" });
    return null;
  }

  return data.user;
}


async function resolveUserIdFromSession(session) {
  const directUserId = session.metadata?.userId || session.client_reference_id;
  if (directUserId) return directUserId;

  if (!session.id) return null;

  const { data, error } = await supabaseAdmin
    .from("checkout_session_links")
    .select("user_id")
    .eq("stripe_session_id", session.id)
    .maybeSingle();

  if (error) {
    console.error("Checkout session link lookup failed:", error);
    return null;
  }

  return data?.user_id || null;
}

function parseCheckoutRequestBody(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { valid: false, error: "Invalid request body" };
  }

  if (body.items !== undefined && !Array.isArray(body.items)) {
    return { valid: false, error: "items must be an array when provided" };
  }

  return { valid: true };
}

// Webhook BEFORE express.json()
app.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const ip = req.ip || req.socket.remoteAddress || "unknown";
  const throttle = applyRateLimit({ key: `webhook:${ip}`, limit: 120, windowMs: 60_000 });
  if (!throttle.ok) {
    return res.status(429).json({ error: "Too many webhook requests" });
  }

  const sig = req.headers["stripe-signature"];
  if (!sig) {
    return res.status(400).send("Missing Stripe signature");
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = await resolveUserIdFromSession(session);
    const total = (session.amount_total || 0) / 100;

    if (!userId || !session.id) {
      console.error("Missing user linkage for checkout session:", session.id);
      return res.status(200).json({ received: true, skipped: "missing_user_linkage" });
    }

    try {
      // Idempotency guard: if order for this Stripe session exists, acknowledge and exit.
      const { data: existingOrder, error: existingOrderError } = await supabaseAdmin
        .from("orders")
        .select("id")
        .eq("stripe_session_id", session.id)
        .maybeSingle();

      if (existingOrderError) throw existingOrderError;
      if (existingOrder) {
        return res.json({ received: true, idempotent: true });
      }

      const { data: order, error: orderError } = await supabaseAdmin
        .from("orders")
        .insert({
          user_id: userId,
          total,
          stripe_session_id: session.id,
          status: "completed",
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

      const safeItems = lineItems.data
        .filter((item) => typeof item.description === "string" && Number.isInteger(item.quantity || 0))
        .map((item) => ({
          order_id: order.id,
          product_name: item.description,
          quantity: item.quantity,
          price: (item.amount_total || 0) / 100,
        }));

      if (safeItems.length > 0) {
        const { error: itemsError } = await supabaseAdmin.from("order_items").insert(safeItems);
        if (itemsError) throw itemsError;
      }

      const { error: cartError } = await supabaseAdmin
        .from("cart_items")
        .delete()
        .eq("user_id", userId);

      if (cartError) throw cartError;
    } catch (err) {
      console.error("Webhook handler failed:", err);
      return res.status(500).send("Webhook handler error");
    }
  }

  return res.json({ received: true });
});

// express.json AFTER webhook
app.use(express.json({ limit: "100kb" }));

app.post("/create-checkout-session", async (req, res) => {
  const ip = req.ip || req.socket.remoteAddress || "unknown";
  const throttle = applyRateLimit({ key: `checkout:${ip}`, limit: 25, windowMs: 60_000 });
  if (!throttle.ok) {
    res.setHeader("Retry-After", String(throttle.retryAfterSec));
    return res.status(429).json({ error: "Too many checkout attempts" });
  }

  const bodyValidation = parseCheckoutRequestBody(req.body);
  if (!bodyValidation.valid) {
    return res.status(400).json({ error: bodyValidation.error });
  }

  try {
    const user = await requireAuthenticatedUser(req, res);
    if (!user) return;

    // Authoritative pricing and quantity pulled server-side from DB (never trust client body prices/userId).
    const { data: cartRows, error: cartError } = await supabaseAdmin
      .from("cart_items")
      .select("quantity, products(name, price)")
      .eq("user_id", user.id);

    if (cartError) {
      console.error("Cart lookup failed:", cartError);
      return res.status(500).json({ error: "Failed to load cart" });
    }

    if (!cartRows || cartRows.length === 0) {
      return res.status(400).json({ error: "No items in cart" });
    }

    const lineItems = cartRows.map((item) => {
      const name = item.products?.name;
      const price = item.products?.price;
      const quantity = item.quantity;

      if (!name || typeof price !== "number" || !Number.isFinite(price) || !Number.isInteger(quantity) || quantity < 1) {
        throw new Error("Invalid cart data");
      }

      return {
        price_data: {
          currency: "usd",
          product_data: { name },
          unit_amount: Math.round(price * 100),
        },
        quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      client_reference_id: user.id,
      metadata: {
        userId: user.id,
      },
      success_url: `${CLIENT_URL}/success`,
      cancel_url: `${CLIENT_URL}/cancel`,
    });

    const { error: linkError } = await supabaseAdmin.from("checkout_session_links").upsert({
      stripe_session_id: session.id,
      user_id: user.id,
    });

    if (linkError) {
      console.error("Failed to persist checkout session link:", linkError);
    }

    return res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe session error:", error);
    return res.status(500).json({ error: "Failed to create checkout session" });
  }
});

app.listen(PORT, () => console.log(`✅ Stripe server running on port ${PORT} (${STRIPE_MODE} mode)`));
