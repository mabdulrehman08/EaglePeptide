# Supabase Deploy-Today Checklist (Orders Must Work)

Run this in Supabase SQL Editor **before deploy**.

## 1) Required schema + constraints

```sql
-- UUID helper
create extension if not exists pgcrypto;

-- Orders table
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  total numeric(10,2) not null check (total >= 0),
  stripe_session_id text not null,
  status text not null default 'completed',
  created_at timestamptz not null default now()
);

alter table public.orders
  add constraint if not exists orders_stripe_session_id_key unique (stripe_session_id);

-- Order items
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_name text not null,
  quantity int not null check (quantity > 0),
  price numeric(10,2) not null check (price >= 0),
  created_at timestamptz not null default now()
);

-- Cart items
create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  quantity int not null check (quantity > 0),
  created_at timestamptz not null default now()
);

-- Session linkage fallback for webhook reliability
create table if not exists public.checkout_session_links (
  stripe_session_id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create index if not exists idx_orders_user_id_created_at on public.orders(user_id, created_at desc);
create index if not exists idx_order_items_order_id on public.order_items(order_id);
create index if not exists idx_cart_items_user_id on public.cart_items(user_id);
```

## 2) Enable RLS + policies (critical for `/account` to show orders)

```sql
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.cart_items enable row level security;

-- Drop old conflicting policies
DROP POLICY IF EXISTS "orders_select_own" ON public.orders;
DROP POLICY IF EXISTS "order_items_select_own" ON public.order_items;
DROP POLICY IF EXISTS "cart_items_select_own" ON public.cart_items;
DROP POLICY IF EXISTS "cart_items_insert_own" ON public.cart_items;
DROP POLICY IF EXISTS "cart_items_update_own" ON public.cart_items;
DROP POLICY IF EXISTS "cart_items_delete_own" ON public.cart_items;

-- Orders: users can read only their own orders
create policy "orders_select_own"
on public.orders for select
using (auth.uid() = user_id);

-- Order items: users can read items for their own orders
create policy "order_items_select_own"
on public.order_items for select
using (
  exists (
    select 1
    from public.orders o
    where o.id = order_items.order_id
      and o.user_id = auth.uid()
  )
);

-- Cart items: users can fully manage only their own cart rows
create policy "cart_items_select_own"
on public.cart_items for select
using (auth.uid() = user_id);

create policy "cart_items_insert_own"
on public.cart_items for insert
with check (auth.uid() = user_id);

create policy "cart_items_update_own"
on public.cart_items for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "cart_items_delete_own"
on public.cart_items for delete
using (auth.uid() = user_id);
```

## 3) Fast verification queries (copy/paste)

```sql
-- Verify tables exist
select table_name
from information_schema.tables
where table_schema = 'public'
  and table_name in ('orders','order_items','cart_items','checkout_session_links')
order by table_name;

-- Verify key columns exist
select table_name, column_name
from information_schema.columns
where table_schema='public'
  and table_name in ('orders','order_items','cart_items','checkout_session_links')
order by table_name, ordinal_position;

-- Verify Stripe session id uniqueness
select conname, conrelid::regclass as table_name
from pg_constraint
where contype='u'
  and conrelid='public.orders'::regclass;

-- Verify RLS enabled
select relname, relrowsecurity
from pg_class
where relname in ('orders','order_items','cart_items');
```

## 4) End-to-end smoke test (must pass)

1. Sign up a fresh test user.
2. Add one product to cart.
3. Checkout with Stripe test card.
4. Confirm one row in `orders` with matching `stripe_session_id`.
5. Confirm rows in `order_items` for that order.
6. Confirm cart rows deleted from `cart_items`.
7. Confirm `/account` shows the order for the same user.

If step 7 fails while step 4 passes, your issue is almost always RLS policy mismatch.
