import { Link } from "react-router-dom";

type ProductCardProps = {
  name: string;
  dosage: string;
  vials: number;
  price: string;
  slug: string;
};

export default function ProductCard({
  name,
  dosage,
  vials,
  price,
  slug,
}: ProductCardProps) {
  return (
    <Link to={`/products/${slug}`} className="border rounded-xl p-6 hover:shadow-lg transition block">
      <div className="h-40 bg-gray-100 rounded-lg mb-4 flex items-center justify-center text-gray-400">
        Product Image
      </div>

      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-500 mt-1">
        {dosage} • {vials} vials
      </p>

      <p className="text-xl font-bold mt-4">{price}</p>
    </Link>
  );
}

