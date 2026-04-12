import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Session } from "@supabase/supabase-js";
import logo from "../assets/logo.png";
import { isAdminEmail } from "../lib/admin";

function getDisplayName(session: Session | null) {
  if (!session?.user) return "Account";

  const fullName = session.user.user_metadata?.full_name;
  if (typeof fullName === "string" && fullName.trim()) return fullName.trim();

  const firstName = session.user.user_metadata?.first_name;
  const lastName = session.user.user_metadata?.last_name;
  if (typeof firstName === "string" && firstName.trim()) {
    const combined = `${firstName} ${typeof lastName === "string" ? lastName : ""}`.trim();
    if (combined) return combined;
  }

  const email = session.user.email || "";
  const localPart = email.split("@")[0];
  return localPart || "Account";
}

export default function Navbar() {
  const [session, setSession] = useState<Session | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else if (saved === null) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
        setDarkMode(true);
        localStorage.setItem("theme", "dark");
      }
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

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription?.unsubscribe();
  }, []);

  const isAdmin = useMemo(() => isAdminEmail(session?.user?.email), [session]);
  const displayName = getDisplayName(session);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setMenuOpen(false);
    navigate("/");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-blue-800/95 backdrop-blur-md border-b border-blue-700/70 shadow-sm"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-slate-400 rounded"
            aria-label="Eagle Peptide Home"
          >
            <img
              src={logo}
              alt="Eagle Peptide Logo"
              className="h-8 sm:h-9 w-auto object-contain"
            />
            <span className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Eagle<span className="text-blue-200">Peptide</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-slate-300">
            <Link to="/" className="hover:text-white transition-colors focus:text-white focus:outline-none focus:ring-2 focus:ring-slate-400 rounded px-1 py-1">Home</Link>
            <Link to="/#products" className="hover:text-white transition-colors focus:text-white focus:outline-none focus:ring-2 focus:ring-slate-400 rounded px-1 py-1">Products</Link>
            <Link to="/about" className="hover:text-white transition-colors focus:text-white focus:outline-none focus:ring-2 focus:ring-slate-400 rounded px-1 py-1">About</Link>

            <button
              onClick={toggleDark}
              className="text-xl hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 rounded p-1"
              title="Toggle dark mode"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3c-.02.16-.03.32-.03.49a8 8 0 0 0 8.33 8.3c.5 0 1-.03 1.49-.1Z" />
                </svg>
              )}
            </button>

            {!session ? (
              <div className="flex items-center gap-5">
                <Link to="/login" className="hover:text-white transition-colors focus:text-white focus:outline-none focus:ring-2 focus:ring-slate-400 rounded px-2 py-1">Login</Link>
                <Link to="/signup" className="px-5 py-2 bg-white text-slate-900 rounded-md font-semibold hover:bg-slate-100 focus:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors shadow-sm">Sign Up</Link>
              </div>
            ) : (
              <div className="flex items-center gap-5">
                <Link to="/cart" className="hover:text-white transition-colors focus:text-white focus:outline-none focus:ring-2 focus:ring-slate-400 rounded px-2 py-1">Cart</Link>
                {isAdmin && (
                  <Link to="/admin" className="hover:text-white transition-colors focus:text-white focus:outline-none focus:ring-2 focus:ring-slate-400 rounded px-2 py-1">Dashboard</Link>
                )}
                <Link
                  to="/account"
                  className="text-slate-300 hover:text-white transition-colors focus:text-white focus:outline-none focus:ring-2 focus:ring-slate-400 rounded px-2 py-1 max-w-[160px] truncate"
                  title={displayName}
                >
                  {displayName}
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-1.5 border border-slate-500 text-slate-200 rounded-md font-medium hover:bg-slate-800 hover:text-white hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={toggleDark}
              className="text-xl hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 rounded p-2"
              title="Toggle dark mode"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3c-.02.16-.03.32-.03.49a8 8 0 0 0 8.33 8.3c.5 0 1-.03 1.49-.1Z" />
                </svg>
              )}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-slate-400 touch-manipulation"
              aria-label="Toggle mobile menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-blue-700/70 bg-blue-900/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 text-center text-xs sm:text-sm text-blue-100 font-medium">
          <span className="font-semibold text-white">15% Discount Coupon:</span> Use code <span className="font-bold text-yellow-300">PSL15</span> • Shipping now available in <span className="text-white">USA & UK</span>
        </div>
      </div>

      <div
        className={`
          md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="px-4 pt-2 pb-5 bg-blue-800/95 border-t border-blue-700/70 flex flex-col gap-2 text-base font-medium text-white">
          <Link to="/" onClick={closeMenu} className="py-3 px-4 hover:bg-blue-700/60 rounded-lg transition-colors focus:outline-none focus:bg-blue-700/60">Home</Link>
          <Link to="/#products" onClick={closeMenu} className="py-3 px-4 hover:bg-blue-700/60 rounded-lg transition-colors focus:outline-none focus:bg-blue-700/60">Products</Link>
          <Link to="/about" onClick={closeMenu} className="py-3 px-4 hover:bg-blue-700/60 rounded-lg transition-colors focus:outline-none focus:bg-blue-700/60">About</Link>

          <div className="border-t border-blue-700/70 my-2 pt-4 flex flex-col gap-3">
            {!session ? (
              <>
                <Link to="/login" onClick={closeMenu} className="py-3 px-4 hover:bg-blue-700/60 rounded-lg transition-colors focus:outline-none focus:bg-blue-700/60">Login</Link>
                <Link to="/signup" onClick={closeMenu} className="py-3 px-4 bg-white text-blue-800 rounded-lg font-semibold text-center hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300">Sign Up</Link>
              </>
            ) : (
              <>
                <Link to="/cart" onClick={closeMenu} className="py-3 px-4 hover:bg-blue-700/60 rounded-lg transition-colors focus:outline-none focus:bg-blue-700/60">Cart</Link>
                {isAdmin && (
                  <Link to="/admin" onClick={closeMenu} className="py-3 px-4 hover:bg-blue-700/60 rounded-lg transition-colors focus:outline-none focus:bg-blue-700/60">Dashboard</Link>
                )}
                <Link to="/account" onClick={closeMenu} className="py-3 px-4 hover:bg-blue-700/60 rounded-lg transition-colors focus:outline-none focus:bg-blue-700/60 truncate">{displayName}</Link>
                <button
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                  className="py-3 px-4 border border-blue-500 text-white rounded-lg font-medium hover:bg-blue-700 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
