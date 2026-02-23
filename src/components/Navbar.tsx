import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Session } from "@supabase/supabase-js";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [session, setSession] = useState<Session | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Theme persistence
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else if (saved === null) {
      // Optional: system preference fallback
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

  // Auth listener
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setMenuOpen(false);
    navigate("/");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-blue-900/95 dark:bg-gray-950/95 backdrop-blur-sm border-b border-blue-800/50 dark:border-gray-800/50 shadow-sm"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
            aria-label="Eagle Peptide Home"
          >
            <img
              src={logo}
              alt="Eagle Peptide Logo"
              className="h-8 sm:h-9 w-auto object-contain"
            />
            <span className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Eagle<span className="text-red-400">Peptide</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-blue-200">
            <Link
              to="/"
              className="hover:text-white transition-colors focus:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-1 py-1"
            >
              Home
            </Link>
            <a
              href="/#products"
              className="hover:text-white transition-colors focus:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-1 py-1"
            >
              Products
            </a>
            <Link
              to="/about"
              className="hover:text-white transition-colors focus:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-1 py-1"
            >
              About
            </Link>

            <button
              onClick={toggleDark}
              className="text-xl hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded p-1"
              title="Toggle dark mode"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            {!session ? (
              <div className="flex items-center gap-5">
                <Link
                  to="/login"
                  className="hover:text-white transition-colors focus:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-2 py-1"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 focus:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors shadow-sm"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-5">
                <Link
                  to="/cart"
                  className="hover:text-white transition-colors focus:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-2 py-1"
                >
                  Cart
                </Link>
                <Link
                  to="/account"
                  className="text-blue-200 hover:text-white transition-colors focus:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-2 py-1 max-w-[160px] truncate"
                  title={session.user.email || "Account"}
                >
                  {session.user.user_metadata?.first_name
                    ? `${session.user.user_metadata.first_name} ${
                        session.user.user_metadata.last_name ?? ""
                      }`.trim()
                    : session.user.email?.split("@")[0] || "Account"}
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-1.5 border border-red-400 text-red-300 rounded-md font-medium hover:bg-red-600 hover:text-white hover:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile: Dark toggle + Hamburger */}
          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={toggleDark}
              className="text-xl hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded p-2"
              title="Toggle dark mode"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 touch-manipulation"
              aria-label="Toggle mobile menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                // X icon
                <svg
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Hamburger
                <svg
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Slide down with animation */}
      <div
        className={`
          md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="px-4 pt-2 pb-5 bg-blue-900/95 dark:bg-gray-950/95 border-t border-blue-800/50 dark:border-gray-800/50 flex flex-col gap-2 text-base font-medium text-blue-100">
          <Link
            to="/"
            onClick={closeMenu}
            className="py-3 px-4 hover:bg-blue-800/50 dark:hover:bg-gray-800/50 rounded-lg transition-colors focus:outline-none focus:bg-blue-800/50"
          >
            Home
          </Link>
          <a
            href="/#products"
            onClick={closeMenu}
            className="py-3 px-4 hover:bg-blue-800/50 dark:hover:bg-gray-800/50 rounded-lg transition-colors focus:outline-none focus:bg-blue-800/50"
          >
            Products
          </a>
          <Link
            to="/about"
            onClick={closeMenu}
            className="py-3 px-4 hover:bg-blue-800/50 dark:hover:bg-gray-800/50 rounded-lg transition-colors focus:outline-none focus:bg-blue-800/50"
          >
            About
          </Link>

          <div className="border-t border-blue-800/50 dark:border-gray-700/50 my-2 pt-4 flex flex-col gap-3">
            {!session ? (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="py-3 px-4 hover:bg-blue-800/50 dark:hover:bg-gray-800/50 rounded-lg transition-colors focus:outline-none focus:bg-blue-800/50"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={closeMenu}
                  className="py-3 px-4 bg-red-600 text-white rounded-lg font-semibold text-center hover:bg-red-700 focus:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/cart"
                  onClick={closeMenu}
                  className="py-3 px-4 hover:bg-blue-800/50 dark:hover:bg-gray-800/50 rounded-lg transition-colors focus:outline-none focus:bg-blue-800/50"
                >
                  Cart
                </Link>
                <Link
                  to="/account"
                  onClick={closeMenu}
                  className="py-3 px-4 hover:bg-blue-800/50 dark:hover:bg-gray-800/50 rounded-lg transition-colors focus:outline-none focus:bg-blue-800/50 truncate"
                >
                  {session.user.user_metadata?.first_name
                    ? `${session.user.user_metadata.first_name} ${
                        session.user.user_metadata.last_name ?? ""
                      }`.trim()
                    : session.user.email?.split("@")[0] || "Account"}
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                  className="py-3 px-4 border border-red-400 text-red-300 rounded-lg font-medium hover:bg-red-600 hover:text-white hover:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors"
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