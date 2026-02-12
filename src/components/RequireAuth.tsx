import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import type { User } from "@supabase/supabase-js";

export default function RequireAuth({ children }: { children: JSX.Element }) {
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

  if (!user) {
    return (
      <div className="py-20 text-center text-gray-500">
        Checking authentication…
      </div>
    );
  }

  return children;
}
