import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { getFullProductDescription } from "../lib/productDescriptions";
import { getDiscountLabel, getFrontendPrice, getOriginalPrice } from "../lib/pricing";

import retatrutide from "../assets/retatrutide.jpg";
import mt2 from "../assets/mt2.jpg";
import ipamorelin from "../assets/ipamorelin.jpg";
import cjc1295 from "../assets/cjc1295.jpg";
import ghkcu from "../assets/ghkcu.jpg";
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

type ExistingCartItem = {
  id: string;
  quantity: number;
};

const imageMap: Record<string, string> = {
  retatrutide: retatrutide,
  "melanotan-ii": mt2,
  ipamorelin: ipamorelin,
  "cjc-1295": cjc1295,
  "ghk-cu": ghkcu,
  "bpc-157": bpc157,
  "bac-water": bacwater,
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-semibold text-gray-900 mb-2 mt-8 pb-1 border-b border-gray-200">
      {children}
    </h2>
  );
}

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

      if (error || slug === "glp-3") {
        if (error) console.error(error);
        setProduct(null);
      } else {
        setProduct({
          ...data,
          price: getFrontendPrice(data.slug, data.price),
        });
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
      setAdding(false);
      navigate("/login");
      return;
    }

    const userId = userData.user.id;

    const { data: existingItem, error: existingError } = await supabase
      .from("cart_items")
      .select("id, quantity")
      .eq("user_id", userId)
      .eq("product_id", product.id)
      .maybeSingle<ExistingCartItem>();

    if (existingError) {
      console.error("Failed to check existing cart item:", existingError);
      setAdding(false);
      alert("Failed to add to cart.");
      return;
    }

    if (existingItem) {
      const { error: updateError } = await supabase
        .from("cart_items")
        .update({ quantity: existingItem.quantity + 1 })
        .eq("id", existingItem.id);

      setAdding(false);

      if (updateError) {
        console.error("Failed to update cart quantity:", updateError);
        alert("Failed to add to cart.");
        return;
      }

      navigate("/cart");
      return;
    }

    const { error: insertError } = await supabase.from("cart_items").insert({
      user_id: userId,
      product_id: product.id,
      quantity: 1,
    });

    setAdding(false);

    if (insertError) {
      console.error("Failed to insert cart item:", insertError);
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

  const desc = getFullProductDescription(product.slug);
  const originalPrice = getOriginalPrice(product.slug, product.price);
  const discountLabel = getDiscountLabel(product.slug);

  return (
    <div className="bg-white min-h-screen">
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
            <p className="text-xs uppercase tracking-widest text-blue-700 font-semibold mb-2">
              Research Use Only
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{product.name}</h1>

            <p className="text-blue-700 mt-3 font-medium">
              {product.dosage} &bull; {product.vials} vial{product.vials !== 1 ? "s" : ""}
            </p>

            {desc && (
              <p className="mt-5 text-gray-600 leading-relaxed text-sm sm:text-base">
                {desc.shortDescription}
              </p>
            )}

            <div className="mt-8 sm:mt-10">
              {discountLabel && (
                <p className="text-sm text-gray-500 line-through">
                  ${originalPrice.toFixed(2)}
                </p>
              )}
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
              {discountLabel && (
                <p className="mt-1 text-sm font-medium text-green-700">{discountLabel} • Limited-time price cut</p>
              )}

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

      {desc && (
        <section className="max-w-4xl mx-auto px-5 sm:px-6 pb-20">

          <SectionHeading>Product Overview</SectionHeading>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{desc.overview}</p>

          {desc.researchBackground.length > 0 && (
            <>
              <SectionHeading>Research Background</SectionHeading>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{desc.researchBackground}</p>
            </>
          )}

          {desc.areasOfInterest.length > 0 && (
            <>
              <SectionHeading>Potential Areas of Scientific Interest</SectionHeading>
              <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                {desc.areasOfInterest.map((area) => (
                  <li key={area} className="flex gap-2">
                    <span className="text-blue-600 mt-0.5 shrink-0">&bull;</span>
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          <SectionHeading>Product Specifications</SectionHeading>
          <ul className="space-y-2 text-sm sm:text-base text-gray-700">
            <li className="flex gap-2"><span className="text-blue-600 shrink-0">&bull;</span><span><span className="font-medium">Purity:</span> {desc.specifications.purity}</span></li>
            <li className="flex gap-2"><span className="text-blue-600 shrink-0">&bull;</span><span><span className="font-medium">Quantity:</span> {desc.specifications.quantity}</span></li>
            <li className="flex gap-2"><span className="text-blue-600 shrink-0">&bull;</span><span><span className="font-medium">Appearance:</span> {desc.specifications.appearance}</span></li>
            <li className="flex gap-2"><span className="text-blue-600 shrink-0">&bull;</span><span><span className="font-medium">Sequence:</span> {desc.specifications.sequence}</span></li>
            <li className="flex gap-2"><span className="text-blue-600 shrink-0">&bull;</span><span><span className="font-medium">Storage:</span> {desc.specifications.storage}</span></li>
            <li className="flex gap-2"><span className="text-blue-600 shrink-0">&bull;</span><span><span className="font-medium">Shipping:</span> {desc.specifications.shipping}</span></li>
          </ul>

          {desc.storageInstructions.length > 0 && (
            <>
              <SectionHeading>Storage Instructions</SectionHeading>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{desc.storageInstructions}</p>
            </>
          )}

          <div className="mt-10 rounded-lg border border-amber-200 bg-amber-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1">Disclaimer</p>
            <p className="text-sm text-amber-900 leading-relaxed">{desc.disclaimer}</p>
          </div>
        </section>
      )}
    </div>
  );
}
