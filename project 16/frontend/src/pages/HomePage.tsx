// HomePage.tsx (enhanced with overview, animated rotating testimonials, and informative content)
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const HomePage = () => {
  const testimonials = [
    {
      quote: "I had no idea where to begin. This planner showed me a clear roadmap, and now I'm working on real backend projects!",
      name: "Ananya R.",
      role: "Beginner Developer"
    },
    {
      quote: "Explorer gave me role options I hadn’t considered before — and the certifications really helped me stand out.",
      name: "Samuel L.",
      role: "Career Switcher"
    },
    {
      quote: "As someone returning to tech after a break, this tool gave me confidence and a clear path forward.",
      name: "Priya M.",
      role: "Returning Professional"
    },
    {
      quote: "This app feels like a mentor in your pocket. Highly recommended for self-taught developers!",
      name: "Marcus T.",
      role: "Self-taught Engineer"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl px-10 py-16 border border-white/30"
      >
        <div className="mb-6 flex justify-center">
          <Sparkles className="text-purple-600" size={32} />
        </div>

        <h1 className="text-5xl font-bold text-gray-900 mb-6 font-[Playfair_Display] leading-tight">
          Navigate Your Tech Career with Confidence
        </h1>

        <p className="text-lg text-gray-700 mb-8 font-medium">
          Discover personalized career paths, curated learning resources, and industry-backed recommendations.
          Whether you're just starting or planning a transition — our tools are built to guide you at every step.
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
          <Link
            to="/explore"
            className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition transform hover:scale-105"
          >
            🚀 Get Started with Explorer
          </Link>

          <Link
            to="/careerflow"
            className="inline-flex items-center justify-center px-5 py-3 bg-white border border-purple-300 text-purple-700 font-semibold rounded-full shadow hover:bg-purple-100 hover:text-purple-900 transition duration-300"
          >
            🌟 Try Career Planner
          </Link>
        </div>

        {/* Overview Section */}
        <div className="text-left text-gray-800 space-y-12 mt-10">
          <div>
            <h2 className="text-2xl font-bold text-indigo-700 mb-2">What is the Career Explorer?</h2>
            <p className="text-lg">
              The Explorer allows you to select your current programming language and experience level.
              Based on your inputs, we provide a tailored list of career roles, along with recommended
              courses, certifications, and hands-on projects to help you grow.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-purple-700 mb-2">What is the Career Planner?</h2>
            <p className="text-lg">
              The Planner flips the flow — start by selecting the career you aspire to pursue.
              From there, we guide you through the best programming languages to learn,
              and allow you to choose your level (Beginner, Intermediate, Advanced).
              The final result is a fully tailored roadmap that includes all the essentials to prepare for your dream role.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Why Use This Platform?</h2>
            <ul className="list-disc list-inside text-lg space-y-2">
              <li>🎓 Curated learning paths based on real industry requirements</li>
              <li>📚 Verified course and certification recommendations</li>
              <li>💼 Actionable projects that build your portfolio</li>
              <li>🔍 Career-first and skill-first paths — choose what works for you</li>
            </ul>
          </div>

          {/* Animated Testimonials Section */}
          <div className="bg-white/50 border border-indigo-100 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">What Our Users Say</h2>
            <Carousel
              autoPlay
              infiniteLoop
              showThumbs={false}
              showStatus={false}
              interval={5000}
              showArrows={false}
              stopOnHover={true}
            >
              {testimonials.map((t, index) => (
                <div key={index} className="bg-white p-6 rounded-xl text-center shadow">
                  <p className="text-gray-700 italic text-lg mb-3">“{t.quote}”</p>
                  <p className="text-sm font-semibold text-purple-700">— {t.name}, {t.role}</p>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;
