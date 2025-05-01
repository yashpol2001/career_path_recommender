// ExplorePage.tsx (Enhanced Career Routes View - Type Fixes Included)
import React, { useRef, useState } from 'react';
import { CustomSelect } from '../components/Select';
import { api } from '../api';
import { ExperienceLevel, RecommendationDetails } from '../types';
import CareerDetailsBox from '../components/CareerDetailsBox';
import { motion } from 'framer-motion';

const EXPERIENCE_OPTIONS = [
  { value: 'Beginner', label: 'Beginner' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Advanced', label: 'Advanced' },
];

const LANGUAGE_OPTIONS = [
  { value: 'Python', label: 'Python' },
  { value: 'Java', label: 'Java' },
  { value: 'C', label: 'C' },
  { value: 'R', label: 'R' },
  { value: 'SQL', label: 'SQL' },
];

const ExplorePage = () => {
  const [language, setLanguage] = useState<{ value: string; label: string } | null>(null);
  const [experience, setExperience] = useState<{ value: ExperienceLevel; label: string } | null>(null);
  const [careerData, setCareerData] = useState<RecommendationDetails[] | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const detailsRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = async () => {
    if (!language || !experience) return;
    try {
      setLoading(true);
      setError('');
      setSelectedCareer(null);
      setCareerData(null);
      const response = await api.getCareerRecommendation(language.value, experience.value);
      setCareerData(response.details);
    } catch (err: any) {
      console.error(err);
      setCareerData(null);
      setError('Failed to fetch recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredResults = careerData?.filter((item) => item.programmingLanguage === language?.value);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Explore Career Routes</h2>
          <p className="text-gray-600">Select your language and experience level to discover personalized career journeys.</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Programming Language</label>
              <CustomSelect options={LANGUAGE_OPTIONS} value={language} onChange={setLanguage} placeholder="Select..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
              <CustomSelect options={EXPERIENCE_OPTIONS} value={experience} onChange={setExperience} placeholder="Select..." />
            </div>
          </div>
          <div className="text-center mt-6">
            <button
              onClick={handleSubmit}
              disabled={!language || !experience || loading}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded text-sm font-semibold transition duration-300"
            >
              {loading ? 'Loading...' : 'Explore Paths'}
            </button>
          </div>
        </div>

        {language && experience && (
          <div className="text-center mb-8">
            <h3 className="text-lg font-semibold text-indigo-700">
              Based on your selection: <span className="text-purple-700">{language.label}</span> • <span className="text-purple-700">{experience.label}</span>
            </h3>
          </div>
        )}

        {error && <div className="text-red-500 text-center mb-6">❌ {error}</div>}

        {/* Career Route Cards with Animated Line + Skills */}
        {filteredResults && (
          <div className="relative">
            <div className="absolute inset-0 flex justify-center z-0">
              <div className="w-1 bg-gradient-to-b from-indigo-200 to-purple-200 rounded-full h-full"></div>
            </div>
            <div className="relative grid sm:grid-cols-2 gap-8 mb-12 z-10">
              {filteredResults.map((career, index) => (
                <motion.div
                  key={career.career}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white border border-indigo-100 rounded-xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer relative"
                  onClick={() => {
                    setSelectedCareer(career.career);
                    setTimeout(() => detailsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
                  }}
                >
                  <h4 className="text-xl font-semibold text-purple-700 mb-1">{career.career}</h4>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">{career.description}</p>
                  <div className="flex flex-wrap gap-2 text-xs text-purple-700 font-medium mb-2">
                    {(career.courses?.[experience?.value as ExperienceLevel] || []).slice(0, 3).map((course: string, i: number) => (
                      <span key={i} className="bg-purple-100 px-2 py-1 rounded-full border border-purple-300">
                        {course.length > 25 ? course.slice(0, 25) + '…' : course}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 italic">Click to view roadmap →</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {selectedCareer && careerData && (
          <div ref={detailsRef}>
            <CareerDetailsBox
              data={careerData.find((item) => item.career === selectedCareer)!}
              experienceLevel={experience!.value}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
