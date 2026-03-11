import { Link } from "react-router-dom";

type ProductCardProps = {
  name: string;
  dosage: string;
  vials: number;
  price: string;
  slug: string;
  image: string;
  description?: string;
};

export default function ProductCard({
  name,
  dosage,
  vials,
  price,
  slug,
  image,
  description,
}: ProductCardProps) {
  return (
    <Link
      to={`/products/${slug}`}
      className="group w-full max-w-sm bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 sm:p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 block"
    >
      <div className="aspect-square bg-gradient-to-br from-pink-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-xl mb-4 overflow-hidden flex items-center justify-center">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = "/fallback-product.jpg";
          }}
        />
      </div>

      <h3 className="text-base font-semibold text-gray-900 dark:text-white leading-snug">
        {name}
      </h3>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        {dosage} • {vials} vial{vials !== 1 ? "s" : ""}
      </p>

      {description && (
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-3 min-h-[60px]">
          {description}
        </p>
      )}

      <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{price}</p>
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
          Research Use Only
        </span>
      </div>
    </Link>
  );
}
