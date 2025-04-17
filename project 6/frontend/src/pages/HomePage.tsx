import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to the Career Path Explorer
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Select your programming language and experience level to discover
          personalized career paths, courses, certifications, and projects.
        </p>
        <a
          href="/explore"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md"
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default HomePage;