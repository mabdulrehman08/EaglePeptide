import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type CartItem = {
  id: string;
  quantity: number;
  products: {
    name: string;
    price: number;
  };
};

export default function Cart() {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4242";
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const loadCart = async () => {
    const { data, error } = await supabase
      .from("cart_items")
      .select("id, quantity, products(name, price)");

    if (error) {
      console.error(error);
    } else {
      setItems(data as any);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity < 1) return;

    await supabase
      .from("cart_items")
      .update({ quantity })
      .eq("id", id);

    loadCart();
  };

  const removeItem = async (id: string) => {
    await supabase
      .from("cart_items")
      .delete()
      .eq("id", id);

    loadCart();
  };

  const handleCheckout = async () => {
    try {
      setCheckoutLoading(true);

      // ✅ Get the logged in user
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        alert("Please log in to checkout.");
        return;
      }

      const response = await fetch(`${apiUrl}/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          userId: user.id,
        }),
      });

      const data = await response.json();

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
    return (
      <p className="py-24 text-center text-gray-500">
        Loading cart…
      </p>
    );
  }

  const total = items.reduce(
    (sum, item) => sum + item.quantity * item.products.price,
    0
  );

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-10 text-gray-900">
          Your Cart
        </h1>

        {items.length === 0 && (
          <div className="bg-white p-10 rounded-xl shadow-sm text-center text-gray-500">
            Your cart is empty.
          </div>
        )}

        {items.length > 0 && (
          <>
            {/* CART ITEMS */}
            <div className="bg-white rounded-2xl shadow-sm divide-y">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 sm:p-6"
                >
                  <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4 sm:block">
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">
                          {item.products.name}
                        </p>
                        <p className="font-semibold text-gray-900 sm:hidden">
                          ${(item.products.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                        >
                          −
                        </button>

                        <span className="font-medium text-gray-900 min-w-6 text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="hidden sm:block font-semibold text-gray-900">
                        $
                        {(item.products.price * item.quantity).toFixed(2)}
                      </p>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-sm text-red-600 hover:text-red-700 mt-2 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* TOTAL + CHECKOUT */}
            <div className="mt-6 sm:mt-10 bg-white rounded-2xl shadow-sm p-5 sm:p-6">
              <div className="flex justify-between text-base sm:text-lg font-semibold text-gray-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="mt-6 w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition shadow-sm disabled:opacity-50"
              >
                {checkoutLoading
                  ? "Redirecting to payment..."
                  : "Proceed to Checkout"}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
