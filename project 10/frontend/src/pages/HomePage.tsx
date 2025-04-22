import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl text-center bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl px-10 py-16 border border-white/30"
      >
        <div className="mb-6 flex justify-center">
          <Sparkles className="text-purple-600" size={32} />
        </div>

        <h1 className="text-5xl font-bold text-gray-900 mb-6 font-[Playfair_Display] leading-tight">
          Navigate Your Tech Career with Confidence
        </h1>

        <p className="text-lg text-gray-700 mb-8 font-medium">
          Discover personalized career paths, curated courses, certifications, and projects
          — tailored just for your skillset and goals. Built with ♥️ as a capstone project.
        </p>

        <Link
          to="/explore"
          className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition transform hover:scale-105"
        >
          🚀 Get Started
        </Link>
      </motion.div>
    </div>
  );
};

export default HomePage;
