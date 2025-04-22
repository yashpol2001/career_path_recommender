// src/pages/AiToolsPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AiToolsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white py-12 px-6">
      <h1 className="text-3xl font-bold text-center mb-10">🛠️ AI Career Tools</h1>
      <div className="flex flex-col md:flex-row justify-center gap-8">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">📄 Personalized Learning Plan Generator</h2>
          <p className="text-sm mb-4">Select your career interest or programming language and generate a customized PDF learning roadmap using AI.</p>
          <button
            onClick={() => navigate('/learning-plan')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Generate Learning Plan
          </button>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">🧾 AI-Powered Resume Analyzer</h2>
          <p className="text-sm mb-4">Upload your resume and get smart feedback on improvements, keyword suggestions, and skill enhancement.</p>
          <button
            onClick={() => navigate('/resume-analyzer')}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
          >
            Analyze My Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiToolsPage;
