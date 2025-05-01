import React from 'react';
import { Users, Sparkles } from 'lucide-react';

const AboutPage = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl p-10">
        <div className="flex items-center gap-4 mb-8">
          <Users size={36} className="text-indigo-600" />
          <h1 className="text-4xl font-bold text-gray-800 tracking-tight">About Career Path Explorer</h1>
        </div>

        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          <strong className="text-indigo-600">Career Path Explorer</strong> is a smart tool built to guide aspiring and experienced tech professionals through the maze of career possibilities.
          It offers personalized recommendations on courses, certifications, and projects—based on your current skill set and experience level.
        </p>

        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          With a focus on clarity, customization, and impact, our platform simplifies decision-making and equips users with the right resources to grow.
          Whether you are starting out or seeking to upskill, this platform is your personalized navigator in the tech world.
        </p>

        <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-xl shadow-inner">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Sparkles className="text-purple-600" size={20} /> Project Contributors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-700">
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <p className="font-semibold text-indigo-700">Kanishk Devda</p>
              <p className="text-sm text-gray-500">Team Lead</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <p className="font-semibold text-indigo-700">Arpit Shah</p>
              <p className="text-sm text-gray-500">Frontend Developer</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <p className="font-semibold text-indigo-700">Yash Jitendra Pol</p>
              <p className="text-sm text-gray-500">Backend Integration</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <p className="font-semibold text-indigo-700">Kartik Kandikatla</p>
              <p className="text-sm text-gray-500">UX & Testing</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <p className="font-semibold text-indigo-700">Vamshidhar Reddy Mamidi</p>
              <p className="text-sm text-gray-500">Data & Research</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
