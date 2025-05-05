// CareerFlow.tsx (with fuzzy search, loading spinner, and back buttons)
import React, { useState, useEffect } from 'react';
import { ExperienceLevel, RecommendationDetails } from '../types';
import CareerDetailsBox from '../components/CareerDetailsBox';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';


const EXPERIENCE_LEVELS: ExperienceLevel[] = ['Beginner', 'Intermediate', 'Advanced'];

const CareerFlow = () => {
  const [careers, setCareers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const [career, setCareer] = useState<string | null>(null);
  const [languages, setLanguages] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [experience, setExperience] = useState<ExperienceLevel | null>(null);
  const [roadmapData, setRoadmapData] = useState<RecommendationDetails | null>(null);

  useEffect(() => {
    const fetchCareers = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/all-career-paths`);
        const data = await res.json();
        setCareers(data.careers || []);
      } catch (err) {
        console.error("Error fetching career paths:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCareers();
  }, []);

  useEffect(() => {
    const fetchLanguages = async () => {
      if (!career) return;
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/career-to-languages?career=${encodeURIComponent(career)}`);
        const data = await response.json();
        setLanguages(data.languages || []);
      } catch (err) {
        console.error("Error fetching languages for career:", err);
        setLanguages([]);
      }
    };
    fetchLanguages();
  }, [career]);

  useEffect(() => {
    const fetchRoadmap = async () => {
      if (!career || !selectedLanguage || !experience) return;
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/career-details?career=${encodeURIComponent(career)}&language=${encodeURIComponent(selectedLanguage)}&level=${encodeURIComponent(experience)}`
        );
        const data = await response.json();
        setRoadmapData({
          career: data.career,
          programmingLanguage: data.programmingLanguage,
          description: data.description,
          courses: {
            beginner: experience === 'Beginner' ? data.courses : [],
            intermediate: experience === 'Intermediate' ? data.courses : [],
            advanced: experience === 'Advanced' ? data.courses : [],
          },
          certifications: {
            beginner: experience === 'Beginner' ? data.certifications : [],
            intermediate: experience === 'Intermediate' ? data.certifications : [],
            advanced: experience === 'Advanced' ? data.certifications : [],
          },
          projects: {
            beginner: experience === 'Beginner' ? data.projects : [],
            intermediate: experience === 'Intermediate' ? data.projects : [],
            advanced: experience === 'Advanced' ? data.projects : [],
          },
        });
      } catch (err) {
        console.error("Error fetching roadmap data:", err);
        setRoadmapData(null);
      }
    };
    fetchRoadmap();
  }, [career, selectedLanguage, experience]);

  const filteredCareers = careers.filter((c) => c.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen py-10 px-6 bg-gradient-to-br from-white to-indigo-50">
      <div className="max-w-5xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-6 font-[Playfair_Display]">
          Find Your Path: Career → Language → Level → Roadmap
        </h1>

        {!career && (
          <div>
            <h2 className="text-2xl font-semibold text-indigo-800 mb-4">Step 1: Choose a Career</h2>
            <input
              type="text"
              placeholder="Search career paths..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full mb-4 px-4 py-2 border rounded shadow-sm"
            />
            {loading ? (
              <div className="text-center py-6 text-gray-500 animate-pulse">Loading career paths...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredCareers.map((c) => (
                  <motion.button
                    key={c}
                    onClick={() => setCareer(c)}
                    className="bg-white p-6 rounded-xl shadow-md border border-purple-200 hover:shadow-lg transition text-sm font-semibold text-purple-700 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    {c}
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        )}

        {career && !selectedLanguage && (
          <div>
            <h2 className="text-2xl font-semibold text-indigo-800 mb-4">Step 2: Recommended Languages for {career}</h2>
            <div className="flex flex-wrap gap-4">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className="px-5 py-2 bg-indigo-100 text-indigo-700 font-medium rounded-full shadow hover:bg-indigo-200"
                >
                  {lang}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCareer(null)}
              className="mt-6 block text-sm text-gray-500 hover:underline"
            >← Back to career selection</button>
          </div>
        )}

        {career && selectedLanguage && !experience && (
          <div>
            <h2 className="text-2xl font-semibold text-indigo-800 mb-4">Step 3: Your Experience Level in {selectedLanguage}</h2>
            <div className="flex gap-4">
              {EXPERIENCE_LEVELS.map((level) => (
                <button
                  key={level}
                  onClick={() => setExperience(level)}
                  className="px-5 py-2 bg-purple-100 text-purple-700 font-medium rounded-full shadow hover:bg-purple-200"
                >
                  {level}
                </button>
              ))}
            </div>
            <button
              onClick={() => setSelectedLanguage(null)}
              className="mt-6 block text-sm text-gray-500 hover:underline"
            >← Back to languages</button>
          </div>
        )}

        {career && selectedLanguage && experience && roadmapData && (
          <>
            <CareerDetailsBox data={roadmapData} experienceLevel={experience} />
            <div className="text-center mt-8">
              <Link
                to="/explore"
                className="inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded-full shadow hover:bg-purple-700 transition"
              >
                🔍 Learn More & Try Custom Explorer
              </Link>
              <div className="mt-6">
                <button
                  onClick={() => setExperience(null)}
                  className="text-sm text-gray-500 hover:underline"
                >← Back to experience level</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CareerFlow;
