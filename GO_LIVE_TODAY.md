# Go-Live Today Roadmap (Eagle Peptide)

This checklist is the fastest path to put ordering live safely today.

## 1) Environment and keys (30 min)

- Confirm frontend env values:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - `VITE_API_URL`
- Confirm backend env values:
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `STRIPE_SECRET_KEY` (live key for production)
  - `STRIPE_WEBHOOK_SECRET` (from production webhook endpoint)
  - `CLIENT_URL` (your real website URL)

## 2) Supabase Auth settings (30–45 min)

In Supabase Dashboard -> Authentication -> URL Configuration:

- Site URL = your production domain
- Add Redirect URLs:
  - `https://your-domain.com`
  - `https://your-domain.com/auth/callback`
  - `http://localhost:5173`
  - `http://localhost:5173/auth/callback`

In Authentication -> Providers:

- Ensure Google provider redirect URL is configured exactly as shown by Supabase.

## 3) Database schema sanity checks (30 min)

Ensure the following tables/columns exist and match backend expectations:

- `orders`: `id`, `user_id`, `total`, `stripe_session_id`, `status`, `created_at`
- `order_items`: `id`, `order_id`, `product_name`, `quantity`, `price`, `created_at`
- `cart_items`: `id`, `user_id`, `product_id`, `quantity`, `created_at`
- `products`: existing product catalog table

## 4) Stripe production setup (30 min)

- Create production webhook endpoint pointing to:
  - `https://your-api-domain.com/webhook`
- Subscribe to event:
  - `checkout.session.completed`
- Copy webhook signing secret into `STRIPE_WEBHOOK_SECRET`.

## 5) End-to-end smoke test (30 min)

1. Create a new user account.
2. Log in with email/password.
3. Add product to cart.
4. Complete checkout.
5. Confirm order row appears in `orders`.
6. Confirm order items appear in `order_items`.
7. Confirm cart is cleared.
8. Confirm order is visible in `/account`.

## 6) Security and trust checks before launch (15 min)

- Enable/verify RLS on user-owned tables.
- Ensure service role key is only on backend server (never frontend).
- Verify HTTPS for app and API.
- Add support email/phone in footer and test contact CTA.

## 7) Launch window plan

- Deploy backend first, then frontend.
- Monitor first 3–5 orders manually in Supabase + Stripe dashboard.
- Keep one person available for support for first 2 hours.

## Recommended next improvements (after launch)

- Add admin orders page (internal view for all orders).
- Add order confirmation email.
- Add analytics for checkout funnel (product click -> add to cart -> checkout started -> paid).
