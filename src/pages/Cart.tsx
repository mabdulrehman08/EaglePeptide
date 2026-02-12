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

      const response = await fetch(
        "http://localhost:4242/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items,
            userId: user.id, // ✅ Added userId
          }),
        }
      );

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
    <section className="py-28 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-10 text-gray-900">
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
                  className="flex justify-between items-center p-6"
                >
                  <div>
                    <p className="font-semibold text-gray-900">
                      {item.products.name}
                    </p>

                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                      >
                        −
                      </button>

                      <span className="font-medium text-gray-900">
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

                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
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
              ))}
            </div>

            {/* TOTAL + CHECKOUT */}
            <div className="mt-10 bg-white rounded-2xl shadow-sm p-6">
              <div className="flex justify-between text-lg font-semibold text-gray-900">
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