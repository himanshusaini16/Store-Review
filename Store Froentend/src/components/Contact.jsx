import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl max-w-2xl w-full p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Contact Us
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Have questions, feedback, or just want to say hello? Fill out the form
          below, and we’ll get back to you soon.
        </p>

        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Your Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Message
            </label>
            <textarea
              rows="4"
              placeholder="Write your message..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            >
              Send Message
            </button>
          </div>
        </form>
        <div className="mt-10 text-center text-gray-600">
          <p>📍 Location: Banglore, India</p>
          <p>📧 Email: himanshusaini025@gmail.com</p>
          <p>📞 Phone: +91 9670152557</p>
        </div>
      </div>
    </div>
  );
};
export default Contact;
