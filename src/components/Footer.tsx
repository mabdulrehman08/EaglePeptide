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
            <p className="mt-3 max-w-sm text-blue-200 leading-relaxed">
              Research-focused peptide supply with transparent quality standards,
              methodical processes, and responsive US-based support.
            </p>
            <p className="mt-3 text-xs text-blue-200/90">
              For laboratory research use only. Not for human consumption.
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-white">Quick Links</p>
            <Link to="/" className="block text-blue-200 hover:text-white transition">Home</Link>
            <Link to="/#products" className="block text-blue-200 hover:text-white transition">Shop</Link>
            <Link to="/about" className="block text-blue-200 hover:text-white transition">About</Link>
            <a href="#" className="block text-blue-200 hover:text-white transition">Categories</a>
            <a href="#" className="block text-blue-200 hover:text-white transition">COA</a>
            <a href="#" className="block text-blue-200 hover:text-white transition">Wholesale</a>
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-white">Policies</p>
            <a href="#" className="block text-blue-200 hover:text-white transition">FAQ</a>
            <a href="#" className="block text-blue-200 hover:text-white transition">Shipping & Returns</a>
            <a href="#" className="block text-blue-200 hover:text-white transition">Terms & Conditions</a>
            <a href="#" className="block text-blue-200 hover:text-white transition">Privacy Policy</a>
            <a href="#" className="block text-blue-200 hover:text-white transition">Affiliate Registration</a>
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-white">Contact</p>
            <p className="text-blue-200">Eagle Peptide</p>
            <p className="text-blue-200">6586 W Atlantic Ave Ste #1112</p>
            <p className="text-blue-200">Delray Beach, FL 33446</p>
            <p className="text-blue-200">support@eaglepeptide.com</p>
            <p className="text-blue-200 font-semibold">1-877-711-0702</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-blue-800 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div>
            <p className="font-semibold text-white mb-3">Sign up for updates and offers</p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 px-3 py-2 rounded-md bg-blue-900 text-white placeholder-blue-300/60 border border-blue-800 focus:outline-none focus:border-blue-300 text-sm"
              />
              <button
                type="button"
                className="px-6 py-2 bg-white hover:bg-blue-50 text-blue-900 rounded-md font-semibold transition"
              >
                Send
              </button>
            </form>
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
                  className="w-full sm:w-auto px-6 py-2 bg-white hover:bg-blue-50 text-blue-900 rounded-md font-semibold transition"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-8 bg-blue-800/40 border border-blue-500/40 rounded-lg px-4 py-4 text-blue-100 text-xs sm:text-sm space-y-3 leading-relaxed">
          <p>
            <strong>Research Use Only:</strong> All products on this website are intended strictly for research,
            laboratory, or analytical purposes and are not for human consumption of any kind.
          </p>
          <p>
            Statements on this website have not been evaluated by the U.S. Food and Drug Administration. Products are
            not intended to diagnose, treat, cure, or prevent any disease.
          </p>
          <p>
            By purchasing from Eagle Peptide, you acknowledge responsibility for lawful handling and use in accordance
            with all applicable regulations and laboratory standards.
          </p>
        </div>

        <div className="mt-6 border-t border-blue-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-blue-200/80">
          <p>© {new Date().getFullYear()} EaglePeptide. All rights reserved.</p>
          <p className="text-center">Research Use Only — Not for human or veterinary use.</p>
        </div>
      </div>
    </footer>
  );
}
