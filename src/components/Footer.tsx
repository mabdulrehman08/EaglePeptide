export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-10 text-sm text-gray-600">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <h3 className="font-semibold text-gray-900">EaglePeptide</h3>
            <p className="mt-2 max-w-sm">
              Premium research peptides manufactured for laboratory and
              research use only.
            </p>
          </div>

          <div className="space-y-2">
            <p>Contact</p>
            <p>Email: support@eaglepeptide.com</p>
          </div>
        </div>

        <div className="mt-8 text-xs text-gray-500 border-t pt-6">
          <p>
            ⚠️ <strong>Research Use Only:</strong> Products sold on this website
            are intended strictly for laboratory research purposes. Not for
            human or veterinary use. Must be 18+ to purchase.
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} EaglePeptide. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
