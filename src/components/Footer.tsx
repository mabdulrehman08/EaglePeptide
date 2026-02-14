export default function Footer() {
  return (
    <footer className="bg-blue-900 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-10 text-sm text-white">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          
          {/* Brand */}
          <div>
            <h3 className="font-bold text-xl text-white tracking-wide">
              🦅 EaglePeptide
            </h3>
            <p className="mt-2 max-w-sm text-blue-200">
              Premium research peptides manufactured for laboratory and
              research use only.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-2">
            <p className="font-semibold text-white">Quick Links</p>
            <p className="text-blue-200 hover:text-white cursor-pointer transition">Home</p>
            <p className="text-blue-200 hover:text-white cursor-pointer transition">Shop</p>
            <p className="text-blue-200 hover:text-white cursor-pointer transition">About</p>
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <p className="font-semibold text-white">Contact</p>
            <p className="text-blue-200">support@eaglepeptide.com</p>
            <p className="text-blue-200">1-800-EAGLE-01</p>
          </div>
        </div>

        {/* Warning banner */}
        <div className="mt-8 bg-red-600 rounded-lg px-4 py-3 text-white text-xs">
          <p>
            ⚠️ <strong>Research Use Only:</strong> Products sold on this website
            are intended strictly for laboratory research purposes. Not for
            human or veterinary use. Must be 18+ to purchase.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 border-t border-blue-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-blue-300">
          <p>© {new Date().getFullYear()} EaglePeptide. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer transition">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition">Terms & Conditions</span>
            <span className="hover:text-white cursor-pointer transition">Shipping & Returns</span>
          </div>
        </div>
      </div>
    </footer>
  );
}