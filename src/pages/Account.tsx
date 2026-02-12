import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import type { User } from "@supabase/supabase-js";

export default function Account() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        navigate("/login");
      } else {
        setUser(data.user);
      }
    });
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (!user) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading account…
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-16">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>

      <div className="bg-gray-100 rounded-lg p-6 space-y-4">
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{user.email}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">User ID</p>
          <p className="text-xs text-gray-600 break-all">{user.id}</p>
        </div>

        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
