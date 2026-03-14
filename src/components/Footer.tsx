import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Footer() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <footer className="bg-gradient-to-b from-blue-950 to-blue-900 mt-24 border-t border-blue-800">
      <div className="max-w-7xl mx-auto px-6 py-10 text-sm text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Eagle Peptides" className="h-8 w-auto" />
              <span className="text-xl font-bold text-white tracking-tight">
                Eagle<span className="text-blue-200">Peptide</span>
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-slate-300">
              Premium research peptides manufactured for laboratory and
              research use only.
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-white">Quick Links</p>
            <Link to="/" className="block text-slate-300 hover:text-white transition">Home</Link>
            <Link to="/#products" className="block text-slate-300 hover:text-white transition">Shop</Link>
            <Link to="/about" className="block text-slate-300 hover:text-white transition">About</Link>
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-white">Contact</p>
            <p className="text-slate-300">muhammadabdulrehman513@gmail.com</p>
            <p className="text-slate-300">215-397-5020</p>
          </div>

          <div>
            <p className="font-semibold text-white mb-3">Send us a message</p>
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
                  className="w-full px-3 py-2 rounded-md bg-slate-900 text-white placeholder-slate-500 border border-slate-700 focus:outline-none focus:border-slate-400 text-sm"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-md bg-slate-900 text-white placeholder-slate-500 border border-slate-700 focus:outline-none focus:border-slate-400 text-sm"
                />
                <textarea
                  placeholder="Your Message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={3}
                  className="w-full px-3 py-2 rounded-md bg-slate-900 text-white placeholder-slate-500 border border-slate-700 focus:outline-none focus:border-slate-400 text-sm resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-white hover:bg-slate-100 text-slate-900 rounded-md font-semibold transition"
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
            className="block w-full text-center py-3 bg-white hover:bg-slate-100 text-slate-900 rounded-md font-semibold transition"
          >
            Contact Us by Email
          </a>
        </div>

        {/* Warning banner */}
        <div className="mt-6 sm:mt-8 bg-blue-800/40 border border-blue-500/40 rounded-lg px-4 py-3 text-blue-100 text-xs sm:text-sm">
          <p>
            By purchasing from Eagle Peptide, you acknowledge responsibility for lawful handling and use in accordance
            with all applicable regulations and laboratory standards.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 border-t border-blue-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-blue-200/80">
          <p>© {new Date().getFullYear()} EaglePeptide. All rights reserved.</p>
          <p className="text-center">Research Use Only — Not for human or veterinary use.</p>
        </div>
      </div>
    </footer>
  );
}
