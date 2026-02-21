import { Link } from "react-router-dom";

type ProductCardProps = {
  name: string;
  dosage: string;
  vials: number;
  price: string;
  slug: string;
  image: string;
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
      className="min-w-[240px] bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 hover:shadow-xl transition block flex-shrink-0"
    >
      <div className="h-48 bg-pink-50 dark:bg-gray-700 rounded-xl mb-4 overflow-hidden flex items-center justify-center">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-contain p-2"
        />
      </div>

      <h3 className="text-base font-semibold text-gray-900 dark:text-white">{name}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        {dosage} • {vials} vial{vials > 1 ? "s" : ""}
      </p>
      <p className="text-xl font-bold text-blue-900 dark:text-blue-400 mt-3">{price}</p>

      <div className="mt-3 text-xs text-gray-400 dark:text-gray-500">Research Use Only</div>
    </Link>
  );
}