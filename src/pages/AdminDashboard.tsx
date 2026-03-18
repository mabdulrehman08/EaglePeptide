import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

type AdminOrderItem = {
  id: string;
  order_id: string;
  product_name: string;
  quantity: number;
  price: number;
  created_at: string;
};

type AdminOrder = {
  id: string;
  user_id: string;
  total: number;
  status: string;
  stripe_session_id: string;
  created_at: string;
  items: AdminOrderItem[];
};

export default function AdminDashboard() {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4242";
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      setError(null);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        setError("Please log in to view admin dashboard.");
        setLoading(false);
        return;
      }

      const response = await fetch(`${apiUrl}/admin/orders`, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Failed to load orders.");
        setLoading(false);
        return;
      }

      setOrders(data.orders || []);
      setLoading(false);
    };

    loadOrders();
  }, [apiUrl]);

  const stats = useMemo(() => {
    const completed = orders.filter((o) => o.status === "completed").length;
    const gross = orders.reduce((sum, o) => sum + o.total, 0);
    return { totalOrders: orders.length, completed, gross };
  }, [orders]);

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Track incoming orders, revenue, and order line items in one place.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 border border-blue-100 shadow-sm">
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalOrders}</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-blue-100 shadow-sm">
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.completed}</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-blue-100 shadow-sm">
            <p className="text-sm text-gray-500">Gross Revenue</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">${stats.gross.toFixed(2)}</p>
          </div>
        </div>

        {loading && <p className="text-gray-500">Loading orders…</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && (
          <div className="space-y-4">
            {orders.length === 0 && (
              <div className="bg-white rounded-xl p-6 border border-blue-100 text-gray-500">No orders yet.</div>
            )}

            {orders.map((order) => (
              <article key={order.id} className="bg-white rounded-xl p-5 border border-blue-100 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <p className="font-semibold text-gray-900">Order #{order.id.slice(0, 8).toUpperCase()}</p>
                    <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">${order.total.toFixed(2)}</p>
                    <p className="text-xs text-gray-500 capitalize">{order.status}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-blue-50 space-y-2">
                  {order.items.length === 0 && <p className="text-sm text-gray-500">No items found.</p>}
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm text-gray-700 gap-3">
                      <p>{item.product_name} × {item.quantity}</p>
                      <p>${item.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
