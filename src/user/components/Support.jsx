import React from "react";
import { FaXing, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";

const Support = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-100 py-16 px-5 text-gray-800">
  <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8 md:p-12">
    <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
      Contact Us
    </h2>

    <form className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Your Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="John Doe"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* الإيميل */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Your Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="you@example.com"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* الرسالة */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Your Message
        </label>
        <textarea
          id="message"
          name="message"
          rows="5"
          placeholder="Type your message here..."
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* الزر */}
      <div>
        <button
          type="submit"
          className="w-full bg-blue-800 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-900 transition"
        >
          Send Message
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

export default Support;
