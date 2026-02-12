export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-wide">
          Eagle<span className="text-brand">Peptide</span>
        </h1>

        <div className="flex gap-6 text-sm font-medium">
          <a href="#" className="hover:text-blue-600">Home</a>
          <a href="#" className="hover:text-blue-600">Products</a>
          <a href="#" className="hover:text-blue-600">About</a>
          <a href="#" className="hover:text-blue-600">Contact</a>
        </div>
      </div>
    </nav>
  );
}
