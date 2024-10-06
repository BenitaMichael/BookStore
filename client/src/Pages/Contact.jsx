import React from "react";

const ContactPage = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 py-10 px-5 sm:px-10 lg:px-20">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold mb-5 text-gray-900 dark:text-white">Contact Us</h1>
          <p className="text-lg text-gray-800 dark:text-gray-200">
            <strong>Address:</strong> BDPA, Benin City, Nigeria
          </p>
          <p className="text-lg text-gray-800 dark:text-gray-200">
            <strong>Phone:</strong> +234 903 440 9078
          </p>
          <p className="text-lg text-gray-800 dark:text-gray-200">
            <strong>Email:</strong> penubiaka@gmail.com
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Send Us a Message</h2>
          <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                className="mt-1 px-4 py-2 block w-full border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="mt-1 px-4 py-2 block w-full border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Suggestions or Recommendations"
                className="mt-1 px-4 py-2 block w-full border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 transition duration-300 dark:bg-indigo-500 dark:hover:bg-indigo-600"
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
