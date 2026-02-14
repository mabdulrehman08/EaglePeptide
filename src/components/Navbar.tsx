import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Session } from "@supabase/supabase-js";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="w-full bg-blue-900 border-b border-blue-800">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* LOGO + NAME */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Eagle Peptides" className="h-8 w-auto" />
          <span className="text-xl font-bold text-white tracking-tight">
            Eagle<span className="text-red-400">Peptide</span>
          </span>
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center gap-8 text-sm font-medium text-blue-200">
          <Link to="/" className="hover:text-white transition">
            Home
          </Link>
          <Link to="/shop" className="hover:text-white transition">
            Products
          </Link>
          <Link to="/about" className="hover:text-white transition">
            About
          </Link>
          <Link to="/contact" className="hover:text-white transition">
            Contact
          </Link>

          {!session ? (
            <>
              <Link to="/login" className="hover:text-white transition">
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-semibold"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-5">
              <Link to="/cart" className="hover:text-white transition">
                🛒 Cart
              </Link>
              <Link to="/account" className="hover:text-white transition">
                Account
              </Link>
              <span className="text-blue-300 text-xs hidden md:block">
                {session.user.email}
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 border border-red-400 text-red-400 rounded-md hover:bg-red-600 hover:text-white hover:border-red-600 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}