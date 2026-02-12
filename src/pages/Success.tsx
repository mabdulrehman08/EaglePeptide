import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const [seconds, setSeconds] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => s - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-sm p-12 max-w-md w-full text-center">
        
        {/* Checkmark */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Successful!
        </h1>

        <p className="text-gray-500 mb-6">
          Thank you for your order. You'll receive a confirmation email shortly.
        </p>

        <p className="text-sm text-gray-400 mb-6">
          Redirecting to home in {seconds} seconds...
        </p>

        <button
          onClick={() => navigate("/")}
          className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition"
        >
          Back to Home
        </button>
      </div>
    </section>
  );
}