import { Link } from "react-router-dom";
// Remove: import retatrutide from "../assets/retatrutide.jpg";
// Add your logo instead (adjust path/name as needed)
import logo from "../assets/logo.png"; // ← Replace with your actual logo file (PNG/SVG recommended)

export default function About() {
  return (
    <>
      {/* HERO - keep it simple and dont change it*/}
      <section className="py-12 md:py-16 bg-gradient-to-b from-blue-50 via-white to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8 md:mb-10">
            <img
              src={logo}
              alt="Eagle Peptide Logo"
              className="mx-auto h-32 md:h-40 w-auto object-contain mb-6"
            />
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
              About{" "}
              <span className="text-blue-700">Eagle Peptide</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
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

      {/* MISSION - Reduced top padding for less gap */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-blue-800">Our Mission</h2>
            <p className="mt-6 text-gray-700 leading-relaxed text-lg">
              At Eagle Peptide, our mission is to advance scientific research by
              providing researchers with the purest, most reliable peptide compounds
              available. Every product we manufacture goes through rigorous quality
              control and third-party testing to ensure consistency and accuracy.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES - Patriotic red/blue/white theme */}
      <section className="py-16 md:py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-red-400 transition">
              <p className="text-4xl mb-4">🏭</p>
              <h3 className="text-xl font-bold">US Manufactured</h3>
              <p className="mt-3 text-blue-200 text-sm">
                All peptides manufactured in our cGMP compliant US-based facility
                ensuring the highest quality standards.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-red-400 transition">
              <p className="text-4xl mb-4">🔬</p>
              <h3 className="text-xl font-bold">3rd Party Tested</h3>
              <p className="mt-3 text-blue-200 text-sm">
                Every batch is independently verified for purity and potency
                by accredited third-party laboratories.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-red-400 transition">
              <p className="text-4xl mb-4">🚚</p>
              <h3 className="text-xl font-bold">Same Day Shipping</h3>
              <p className="mt-3 text-blue-200 text-sm">
                Orders placed before 3PM ET ship the same day via FedEx 2Day Air
                so you get your research compounds fast.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-red-400 transition">
              <p className="text-4xl mb-4">💰</p>
              <h3 className="text-xl font-bold">Volume Discounts</h3>
              <p className="mt-3 text-blue-200 text-sm">
                We offer volume discounts starting at 5 or more of the same
                product with even greater savings at 10+.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-red-400 transition">
              <p className="text-4xl mb-4">✅</p>
              <h3 className="text-xl font-bold">30-Day Guarantee</h3>
              <p className="mt-3 text-blue-200 text-sm">
                All unopened products come with a full money back 30-day
                quality guarantee. No questions asked.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-red-400 transition">
              <p className="text-4xl mb-4">🤝</p>
              <h3 className="text-xl font-bold">Real Support</h3>
              <p className="mt-3 text-blue-200 text-sm">
                Talk directly with our full-time US-based support team
                by chat, phone, or email anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT - Add red accent */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-blue-800">Get In Touch</h2>
          <p className="mt-4 text-gray-600 text-lg">
            Have questions about our products or need support? We're here to help.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="mailto:support@eaglepeptide.com"
              className="px-8 py-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition shadow-md"
            >
              📧 muhammadabdulrehman513@gmail.com
            </a>
            <a
              href="tel:+18007743401"
              className="px-8 py-4 border-2 border-blue-600 text-blue-700 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              📞 215-397-5020
            </a>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm text-gray-500 text-center max-w-3xl mx-auto">
            ⚠️ All products are intended strictly for laboratory research purposes only.
            Not for human consumption, medical, or veterinary use. Must be 18+ to purchase.
            These statements have not been evaluated by the FDA.
          </p>
        </div>
      </section>
    </>
  );
}