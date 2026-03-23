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

type AnalyticsSummary = {
  totalVisits: number;
  uniqueUsers: number;
  totalDurationSeconds: number;
  averageDurationSeconds: number;
};

const ORDER_STATUSES = ["pending", "processing", "ready_to_ship", "shipped", "delivered", "completed", "cancelled", "failed"];

function secondsToReadable(totalSeconds: number) {
  const sec = Math.max(0, Math.round(totalSeconds));
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;
  return `${minutes}m ${seconds}s`;
}

export default function AdminDashboard() {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4242";
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingOrderId, setSavingOrderId] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
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

      const headers = { Authorization: `Bearer ${session.access_token}` };

      const [ordersResponse, analyticsResponse] = await Promise.all([
        fetch(`${apiUrl}/admin/orders`, { headers }),
        fetch(`${apiUrl}/admin/analytics`, { headers }),
      ]);

      const ordersData = await ordersResponse.json();
      if (!ordersResponse.ok) {
        setError(ordersData.error || "Failed to load orders.");
        setLoading(false);
        return;
      }

      const analyticsData = await analyticsResponse.json();
      if (analyticsResponse.ok) {
        setAnalytics(analyticsData.analytics || null);
      }

      setOrders(ordersData.orders || []);
      setLoading(false);
    };

    loadData();
  }, [apiUrl]);

  const stats = useMemo(() => {
    const delivered = orders.filter((o) => o.status === "delivered").length;
    const gross = orders.reduce((sum, o) => sum + o.total, 0);
    return { totalOrders: orders.length, delivered, gross };
  }, [orders]);

  const updateOrderStatus = async (orderId: string, status: string) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.access_token) {
      setError("Your session expired. Please log in again.");
      return;
    }

    setSavingOrderId(orderId);

    const response = await fetch(`${apiUrl}/admin/orders/${orderId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ status }),
    });

    const data = await response.json();
    if (!response.ok) {
      setError(data.error || "Failed to update status.");
      setSavingOrderId(null);
      return;
    }

    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status } : order)));
    setSavingOrderId(null);
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Track incoming orders, update delivery states, and monitor visitor activity.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="bg-white rounded-xl p-5 border border-blue-100 shadow-sm">
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalOrders}</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-blue-100 shadow-sm">
            <p className="text-sm text-gray-500">Delivered</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.delivered}</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-blue-100 shadow-sm">
            <p className="text-sm text-gray-500">Gross Revenue</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">${stats.gross.toFixed(2)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 border border-blue-100 shadow-sm">
            <p className="text-sm text-gray-500">Site Visits</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{analytics?.totalVisits ?? "—"}</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-blue-100 shadow-sm">
            <p className="text-sm text-gray-500">Unique Logged-in Users</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{analytics?.uniqueUsers ?? "—"}</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-blue-100 shadow-sm">
            <p className="text-sm text-gray-500">Avg Time on Site</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{analytics ? secondsToReadable(analytics.averageDurationSeconds) : "—"}</p>
          </div>
        </div>

        {loading && <p className="text-gray-500">Loading dashboard…</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && (
          <div className="space-y-4">
            {orders.length === 0 && <div className="bg-white rounded-xl p-6 border border-blue-100 text-gray-500">No orders yet.</div>}

            {orders.map((order) => (
              <article key={order.id} className="bg-white rounded-xl p-5 border border-blue-100 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <p className="font-semibold text-gray-900">Order #{order.id.slice(0, 8).toUpperCase()}</p>
                    <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">${order.total.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">User: {order.user_id.slice(0, 8)}…</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
                  <label htmlFor={`status-${order.id}`} className="text-sm text-gray-600 font-medium">
                    Order Status
                  </label>
                  <select
                    id={`status-${order.id}`}
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    disabled={savingOrderId === order.id}
                    className="w-full sm:w-64 border border-gray-300 rounded-lg px-3 py-2 text-sm capitalize"
                  >
                    {ORDER_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status.replaceAll("_", " ")}
                      </option>
                    ))}
                  </select>
                  {savingOrderId === order.id && <span className="text-xs text-gray-500">Saving…</span>}
                </div>

                <div className="mt-4 pt-4 border-t border-blue-50 space-y-2">
                  {order.items.length === 0 && <p className="text-sm text-gray-500">No items found.</p>}
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm text-gray-700 gap-3">
                      <p>
                        {item.product_name} × {item.quantity}
                      </p>
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
