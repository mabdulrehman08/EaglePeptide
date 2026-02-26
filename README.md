# Eagle Peptide

This project now includes Stripe Checkout integration in **test mode**.

## 1) Configure environment variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Use Stripe test keys for now:
- `STRIPE_SECRET_KEY=sk_test_...`
- `STRIPE_WEBHOOK_SECRET=whsec_...`

## 2) Run the frontend and backend

Frontend:

```bash
npm run dev
```

Backend (Stripe checkout API + webhook):

```bash
npm run server
```

## 3) Local webhook forwarding (Stripe CLI)

```bash
stripe listen --forward-to localhost:4242/webhook
```

Copy the generated webhook signing secret into `STRIPE_WEBHOOK_SECRET`.

## Notes

- Checkout session endpoint: `POST /create-checkout-session`
- Webhook endpoint: `POST /webhook`
- Success redirect: `${CLIENT_URL}/success`
- Cancel redirect: `${CLIENT_URL}/cart`
