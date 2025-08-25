import React from "react";
import { motion } from "framer-motion";
import { Star, Store, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About <span className="text-indigo-600">Our Platform</span>
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Our platform helps users discover and rate pet stores with ease.
          Owners can register multiple stores, and customers can share their
          experiences through ratings and comments. With our system, finding the
          best stores becomes effortless.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
            whileHover={{ scale: 1.05 }}
          >
            <Store className="w-12 h-12 mx-auto text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Store Management
            </h3>
            <p className="text-gray-600 text-sm">
              Owners can easily add and manage multiple stores, with complete
              details and profiles.
            </p>
          </motion.div>
          <motion.div
            className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
            whileHover={{ scale: 1.05 }}
          >
            <Star className="w-12 h-12 mx-auto text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Ratings & Reviews
            </h3>
            <p className="text-gray-600 text-sm">
              Customers can rate stores, leave comments, and view average
              ratings up to 1 decimal place.
            </p>
          </motion.div>

          <motion.div
            className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
            whileHover={{ scale: 1.05 }}
          >
            <Users className="w-12 h-12 mx-auto text-green-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Community Driven
            </h3>
            <p className="text-gray-600 text-sm">
              Built for the community – helping people find trusted stores
              through real experiences and feedback.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
