import React from "react"
const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT;

const ContactPage = () => {
  console.log("Formspree Endpoint:", FORMSPREE_ENDPOINT);
  return (
    <div className="bg-[#FAFFEB] dark:bg-gray-900 py-16 px-5 sm:px-10 lg:px-20">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Contact Info */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-md text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-6">
            Got questions, feedbacks, or just want to say hello? We’d love to hear from you.
          </p>
          <div className="space-y-2 text-lg text-gray-800 dark:text-gray-200">
            <p><strong>📍 Address:</strong> BDPA, Benin City, Nigeria</p>
            <p><strong>📞 Phone:</strong> +234 903 440 9078</p>
            <p><strong>✉️ Email:</strong> penubiaka@gmail.com</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 sm:p-10 space-y-6">
          <h2 className="text-2xl font-semibold text-[#FE5448] dark:text-[#FE5448] text-center">
            Send Us a Message
          </h2>
          <form action={FORMSPREE_ENDPOINT} method="POST" className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FE5448] transition"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FE5448] transition"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Suggestions, feedback, or just say hello..."
                className="w-full px-4 py-3 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FE5448] transition"
                required
              ></textarea>
            </div>

            <div className="flex justify-center pt-2">
              <button
                type="submit"
                className="bg-[#A500E0] hover:bg-[#8f00c8] text-white px-6 py-3 rounded-md font-semibold shadow-lg transition-all duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
