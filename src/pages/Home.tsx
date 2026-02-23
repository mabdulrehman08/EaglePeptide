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
  retatrutide: retatrutide,
  "melanotan-ii": mt2,
  ipamorelin: ipamorelin,
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
    <main className="min-h-screen bg-white dark:bg-gray-950">
      {/* HERO */}
      <section className="pt-10 pb-12 sm:pt-16 sm:pb-20 md:pt-24 md:pb-32 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Text */}
            <div className="text-center md:text-left space-y-6 md:space-y-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white">
                Premium{" "}
                <span className="text-blue-600 dark:text-blue-400">Research Peptides</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto md:mx-0 leading-relaxed">
                High-purity compounds manufactured for laboratory research only.  
                Trusted by professionals worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-6 sm:mt-8">
                <a
                  href="#products"
                  className="inline-flex items-center justify-center px-8 py-4 min-h-[52px] bg-blue-600 text-white rounded-lg font-medium text-base sm:text-lg hover:bg-blue-700 transition shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 touch-manipulation"
                >
                  Shop Products
                </a>
                <a
                  href="/about"
                  className="inline-flex items-center justify-center px-8 py-4 min-h-[52px] border border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-400 rounded-lg font-medium text-base sm:text-lg hover:bg-blue-50 dark:hover:bg-blue-900 transition touch-manipulation"
                >
                  Learn More
                </a>
              </div>
            </div>

            {/* Hero image — hidden on mobile, shown from md+ */}
            <div className="hidden md:flex rounded-2xl overflow-hidden items-center justify-center bg-pink-50 dark:bg-gray-800 w-full h-80 lg:h-[28rem] mx-auto">
              <img
                src={retatrutide}
                alt="Featured Research Peptide"
                className="h-full w-full object-contain p-6 sm:p-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-gray-900 dark:text-white text-center md:text-left">
            Featured Products
          </h2>

          {loading && (
            <p className="text-center text-gray-500 dark:text-gray-400 py-16 text-lg">
              Loading products…
            </p>
          )}

          {!loading && products.length > 0 && (
            <div
              className="
                grid grid-cols-1          /* mobile: 1 column */
                sm:grid-cols-2            /* ~640px+: 2 columns */
                lg:grid-cols-3
                xl:grid-cols-4
                gap-5 sm:gap-6 lg:gap-8
              "
            >
              {products.map((p) => (
                <div key={p.id} className="flex justify-center">
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
      <section className="py-8 sm:py-10 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-600 text-center max-w-3xl mx-auto leading-relaxed">
            ⚠️ All products are intended strictly for laboratory research purposes only.  
            Not for human consumption, medical, or veterinary use. Must be 18+ to purchase.
          </p>
        </div>
      </section>
    </main>
  );
}