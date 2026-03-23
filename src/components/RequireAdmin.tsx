import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { isAdminEmail } from "../lib/admin";

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function RequireAdmin({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      setAuthorized(Boolean(session?.user?.email && isAdminEmail(session.user.email)));
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setAuthorized(Boolean(session?.user?.email && isAdminEmail(session.user.email)));
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <p className="py-20 text-center text-gray-500">Checking admin access…</p>;
  }

  if (!authorized) {
    return <Navigate to="/account" replace />;
  }

  return <>{children}</>;
}
