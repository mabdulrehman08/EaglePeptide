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

const tickerItems = [
  "RESEARCH PURPOSES ONLY",
  "NOT FOR HUMAN CONSUMPTION",
  "LAB-GRADE COMPOUNDS",
  "COA VERIFICATION AVAILABLE",
  "FAST USA SHIPPING",
];

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
      className="fixed top-0 left-0 right-0 z-50 bg-[#0f141c]/95 backdrop-blur-md border-b border-amber-400/20 shadow-lg"
      aria-label="Main navigation"
    >
      <div className="h-8 bg-black text-[11px] text-amber-100/90 font-semibold uppercase tracking-[0.18em] overflow-hidden border-b border-amber-300/15">
        <div className="marquee-track" aria-hidden="true">
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <span key={`${item}-${idx}`} className="mx-6 inline-block">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="border-b border-amber-300/15 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 text-center text-xs sm:text-sm font-bold">
          <span className="uppercase tracking-[0.12em]">Limited Time Offer:</span>{" "}
          <span className="font-black">10% OFF</span> with code{" "}
          <span className="inline-flex items-center rounded-sm bg-slate-900 px-2 py-0.5 text-yellow-200">EAGLE10</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-amber-300 rounded"
            aria-label="Eagle Peptide Home"
          >
            <img
              src={logo}
              alt="Eagle Peptide Logo"
              className="h-8 sm:h-9 w-auto object-contain"
            />
            <span className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Eagle<span className="text-amber-300">Peptide</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-slate-300">
            <Link to="/" className="hover:text-white transition-colors focus:text-white focus:outline-none focus:ring-2 focus:ring-amber-300 rounded px-1 py-1">Home</Link>
            <Link to="/#products" className="hover:text-white transition-colors focus:text-white focus:outline-none focus:ring-2 focus:ring-amber-300 rounded px-1 py-1">Products</Link>
            <Link to="/about" className="hover:text-white transition-colors focus:text-white focus:outline-none focus:ring-2 focus:ring-amber-300 rounded px-1 py-1">About</Link>

            <button
              onClick={toggleDark}
              className="text-xl hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300 rounded p-1"
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
                <Link to="/login" className="hover:text-white transition-colors focus:text-white focus:outline-none focus:ring-2 focus:ring-amber-300 rounded px-2 py-1">Login</Link>
                <Link to="/signup" className="px-5 py-2 bg-amber-300 text-slate-950 rounded-md font-semibold hover:bg-amber-200 focus:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-colors shadow-sm">Sign Up</Link>
              </div>
            ) : (
              <div className="flex items-center gap-5">
                <Link to="/cart" className="hover:text-white transition-colors focus:text-white focus:outline-none focus:ring-2 focus:ring-amber-300 rounded px-2 py-1">Cart</Link>
                {isAdmin && (
                  <Link to="/admin" className="hover:text-white transition-colors focus:text-white focus:outline-none focus:ring-2 focus:ring-amber-300 rounded px-2 py-1">Dashboard</Link>
                )}
                <Link
                  to="/account"
                  className="text-slate-300 hover:text-white transition-colors focus:text-white focus:outline-none focus:ring-2 focus:ring-amber-300 rounded px-2 py-1 max-w-[160px] truncate"
                  title={displayName}
                >
                  {displayName}
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-1.5 border border-amber-300/60 text-amber-100 rounded-md font-medium hover:bg-amber-200/10 hover:text-white hover:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <div className="flex md:hidden items-center gap-4 text-white">
            <button
              onClick={toggleDark}
              className="text-xl hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300 rounded p-2"
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
              className="p-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-amber-300 touch-manipulation"
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

      <div
        className={`
          md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="px-4 pt-2 pb-5 bg-[#111723]/95 border-t border-amber-300/20 flex flex-col gap-2 text-base font-medium text-white">
          <Link to="/" onClick={closeMenu} className="py-3 px-4 hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:bg-white/10">Home</Link>
          <Link to="/#products" onClick={closeMenu} className="py-3 px-4 hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:bg-white/10">Products</Link>
          <Link to="/about" onClick={closeMenu} className="py-3 px-4 hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:bg-white/10">About</Link>

          <div className="border-t border-amber-300/20 my-2 pt-4 flex flex-col gap-3">
            {!session ? (
              <>
                <Link to="/login" onClick={closeMenu} className="py-3 px-4 hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:bg-white/10">Login</Link>
                <Link to="/signup" onClick={closeMenu} className="py-3 px-4 bg-amber-300 text-slate-900 rounded-lg font-semibold text-center hover:bg-amber-200 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300">Sign Up</Link>
              </>
            ) : (
              <>
                <Link to="/cart" onClick={closeMenu} className="py-3 px-4 hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:bg-white/10">Cart</Link>
                {isAdmin && (
                  <Link to="/admin" onClick={closeMenu} className="py-3 px-4 hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:bg-white/10">Dashboard</Link>
                )}
                <Link to="/account" onClick={closeMenu} className="py-3 px-4 hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:bg-white/10 truncate">{displayName}</Link>
                <button
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                  className="py-3 px-4 border border-amber-300/70 text-white rounded-lg font-medium hover:bg-white/10 hover:border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-colors"
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
