import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Session } from "@supabase/supabase-js";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [session, setSession] = useState<Session | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  // Load saved preference on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleDark = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    setDarkMode(isDark);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => { subscription?.unsubscribe(); };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <nav className="w-full bg-blue-900 dark:bg-gray-950 border-b border-blue-800 dark:border-gray-800 shadow-sm fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO + NAME */}
        <Link to="/" className="flex items-center gap-2.5" aria-label="Eagle Peptide Home">
          <img src={logo} alt="Eagle Peptide Logo" className="h-9 w-auto object-contain" />
          <span className="text-2xl font-extrabold text-white tracking-tight">
            Eagle<span className="text-red-400">Peptide</span>
          </span>
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center gap-6 md:gap-8 text-sm font-medium text-blue-200">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <a href="/#products" className="hover:text-white transition-colors">Products</a>
          <Link to="/about" className="hover:text-white transition-colors">About</Link>

          {/* DARK MODE TOGGLE */}
          <button
            onClick={toggleDark}
            className="text-blue-200 hover:text-white transition-colors text-xl"
            title="Toggle dark mode"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {!session ? (
            <div className="flex items-center gap-6">
              <Link to="/login" className="hover:text-white transition-colors">Login</Link>
              <Link to="/signup" className="px-5 py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition-colors shadow-sm">
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-5 md:gap-6">
              <Link to="/cart" className="hover:text-white transition-colors flex items-center gap-1.5" title="View your cart">
                <span className="hidden sm:inline">Cart</span>
              </Link>
              <Link to="/account" className="text-blue-200 hover:text-white transition-colors text-sm max-w-[140px] truncate" title={session.user.email || "Account"}>
                {session.user.user_metadata?.first_name
                  ? `${session.user.user_metadata.first_name} ${session.user.user_metadata.last_name ?? ""}`.trim()
                  : session.user.email?.split("@")[0] || "Account"}
              </Link>
              <button onClick={handleLogout} className="px-4 py-1.5 border border-red-400 text-red-300 rounded-md font-medium hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}