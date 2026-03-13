import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Footer() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Wire up EmailJS here later
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <footer className="bg-gradient-to-b from-blue-950 to-blue-900 mt-24 border-t border-blue-800">
      <div className="max-w-7xl mx-auto px-6 py-10 text-sm text-white">
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-10">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Eagle Peptides" className="h-8 w-auto" />
              <span className="text-xl font-bold text-white tracking-tight">
                Eagle<span className="text-red-400">Peptide</span>
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-blue-200">
              Premium research peptides manufactured for laboratory and
              research use only.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <p className="font-semibold text-white">Quick Links</p>
            <Link to="/" className="block text-blue-200 hover:text-white transition">Home</Link>
            <Link to="/#products" className="block text-blue-200 hover:text-white transition">Shop</Link>
            <Link to="/about" className="block text-blue-200 hover:text-white transition">About</Link>
          </div>

          {/* Contact Info */}
          <div className="space-y-2">
            <p className="font-semibold text-white">Contact</p>
            <p className="text-blue-200">muhammadabdulrehman513@gmail.com</p>
            <p className="text-blue-200">215-397-5020</p>
          </div>

          {/* Contact Form (desktop/tablet) */}
          <div className="hidden sm:block w-full md:w-80">
            <p className="font-semibold text-white mb-3">Send Us a Message</p>
            {sent ? (
              <div className="bg-green-600 rounded-lg px-4 py-3 text-white text-sm">
                ✅ Message sent! We'll get back to you shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-md bg-blue-900 text-white placeholder-blue-300/60 border border-blue-800 focus:outline-none focus:border-blue-300 text-sm"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-md bg-blue-900 text-white placeholder-blue-300/60 border border-blue-800 focus:outline-none focus:border-blue-300 text-sm"
                />
                <textarea
                  placeholder="Your Message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={3}
                  className="w-full px-3 py-2 rounded-md bg-blue-900 text-white placeholder-blue-300/60 border border-blue-800 focus:outline-none focus:border-blue-300 text-sm resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-white hover:bg-blue-50 text-blue-900 rounded-md font-semibold transition"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Mobile contact CTA */}
        <div className="sm:hidden mt-4">
          <a
            href="mailto:muhammadabdulrehman513@gmail.com"
            className="block w-full text-center py-3 bg-white hover:bg-blue-50 text-blue-900 rounded-md font-semibold transition"
          >
            Contact Us by Email
          </a>
        </div>

        {/* Warning banner */}
        <div className="mt-6 sm:mt-8 bg-blue-800/40 border border-blue-500/40 rounded-lg px-4 py-3 text-blue-100 text-xs sm:text-sm">
          <p>
            ⚠️ <strong>Research Use Only:</strong> Products sold on this website
            are intended strictly for laboratory research purposes. Not for
            human or veterinary use. Must be 18+ to purchase.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 border-t border-blue-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-blue-200/80">
          <p>© {new Date().getFullYear()} EaglePeptide. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms & Conditions</a>
            <a href="#" className="hover:text-white transition">Shipping & Returns</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
