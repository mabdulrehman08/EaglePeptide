import { Link } from "react-router-dom";

type ProductCardProps = {
  name: string;
  dosage: string;
  vials: number;
  price: string;
  slug: string;
  image: string;           // usually a URL string after build
};

export default function ProductCard({
  name,
  dosage,
  vials,
  price,
  slug,
  image,
}: ProductCardProps) {
  return (
    <Link
      to={`/products/${slug}`}
      className="w-full max-w-sm bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 sm:p-5 hover:shadow-xl transition block"
    >
      {/* aspect-square keeps all cards the same height on mobile */}
      <div className="aspect-square bg-pink-50 dark:bg-gray-700 rounded-xl mb-4 overflow-hidden flex items-center justify-center">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-contain p-2"
          // Small improvement: prevent broken image layout
          onError={(e) => {
            e.currentTarget.src = "/fallback-product.jpg"; // ← add your own fallback if you have one
            // or use a placeholder like: "https://via.placeholder.com/300?text=Image"
          }}
        />
      </div>

      <h3 className="text-base font-semibold text-gray-900 dark:text-white leading-snug">
        {name}
      </h3>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        {dosage} • {vials} vial{vials !== 1 ? "s" : ""}
      </p>

      {/* Price now separated by a border so it's always visible */}
      <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{price}</p>
        <span className="text-xs text-gray-400 dark:text-gray-500">Research Use Only</span>
      </div>
    </Link>
  );
}