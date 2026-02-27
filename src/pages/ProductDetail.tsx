import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

import retatrutide from "../assets/retatrutide.jpg";
import mt2 from "../assets/mt2.jpg";
import ipamorelin from "../assets/ipamorelin.jpg";
import cjc1295 from "../assets/cjc1295.jpg";
import ghkcu from "../assets/ghkcu.jpg";
import glp3 from "../assets/glp3.jpg";
import bpc157 from "../assets/bpc157.jpg";
import bacwater from "../assets/bacwater.jpg";

type Product = {
  id: string;
  name: string;
  slug: string;
  dosage: string;
  vials: number;
  description: string;
  price: number;
};

const imageMap: Record<string, string> = {
  "retatrutide": retatrutide,
  "melanotan-ii": mt2,
  "ipamorelin": ipamorelin,
  "cjc-1295": cjc1295,
  "ghk-cu": ghkcu,
  "glp-3": glp3,
  "bpc-157": bpc157,
  "bac-water": bacwater,
};

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const loadProduct = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        console.error(error);
        setProduct(null);
      } else {
        setProduct(data);
      }

      setLoading(false);
    };

    loadProduct();
  }, [slug]);

  const handleAddToCart = async () => {
    if (!product) return;

    setAdding(true);

    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      navigate("/login");
      return;
    }

    const { error } = await supabase.from("cart_items").insert({
      user_id: userData.user.id,
      product_id: product.id,
      quantity: 1,
    });

    setAdding(false);

    if (error) {
      alert("Failed to add to cart.");
      return;
    }

    navigate("/cart");
  };

  if (loading) {
    return <p className="py-24 text-center text-gray-500">Loading…</p>;
  }

  if (!product) {
    return <p className="py-24 text-center text-gray-700">Product not found.</p>;
  }

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">

        <div className="flex justify-center">
          <img
            src={imageMap[product.slug] ?? retatrutide}
            alt={product.name}
            className="h-64 sm:h-80 md:h-96 object-contain drop-shadow-xl"
          />
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {product.name}
          </h1>

          <p className="text-blue-700 mt-3 font-medium">
            {product.dosage} • {product.vials} vials
          </p>

          <p className="mt-6 sm:mt-8 text-gray-600 leading-relaxed text-sm sm:text-base">
            {product.description}
          </p>

          <div className="mt-8 sm:mt-10">
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">
              ${product.price}
            </p>

            <button
              onClick={handleAddToCart}
              disabled={adding}
              className="mt-5 sm:mt-6 w-full sm:w-auto px-6 sm:px-8 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition disabled:opacity-50"
            >
              {adding ? "Adding..." : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
