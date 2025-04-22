import React from 'react';
import { ExternalLink, BookOpenCheck, Award, Rocket, FileCode2 } from 'lucide-react';
import { ExperienceLevel, RecommendationDetails } from '../types';

interface Props {
  data: RecommendationDetails;
  experienceLevel: ExperienceLevel;
}

const CareerDetailsBox = ({ data, experienceLevel }: Props) => {
  const level = experienceLevel.toLowerCase();

  const renderLinks = (items: string[]) =>
    items.map((text, index) => {
      const match = text.match(/\((https?:\/\/[^\)]+)\)/);
      const title = match ? text.replace(match[0], '').trim() : text;
      const url = match ? match[1] : '';

      return url ? (
        <li key={index}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline flex items-center gap-1 transition hover:scale-[1.01]"
          >
            {title} <ExternalLink size={14} />
          </a>
        </li>
      ) : (
        <li key={index}>{title}</li>
      );
    });

  return (
    <div className="bg-gradient-to-br from-white to-indigo-50 border border-indigo-100 rounded-3xl shadow-2xl px-10 py-10 mt-10 space-y-10 animate-fadeIn font-[Inter]">
      {/* Header */}
      <div>
        <h2 className="text-4xl font-['Playfair_Display'] text-purple-800 mb-4 flex items-center gap-3 flex-wrap">
          <Rocket className="text-indigo-500" />
          Your Mission:
          <span className="inline-flex items-center gap-2 px-4 py-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full shadow-md text-lg font-semibold transition hover:scale-105 hover:shadow-xl">
            {data.career} • {experienceLevel}
          </span>
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed tracking-wide font-medium">
          Imagine yourself as a future {data.career}. This roadmap was curated to help you learn smart, stand out, and shine confidently in your space.
        </p>
      </div>

      {/* Section: Courses */}
      <section className="bg-white rounded-2xl shadow-md border-l-8 border-indigo-300 px-6 py-5 transition hover:shadow-lg">
        <h3 className="text-2xl font-semibold text-indigo-700 mb-3 flex items-center gap-2">
          <BookOpenCheck /> Step 1: Start Learning
        </h3>
        <p className="text-gray-600 text-sm mb-2">Carefully selected courses to level up your core knowledge and practical thinking.</p>
        <ul className="list-disc ml-6 space-y-1 text-gray-800 text-[0.95rem] font-medium">
          {renderLinks(data.courses[level])}
        </ul>
      </section>

      {/* Section: Certifications */}
      <section className="bg-white rounded-2xl shadow-md border-l-8 border-emerald-300 px-6 py-5 transition hover:shadow-lg">
        <h3 className="text-2xl font-semibold text-emerald-700 mb-3 flex items-center gap-2">
          <Award /> Step 2: Boost Your Credibility
        </h3>
        <p className="text-gray-600 text-sm mb-2">These certifications will amplify your resume and unlock new career doors.</p>
        <ul className="list-disc ml-6 space-y-1 text-gray-800 text-[0.95rem] font-medium">
          {data.certifications[level].map((cert, i) => (
            <li key={i}>{cert}</li>
          ))}
        </ul>
      </section>

      {/* Section: Projects */}
      <section className="bg-white rounded-2xl shadow-md border-l-8 border-purple-300 px-6 py-5 transition hover:shadow-lg">
        <h3 className="text-2xl font-semibold text-purple-700 mb-3 flex items-center gap-2">
          <FileCode2 /> Step 3: Build & Show Off
        </h3>
        <p className="text-gray-600 text-sm mb-2">Projects that demonstrate your potential in action — great for portfolios and interviews.</p>
        <div className="flex flex-wrap gap-3 mt-2">
          {data.projects[level].map((proj, i) => (
            <span
              key={i}
              className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full shadow-sm text-sm font-medium"
            >
              💡 {proj}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CareerDetailsBox;
