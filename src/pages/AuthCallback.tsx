import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace("#", ""));
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");
    const type = params.get("type");

    if (accessToken && refreshToken) {
      supabase.auth
        .setSession({ access_token: accessToken, refresh_token: refreshToken })
        .then(({ error }) => {
          if (error) {
            setError(error.message);
            return;
          }

          if (type === "recovery") {
            setReady(true);
            return;
          }

          navigate("/account");
        });
      return;
    }

    setError("Invalid or expired auth link. Please request a new one.");
  }, [navigate]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
    } else {
      setUpdated(true);
      setTimeout(() => navigate("/login"), 1500);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm p-8 sm:p-10 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Secure your account</h1>
        <p className="text-sm text-gray-500 mb-6">Set a new password to finish recovery.</p>

        {error && (
          <div className="mb-4 bg-red-50 text-red-700 border border-red-200 rounded-md px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {updated ? (
          <div className="bg-green-50 text-green-700 border border-green-200 rounded-md px-4 py-3 text-sm">
            Password updated successfully. Redirecting to login...
          </div>
        ) : ready ? (
          <form onSubmit={handleUpdate} className="space-y-4">
            <input
              type="password"
              placeholder="New password"
              className="w-full border border-gray-200 px-4 py-2.5 rounded-md text-sm focus:outline-none focus:border-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full border border-gray-200 px-4 py-2.5 rounded-md text-sm focus:outline-none focus:border-blue-400"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2.5 rounded-md font-medium hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update password"}
            </button>
          </form>
        ) : (
          <p className="text-sm text-gray-500">Validating link...</p>
        )}

        <p className="text-sm text-gray-500 mt-6">
          <Link to="/login" className="text-blue-600 hover:underline">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
