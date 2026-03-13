import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const whyChooseUs = [
  {
    title: "Premium Products",
    text: "Each product is sourced through strict quality standards and independent verification to support consistent research outcomes.",
  },
  {
    title: "Wide Selection",
    text: "Our catalog is curated to support a broad range of laboratory workflows across metabolic, recovery, and signaling studies.",
  },
  {
    title: "Expert Support",
    text: "Our team responds quickly through phone, email, and contact requests so your lab can stay on schedule.",
  },
];

export default function About() {
  return (
    <>
      <section className="py-12 sm:py-14 md:py-16 bg-gradient-to-b from-blue-100 via-white to-blue-50 dark:from-blue-950 dark:via-blue-900 dark:to-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <img src={logo} alt="Eagle Peptide Logo" className="mx-auto h-24 md:h-32 w-auto object-contain mb-6" />
          <p className="text-blue-800 dark:text-blue-200 font-semibold tracking-[0.18em] text-xs sm:text-sm uppercase">
            US Manufactured Research Use Only Peptides
          </p>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            About Eagle Peptide
          </h1>
          <p className="mt-5 max-w-4xl mx-auto text-base sm:text-lg text-slate-700 dark:text-blue-100 leading-relaxed">
            We are a family-run business built for serious research partners. Since launch, we have focused on one principle:
            reliable quality with transparent service. Our process is designed around disciplined sourcing, lot consistency,
            and clear communication from checkout to delivery.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/#products"
              className="inline-flex items-center justify-center min-h-[48px] px-7 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition shadow-md"
            >
              Please Login to See Our Research Peptides
            </Link>
            <a
              href="mailto:support@eaglepeptide.com"
              className="inline-flex items-center justify-center min-h-[48px] px-7 py-3 border border-blue-300 dark:border-blue-600 text-blue-800 dark:text-blue-100 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-800/50 transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white dark:bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 dark:text-blue-200">Our Story</h2>
            <p className="mt-4 text-slate-700 dark:text-blue-100 leading-relaxed">
              Welcome to Eagle Peptide. We built this company to raise standards in the research peptide market: quality-first sourcing,
              clear support channels, and fair pricing. We believe trust is earned through consistency and accountability—not marketing claims.
            </p>
            <p className="mt-4 text-slate-700 dark:text-blue-100 leading-relaxed">
              Our goal is customer satisfaction and serving the research community with professional, dependable service.
              We prioritize answering calls, emails, and support messages quickly so labs get answers without delays.
            </p>
            <p className="mt-4 text-sm font-medium text-slate-500 dark:text-blue-200">
              All products are for research/testing only. We do not provide guidance for personal use.
            </p>
            <a
              href="https://pubmed.ncbi.nlm.nih.gov/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex mt-5 text-sm font-semibold text-blue-700 dark:text-blue-300 hover:underline"
            >
              Visit PubMed to learn more about peptide research
            </a>
          </div>

          <div className="rounded-2xl border border-blue-100 dark:border-blue-800 bg-blue-50/60 dark:bg-blue-900/40 p-6 sm:p-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Our Vision</h3>
            <p className="mt-3 text-slate-700 dark:text-blue-100 leading-relaxed">
              We work to stay upfront and honest with research partners, with transparent pricing and dependable quality controls.
              We believe the way we do business should be as strong as the products we supply.
            </p>
            <p className="mt-3 text-slate-700 dark:text-blue-100 leading-relaxed">
              Our mission is to support research organizations by providing high-purity compounds at fair prices,
              while maintaining the integrity and long-term trust of the peptide research community.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-blue-900 dark:bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyChooseUs.map((item) => (
              <article key={item.title} className="rounded-2xl border border-blue-700 bg-blue-950/30 p-6">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-blue-100 text-sm leading-relaxed">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12 bg-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-xs sm:text-sm leading-relaxed text-blue-100 text-center max-w-5xl mx-auto">
            All products on this site are for research and development use only and not for human consumption.
            Statements on this website have not been evaluated by the U.S. Food and Drug Administration.
            Products are not intended to diagnose, treat, cure, or prevent any disease.
            By purchasing, you acknowledge responsibility for lawful handling and research-only use.
          </p>
        </div>
      </section>
    </>
  );
}
