
import React, { useRef, useState } from 'react';
import { CustomSelect } from '../components/Select';
import CareerPath from '../components/CareerPath';
import CareerDetailsBox from '../components/CareerDetailsBox';
import { api } from '../api';
import { ExperienceLevel, RecommendationDetails } from '../types';
import CareerGraph from '../components/CareerGraph';

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
  const [showResetConfirm, setShowResetConfirm] = useState(false);

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

  const handleReset = () => {
    setLanguage(null);
    setExperience(null);
    setCareerData(null);
    setSelectedCareer(null);
    setError('');
    setShowResetConfirm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Explore Career Paths</h2>
          <p className="text-gray-600">
            Select your language and experience level to discover personalized learning recommendations.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Programming Language</label>
              <CustomSelect
                options={LANGUAGE_OPTIONS}
                value={language}
                onChange={setLanguage}
                placeholder="Select..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
              <CustomSelect
                options={EXPERIENCE_OPTIONS}
                value={experience}
                onChange={setExperience}
                placeholder="Select..."
              />
            </div>
          </div>

          <div className="mt-6 text-center space-x-4">
            <button
              onClick={handleSubmit}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded text-sm font-semibold transition duration-300 transform hover:scale-105"
              disabled={loading || !language || !experience}
            >
              🔍 {loading ? 'Loading...' : 'Explore'}
            </button>
            <button
              onClick={() => setShowResetConfirm(true)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded text-sm font-semibold transition duration-300 transform hover:scale-105 disabled:opacity-50"
              disabled={!language && !experience && !careerData && !selectedCareer && !error}
            >
              ♻️ Reset
            </button>
          </div>
        </div>

        {showResetConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
              <h3 className="text-lg font-bold mb-4">Are you sure you want to reset?</h3>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="text-gray-600 hover:underline"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReset}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                >
                  Confirm Reset
                </button>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-6 text-center">
            ❌ {error}
          </div>
        )}

        {careerData && experience && (
          <div className="mt-10 space-y-10">
            <CareerGraph
              data={careerData}
              experienceLevel={experience.value}
              onSelectCareer={(careerName) => {
                setSelectedCareer(careerName);
                setTimeout(() => {
                  detailsRef.current?.scrollIntoView({ behavior: 'smooth' });
                }, 200);
              }}
            />

            {selectedCareer && (
              <div ref={detailsRef}>
                <CareerDetailsBox
                  data={careerData.find((item) => item.career === selectedCareer)!}
                  experienceLevel={experience.value}
                />
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default ExplorePage;
