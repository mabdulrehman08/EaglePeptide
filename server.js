import express from "express";
import Stripe from "stripe";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 4242;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY. Add your Stripe test key in .env.");
}

if (!process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error("Missing STRIPE_WEBHOOK_SECRET. Add your Stripe webhook secret in .env.");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ✅ Webhook BEFORE express.json()
app.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata.userId;
    const total = session.amount_total / 100;

    try {
      // Save order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: userId,
          total,
          stripe_session_id: session.id,
          status: "paid",
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Fetch line items from Stripe
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

      // Save order items
      const { error: itemsError } = await supabase.from("order_items").insert(
        lineItems.data.map((item) => ({
          order_id: order.id,
          product_name: item.description,
          quantity: item.quantity,
          price: item.amount_total / 100,
        }))
      );

      if (itemsError) throw itemsError;

      // Clear cart
      const { error: cartError } = await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", userId);

      if (cartError) throw cartError;

    } catch (err) {
      console.error("Webhook handler failed:", err);
      return res.status(500).send("Webhook handler error");
    }
  }

  res.json({ received: true });
});

// ✅ express.json() AFTER webhook
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { items, userId } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "No items in cart" });
    }

    if (!userId) {
      return res.status(400).json({ error: "User not logged in" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.products.name,
          },
          unit_amount: Math.round(item.products.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      metadata: {
        userId,
      },
      success_url: `${CLIENT_URL}/success`,
      cancel_url: `${CLIENT_URL}/cart`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe session error:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

app.listen(PORT, () => console.log(`✅ Stripe server running on port ${PORT}`));
