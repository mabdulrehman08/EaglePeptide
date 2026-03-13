import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const standards = [
  {
    title: "US-Based Manufacturing",
    text: "Compounds are manufactured in a US-based laboratory environment with strict internal quality procedures and controlled workflows.",
  },
  {
    title: "Independent Verification",
    text: "Every batch is verified through third-party analytical testing for identity, purity, and consistency before release.",
  },
  {
    title: "Methodical Documentation",
    text: "Structured evaluation, traceable lot-level records, and evidence-based checks support repeatable laboratory outcomes.",
  },
  {
    title: "Same-Day Fulfillment",
    text: "Orders placed before 3PM ET are processed the same day with expedited shipping options for minimal lab downtime.",
  },
  {
    title: "Volume Pricing",
    text: "Tiered volume discounts are available to support recurring procurement and long-term study planning.",
  },
  {
    title: "Quality Guarantee",
    text: "Unopened products are covered by a 30-day quality guarantee with responsive support from our team.",
  },
];

const serviceNotes = [
  {
    title: "Same Day Shipping",
    body: "Orders submitted before 3PM ET are prioritized for same-day dispatch via FedEx 2Day Air whenever available.",
  },
  {
    title: "Volume Discounts",
    body: "Discount tiers start at 5 units of the same product, with increased savings at 10+ units.",
  },
  {
    title: "Backorder Communication",
    body: "In the rare case of limited stock, support proactively contacts you with timeline updates and options.",
  },
];

export default function About() {
  return (
    <>
      <section className="py-10 sm:py-12 md:py-16 bg-gradient-to-b from-blue-100 via-white to-white dark:from-slate-900 dark:via-gray-950 dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 md:mb-10">
            <img
              src={logo}
              alt="Eagle Peptide Logo"
              className="mx-auto h-28 md:h-36 w-auto object-contain mb-6"
            />
            <p className="text-blue-800 dark:text-blue-300 font-semibold tracking-[0.2em] text-xs sm:text-sm uppercase">
              US Manufactured • Research Use Only
            </p>
            <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-slate-900 dark:text-white">
              Methodical Research Standards.
              <span className="block text-blue-900 dark:text-blue-200">Reliable Supply. Transparent Quality.</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
              At Eagle Peptide, our process is designed around precision, repeatability, and data integrity.
              We prioritize scientific rigor from synthesis through final quality checks so laboratories can order
              with confidence and maintain consistent research workflows.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/#products"
                className="inline-flex items-center justify-center min-h-[48px] px-6 sm:px-8 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition shadow-md"
              >
                Shop Products
              </Link>
              <a
                href="mailto:support@eaglepeptide.com"
                className="inline-flex items-center justify-center min-h-[48px] px-6 sm:px-8 py-3 border border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-200 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-950 transition"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 dark:text-blue-200">Scientific Precision and Standards</h2>
            <p className="mt-4 text-slate-700 dark:text-slate-300 leading-relaxed">
              Meaningful progress begins with accurate modeling, validated analytical tools, and disciplined
              laboratory methodology. From molecular analysis to observational data capture, each step must be
              designed for reproducibility and objective review.
            </p>
            <p className="mt-4 text-slate-700 dark:text-slate-300 leading-relaxed">
              Our operating philosophy is simple: careful documentation, controlled handling procedures,
              and science-first execution support dependable outcomes across research applications.
            </p>
            <p className="mt-5 text-sm font-medium text-slate-500 dark:text-slate-400">
              For laboratory research use only. Not for human consumption.
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 dark:border-slate-800 bg-blue-50/50 dark:bg-slate-900 p-6 sm:p-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">The Eagle Peptide Promise</h3>
            <p className="mt-3 text-slate-700 dark:text-slate-300 leading-relaxed">
              Every compound begins with a science-led process, not shortcuts. Our team focuses on precision
              synthesis, modern purification techniques, and lot-level verification to deliver dependable,
              research-grade materials.
            </p>
            <ul className="mt-5 space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <li>• Controlled synthesis and purification workflows.</li>
              <li>• Batch-level third-party analytical verification.</li>
              <li>• Transparent support through checkout, shipping, and post-order follow-up.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">Why Labs Choose Eagle Peptide</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8">
            {standards.map((item) => (
              <div
                key={item.title}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-7 border border-blue-800/60 hover:border-blue-400 transition-all duration-300"
              >
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="mt-3 text-blue-100 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 dark:text-blue-200 text-center">
            Shipping, Service, and Procurement Notes
          </h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {serviceNotes.map((item) => (
              <div key={item.title} className="rounded-xl border border-blue-100 dark:border-slate-800 p-5 sm:p-6 bg-white dark:bg-slate-900">
                <h3 className="font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-xs sm:text-sm leading-relaxed text-blue-100 text-center max-w-5xl mx-auto">
            Research Use Only Disclaimer: Products sold on this website are intended strictly for laboratory,
            research, or analytical purposes only. They are not for human or veterinary use, and are not intended
            to diagnose, treat, cure, or prevent any disease. Statements on this site have not been evaluated by
            the U.S. Food and Drug Administration.
          </p>
        </div>
      </section>
    </>
  );
}
