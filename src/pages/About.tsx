import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // ← your actual logo (PNG/SVG recommended)

export default function About() {
  return (
    <>
      {/* HERO - kept simple as requested */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-blue-50 via-white to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8 md:mb-10">
            <img
              src={logo}
              alt="Eagle Peptide Logo"
              className="mx-auto h-32 md:h-40 w-auto object-contain mb-6"
            />
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white">
              About{" "}
              <span className="text-blue-700 dark:text-blue-400">Eagle Peptide</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              We are a US-based research peptide company committed to providing
              the highest quality compounds for laboratory and scientific research.
            </p>
            <Link
              to="/#products"
              className="mt-8 inline-block px-8 py-4 bg-red-600 text-white rounded-lg font-semibold text-lg hover:bg-red-700 transition shadow-md"
            >
              Shop Products
            </Link>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-16 md:py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-blue-800 dark:text-blue-300">Our Mission</h2>
            <p className="mt-6 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              At Eagle Peptide, our mission is to advance scientific research by
              providing researchers with the purest, most reliable peptide compounds
              available. Every product we manufacture goes through rigorous quality
              control and third-party testing to ensure consistency and accuracy.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES - Dark mode adjusted (darker bg, better text contrast) */}
      <section className="py-16 md:py-20 bg-blue-900 dark:bg-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { emoji: "🏭", title: "US Manufactured", text: "All peptides manufactured in our cGMP compliant US-based facility ensuring the highest quality standards." },
              { emoji: "🔬", title: "3rd Party Tested", text: "Every batch is independently verified for purity and potency by accredited third-party laboratories." },
              { emoji: "🚚", title: "Same Day Shipping", text: "Orders placed before 3PM ET ship the same day via FedEx 2Day Air so you get your research compounds fast." },
              { emoji: "💰", title: "Volume Discounts", text: "We offer volume discounts starting at 5 or more of the same product with even greater savings at 10+." },
              { emoji: "✅", title: "30-Day Guarantee", text: "All unopened products come with a full money back 30-day quality guarantee. No questions asked." },
              { emoji: "🤝", title: "Real Support", text: "Talk directly with our full-time US-based support team by chat, phone, or email anytime." },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-gray-700 hover:border-red-400 dark:hover:border-red-500 transition-all duration-300"
              >
                <p className="text-4xl mb-4">{item.emoji}</p>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-blue-200 dark:text-gray-300 text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-16 md:py-20 bg-white dark:bg-gray-950">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-blue-800 dark:text-blue-300">Get In Touch</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">
            Have questions about our products or need support? We're here to help.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="mailto:support@eaglepeptide.com"
              className="px-8 py-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition shadow-md"
            >
              📧 support@eaglepeptide.com
            </a>
            <a
              href="tel:+12153975020"
              className="px-8 py-4 border-2 border-blue-600 text-blue-700 dark:border-blue-400 dark:text-blue-300 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-900 transition"
            >
              📞 215-397-5020
            </a>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="py-10 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-3xl mx-auto">
            ⚠️ All products are intended strictly for laboratory research purposes only.
            Not for human consumption, medical, or veterinary use. Must be 18+ to purchase.
            These statements have not been evaluated by the FDA.
          </p>
        </div>
      </section>
    </>
  );
}