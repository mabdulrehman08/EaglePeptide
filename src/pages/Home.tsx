import ProductCard from "../components/ProductCard";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl font-extrabold leading-tight">
            Premium <span className="text-blue-600">Research Peptides</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-xl">
            High-purity compounds manufactured for research purposes only.
            Trusted by researchers worldwide.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
              Shop Products
            </button>

            <button className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:border-gray-400 transition">
              Learn More
            </button>
          </div>
        </div>

        <div className="bg-gray-100 rounded-2xl h-80 flex items-center justify-center text-gray-400">
          Product Image Placeholder
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-20">
        <h2 className="text-3xl font-bold mb-10">Featured Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <ProductCard name="Retatrutide" dosage="10mg" vials={20} price="$499" slug="retatrutide" />
          <ProductCard name="MT-2" dosage="10mg" vials={20} price="$299" slug="mt2" />
          <ProductCard name="IP" dosage="10mg" vials={20} price="$349" slug="ip" />
          <ProductCard name="CJC (No DAC)" dosage="10mg" vials={20} price="$399" slug="cjc-no-dac" />
        </div>
      </section>
    </>
  );
}
