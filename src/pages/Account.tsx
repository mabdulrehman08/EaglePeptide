import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import type { User } from "@supabase/supabase-js";

type Order = {
  id: string;
  total: number;
  status: string;
  created_at: string;
};

export default function Account() {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Get current session (fast initial render)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        navigate("/login");
        return;
      }
      setUser(session.user);
      loadOrders(session.user.id);
    });

    // 2. Listen for future auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        navigate("/login");
        setUser(null);
        setOrders([]);
      } else {
        setUser(session.user);
        loadOrders(session.user.id);
      }
    });

    // Cleanup
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const loadOrders = async (userId: string) => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("orders")
      .select("id, total, status, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to load orders:", error);
      setError("Could not load your orders. Please try again later.");
    } else {
      setOrders(data || []);
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Redirecting...
      </div>
    );
  }

  const firstName = (user.user_metadata?.first_name as string) || "";
  const lastName = (user.user_metadata?.last_name as string) || "";
  const fullName = `${firstName} ${lastName}`.trim();

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {firstName ? `Welcome back, ${firstName}!` : "My Account"}
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your profile and view your order history.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-5 py-2 border border-red-400 text-red-600 rounded-md hover:bg-red-600 hover:text-white transition font-medium text-sm shadow-sm"
          >
            Logout
          </button>
        </div>

        {/* Profile */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {fullName && (
              <>
                <div>
                  <p className="text-sm text-gray-500 mb-1">First Name</p>
                  <p className="font-medium text-gray-900">{firstName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Last Name</p>
                  <p className="font-medium text-gray-900">{lastName}</p>
                </div>
              </>
            )}
            <div>
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <p className="font-medium text-gray-900 break-all">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Member Since</p>
              <p className="font-medium text-gray-900">
                {new Date(user.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Order History</h2>

          {loading ? (
            <p className="text-gray-500 text-center py-10">Loading your orders…</p>
          ) : error ? (
            <p className="text-red-600 text-center py-10">{error}</p>
          ) : orders.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-5xl mb-4">📦</p>
              <p className="text-lg font-medium mb-2">No orders yet</p>
              <p className="text-sm mb-6">Start shopping to see your orders here!</p>
              <a
                href="/#products"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition shadow-sm"
              >
                Shop Now
              </a>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <p className="text-base font-medium text-gray-900">
                      Order #{order.id.slice(0, 8).toUpperCase()}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(order.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      ${order.total.toFixed(2)}
                    </p>
                    <span
                      className={`text-xs px-3 py-1 mt-2 inline-block rounded-full capitalize font-medium ${
                        order.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : order.status === "pending" || order.status === "processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "cancelled" || order.status === "failed"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}