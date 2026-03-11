# Eagle Peptide

This project now includes Stripe Checkout integration in **test mode**.

## 1) Install dependencies

```bash
npm install
```

If you get `Cannot find package 'express'` (or `stripe`, `cors`, `dotenv`) when running `npm run server`, dependencies were not installed yet.

## 2) Configure environment variables

Use pre-split templates to avoid mixing local and production keys:

```bash
cp .env.local.example .env
```

For production deployment, use `.env.production.example` as your reference (do **not** copy test keys to production).

Stripe values for local:
- `STRIPE_SECRET_KEY=sk_test_...`
- `STRIPE_WEBHOOK_SECRET=whsec_...`
- `STRIPE_WEBHOOK_MODE=test`

Stripe values for production:
- `STRIPE_SECRET_KEY=sk_live_...`
- `STRIPE_WEBHOOK_SECRET=whsec_...`
- `STRIPE_WEBHOOK_MODE=live`

## 3) Run the frontend and backend

Frontend:

```bash
npm run dev
```

Backend (Stripe checkout API + webhook):

```bash
npm run server
```

## 4) Local webhook forwarding (Stripe CLI)

```bash
stripe listen --forward-to localhost:4242/webhook
```

Copy the generated webhook signing secret into `STRIPE_WEBHOOK_SECRET`.

## Notes

- Checkout session endpoint: `POST /create-checkout-session`
- Webhook endpoint: `POST /webhook`
- Success redirect: `${CLIENT_URL}/success`
- Cancel redirect: `${CLIENT_URL}/cart`


## 5) Production "Checkout failed" quick checks

If local works but live checkout fails, check these in order:

1. **Frontend API target**: `VITE_API_URL` must point to your deployed backend API domain (not the frontend domain).
2. **Backend CORS allowlist**: set `CORS_ORIGINS` to include every frontend origin you use (e.g. `https://your-domain.com,https://www.your-domain.com`).
3. **Stripe key mode match**: production must be `sk_live_...` with `STRIPE_WEBHOOK_MODE=live`.
4. **Webhook secret match**: production webhook secret must be from the live Stripe webhook endpoint.
5. **Backend required env vars**: ensure `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_URL`, and Stripe env vars exist.

The cart page now logs API status + payload in browser console when checkout fails to speed up production debugging.
