import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { getFrontendPrice, getOriginalPrice } from "../lib/pricing";

type ProductRef = {
  name: string;
  price: number;
  slug?: string;
};

type CartItemRow = {
  id: string;
  quantity: number;
  products: ProductRef | ProductRef[] | null;
};

type CartItem = {
  id: string;
  quantity: number;
  products: ProductRef;
};

export default function Cart() {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4242";
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const loadCart = async () => {
    const { data, error } = await supabase
      .from("cart_items")
      .select("id, quantity, products(name, price, slug)");

    if (error) {
      console.error(error);
    } else {
      const normalized: CartItem[] = ((data ?? []) as CartItemRow[])
        .map((row) => ({
          id: row.id,
          quantity: row.quantity,
          products: Array.isArray(row.products) ? row.products[0] : row.products,
        }))
        .filter((row): row is CartItem => Boolean(row.products));

      const priced = normalized
        .filter((row) => row.products.slug !== "glp-3")
        .map((row) => ({
          ...row,
          products: {
            ...row.products,
            price: getFrontendPrice(row.products.slug, row.products.price),
          },
        }));
      setItems(priced);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity < 1) return;

    await supabase.from("cart_items").update({ quantity }).eq("id", id);

    loadCart();
  };

  const removeItem = async (id: string) => {
    await supabase.from("cart_items").delete().eq("id", id);

    loadCart();
  };

  const handleCheckout = async () => {
    try {
      setCheckoutLoading(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        alert("Please log in to checkout.");
        return;
      }

      const response = await fetch(`${apiUrl}/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ items: [] }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Checkout failed.");
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Checkout failed.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return <p className="py-24 text-center text-gray-500">Loading cart…</p>;
  }

  const total = items.reduce((sum, item) => sum + item.quantity * item.products.price, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-6 sm:mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Your Cart</h1>
            <p className="text-sm text-gray-500 mt-1">{itemCount} item{itemCount !== 1 ? "s" : ""} in your cart</p>
          </div>
        </div>

        {items.length === 0 && (
          <div className="bg-white p-10 rounded-2xl shadow-sm text-center text-gray-500">
            Your cart is empty.
          </div>
        )}

        {items.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm divide-y border border-blue-50">
              {items.map((item) => (
                <div key={item.id} className="p-4 sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">{item.products.name}</p>
                      {item.products.slug !== "bac-water" && (
                        <p className="text-xs text-gray-400 mt-1 line-through">
                          ${getOriginalPrice(item.products.slug, item.products.price).toFixed(2)} each
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">${item.products.price.toFixed(2)} each</p>

                      <div className="flex items-center gap-3 mt-4">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="min-h-[40px] min-w-[40px] px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
                          aria-label={`Decrease ${item.products.name} quantity`}
                        >
                          −
                        </button>

                        <span className="font-semibold text-gray-900 min-w-6 text-center">{item.quantity}</span>

                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="min-h-[40px] min-w-[40px] px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
                          aria-label={`Increase ${item.products.name} quantity`}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="font-semibold text-gray-900 text-base sm:text-lg">
                        ${(item.products.price * item.quantity).toFixed(2)}
                      </p>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-sm text-red-600 hover:text-red-700 mt-2 transition min-h-[40px] px-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-blue-50 p-5 sm:p-6 lg:sticky lg:top-24">
              <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Items</span>
                  <span>{itemCount}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t flex justify-between text-base font-semibold text-gray-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="mt-6 w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition shadow-sm disabled:opacity-50"
              >
                {checkoutLoading ? "Redirecting to payment..." : "Proceed to Checkout"}
              </button>

              <p className="text-xs text-gray-500 mt-3 text-center">
                Secure Stripe checkout. You can enter a coupon/promo code on the Stripe payment page.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
