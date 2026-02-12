import { useParams } from "react-router-dom";

const products: Record<string, any> = {
  retatrutide: {
    name: "Retatrutide",
    dosage: "10mg",
    vials: 20,
    description: "High-purity retatrutide for research applications only.",
    price: "$199",
  },
};

export default function ProductDetail() {
  const { slug } = useParams();
  const product = products[slug || ""];

  if (!product) return <p className="mt-20">Product not found.</p>;

  return (
    <div className="py-20 grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="bg-gray-100 h-96 rounded-xl flex items-center justify-center text-gray-400">
        Product Image
      </div>

      <div>
        <h1 className="text-4xl font-bold">{product.name}</h1>
        <p className="text-gray-600 mt-2">
          {product.dosage} • {product.vials} vials
        </p>

        <p className="mt-6 text-lg">{product.description}</p>

        <p className="text-3xl font-bold mt-6">{product.price}</p>

        <button className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
