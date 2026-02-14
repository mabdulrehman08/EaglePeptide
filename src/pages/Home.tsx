import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import ProductCard from "../components/ProductCard";

import retatrutide from "../assets/retatrutide.jpg";
import mt2 from "../assets/mt2.jpg";
import ipamorelin from "../assets/ipamorelin.jpg";
import cjc1295 from "../assets/cjc1295.jpg";
import ghkcu from "../assets/ghkcu.jpg";
import glp3 from "../assets/glp3.jpg";
import bpc157 from "../assets/bpc157.jpg";
import bacwater from "../assets/bacwater.jpg";

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

type Product = {
  id: string;
  name: string;
  slug: string;
  dosage: string;
  vials: number;
  price: number;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("id, name, slug, dosage, vials, price")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading products:", error);
      } else {
        setProducts(data || []);
      }

      setLoading(false);
    };

    loadProducts();
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="py-28 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-5xl font-extrabold leading-tight text-gray-900">
              Premium <span className="text-blue-600">Research Peptides</span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 max-w-xl">
              High-purity compounds manufactured for laboratory research only.
              Trusted by professionals worldwide.
            </p>

            <div className="mt-8 flex gap-4">
              <a
                href="#products"
                className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition shadow-sm"
              >
                Shop Products
              </a>

              <a
                href="/about"
                className="px-6 py-3 border border-blue-200 text-blue-700 rounded-md font-medium hover:bg-blue-50 transition"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="rounded-2xl h-80 overflow-hidden flex items-center justify-center bg-pink-50">
            <img
              src={retatrutide}
              alt="Featured Product"
              className="h-full w-full object-contain p-6"
            />
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-gray-900">
            Featured Products
          </h2>

          {loading && (
            <p className="text-center text-gray-500">Loading products…</p>
          )}

          {!loading && products.length > 0 && (
            <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="min-w-[260px] snap-start flex-shrink-0"
                >
                  <ProductCard
                    name={p.name}
                    dosage={p.dosage}
                    vials={p.vials}
                    price={`$${p.price}`}
                    slug={p.slug}
                    image={imageMap[p.slug] ?? retatrutide}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs text-gray-400 text-center max-w-3xl mx-auto">
            ⚠️ All products are intended strictly for laboratory research purposes only.
            Not for human consumption, medical, or veterinary use. Must be 18+ to purchase.
          </p>
        </div>
      </section>
    </>
  );
}
