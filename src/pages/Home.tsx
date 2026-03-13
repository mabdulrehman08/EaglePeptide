import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import ProductCard from "../components/ProductCard";
import { getProductDescription } from "../lib/productDescriptions";

import retatrutide from "../assets/retatrutide.jpg";
import mt2 from "../assets/mt2.jpg";
import ipamorelin from "../assets/ipamorelin.jpg";
import cjc1295 from "../assets/cjc1295.jpg";
import ghkcu from "../assets/ghkcu.jpg";
import glp3 from "../assets/glp3.jpg";
import bpc157 from "../assets/bpc157.jpg";
import bacwater from "../assets/bacwater.jpg";

const imageMap: Record<string, string> = {
  retatrutide,
  "melanotan-ii": mt2,
  ipamorelin,
  "cjc-1295": cjc1295,
  "ghk-cu": ghkcu,
  "glp-3": glp3,
  "bpc-157": bpc157,
  "bac-water": bacwater,
};

const highlights = [
  {
    title: "Methodical Research Practices",
    text: "Our workflows are built around precision, repeatability, and data integrity, with disciplined handling and transparent process controls.",
  },
  {
    title: "Scientific Precision and Standards",
    text: "From compound preparation to quality verification, each step is designed to support reproducible and scientifically sound laboratory outcomes.",
  },
  {
    title: "US Laboratory Manufacturing",
    text: "Products are prepared in a US-based environment with strict quality protocols and independent third-party verification.",
  },
];

const serviceBenefits = [
  "Same-day shipping on eligible orders placed before 3PM ET.",
  "Volume discounts starting at 5+ units of the same product.",
  "30-day quality guarantee on unopened items.",
  "Responsive support via phone, email, and contact form.",
];

type Product = {
  id: string;
  name: string;
  slug: string;
  dosage: string;
  vials: number;
  price: number;
  description?: string | null;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("id, name, slug, dosage, vials, price, description")
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
    <main className="min-h-screen bg-white dark:bg-gray-950 overflow-x-hidden">
      <section className="pt-12 pb-14 sm:pt-18 sm:pb-22 md:pt-24 md:pb-28 bg-gradient-to-b from-slate-100 via-white to-white dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="text-center md:text-left space-y-6 md:space-y-8">
              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-blue-800 dark:text-blue-300 font-semibold">
                US Manufactured • Research Use Only
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white">
                Professional <span className="text-slate-800 dark:text-slate-100">Research Peptide Supply</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto md:mx-0 leading-relaxed">
                High-purity compounds with transparent labeling, reliable fulfillment, and secure checkout for serious research teams.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-6 sm:mt-8">
                <a
                  href="#products"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 min-h-[52px] bg-slate-900 text-white rounded-lg font-semibold text-base sm:text-lg hover:bg-slate-800 transition shadow-md"
                >
                  Shop Products
                </a>
                <Link
                  to="/about"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 min-h-[52px] border border-slate-300 dark:border-gray-700 text-slate-700 dark:text-gray-300 rounded-lg font-medium text-base sm:text-lg hover:bg-slate-50 dark:hover:bg-gray-900 transition"
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className="hidden md:flex rounded-2xl overflow-hidden items-center justify-center bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 w-full h-80 lg:h-[28rem] mx-auto shadow-sm">
              <img
                src={retatrutide}
                alt="Featured Research Peptide"
                className="h-full w-full object-contain p-6 sm:p-8"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24 bg-white dark:bg-blue-950">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white text-center md:text-left">
            Research Products
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 sm:mb-12 text-center md:text-left">
            Clear specifications, pricing, and concise research-focused descriptions.
          </p>

          {loading && (
            <p className="text-center text-gray-500 dark:text-gray-400 py-16 text-lg">Loading products…</p>
          )}

          {!loading && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {products.map((p) => (
                <ProductCard
                  key={p.id}
                  name={p.name}
                  dosage={p.dosage}
                  vials={p.vials}
                  price={`$${p.price}`}
                  slug={p.slug}
                  image={imageMap[p.slug] ?? retatrutide}
                  description={getProductDescription(p.slug, p.description)}
                />
              ))}
            </div>
          )}

          {!loading && products.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 py-16 text-lg">No products found.</p>
          )}
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-blue-50 dark:bg-slate-900/40 border-y border-blue-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((item) => (
              <article key={item.title} className="rounded-xl border border-blue-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-blue-100 dark:border-slate-800 p-6 sm:p-8 bg-white dark:bg-slate-900">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 dark:text-blue-200">Operations and Service Commitments</h2>
            <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              {serviceBenefits.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-10 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-600 text-center max-w-4xl mx-auto leading-relaxed">
            ⚠️ Research Use Only: All products are intended strictly for laboratory, research, or analytical use.
            Not for human consumption, medical, or veterinary use. Statements on this website have not been
            evaluated by the U.S. Food and Drug Administration.
          </p>
        </div>
      </section>
    </main>
  );
}
