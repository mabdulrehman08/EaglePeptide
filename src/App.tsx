import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import AuthCallback from "./pages/AuthCallback";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import RequireAuth from "./components/RequireAuth";
import About from "./pages/About";
import AdminDashboard from "./pages/AdminDashboard";
import RequireAdmin from "./components/RequireAdmin";
import { supabase } from "./lib/supabase";

function App() {
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4242";
    const sessionId = crypto.randomUUID();
    const startedAt = Date.now();

    const sendJson = (url: string, payload: Record<string, unknown>, useBeacon = false) => {
      const body = JSON.stringify(payload);
      if (useBeacon && navigator.sendBeacon) {
        const blob = new Blob([body], { type: "application/json" });
        navigator.sendBeacon(url, blob);
        return;
      }

      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: useBeacon,
      }).catch(() => {
        // best-effort analytics only
      });
    };

    supabase.auth.getUser().then(({ data: { user } }) => {
      sendJson(`${apiUrl}/analytics/visit-start`, { sessionId, userId: user?.id || null });
    });

    const onUnload = () => {
      const durationSeconds = Math.round((Date.now() - startedAt) / 1000);
      sendJson(`${apiUrl}/analytics/visit-end`, { sessionId, durationSeconds }, true);
    };

    window.addEventListener("beforeunload", onUnload);
    return () => {
      onUnload();
      window.removeEventListener("beforeunload", onUnload);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 sm:pt-36">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/account" element={<Account />} />
          <Route path="/success" element={<Success />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/cart"
            element={
              <RequireAuth>
                <Cart />
              </RequireAuth>
            }
          />
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminDashboard />
              </RequireAdmin>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
