// src/pages/ExplorePage.tsx
import React, { useState } from 'react';
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

  const handleSubmit = async () => {
    if (!language || !experience) return;
    try {
      setLoading(true);
      const response = await api.getCareerRecommendation(language.value, experience.value);
      setCareerData(response.details);
      setSelectedCareer(null);
      setError('');
    } catch (err: any) {
      console.error(err);
      setCareerData(null);
      setError('Failed to fetch recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
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

          <div className="mt-6 text-center">
            <button
              onClick={handleSubmit}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded text-sm font-semibold"
              disabled={loading || !language || !experience}
            >
              {loading ? 'Loading...' : 'Explore'}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-6 text-center">
            ❌ {error}
          </div>
        )}

        {careerData && experience && (
          <div className="mt-10 space-y-10">
            <CareerGraph
              data={careerData}
              onSelectCareer={(careerName) => setSelectedCareer(careerName)}
            />

            {selectedCareer && (
              <CareerDetailsBox
                data={careerData.find((item) => item.career === selectedCareer)!}
                experienceLevel={experience.value}
              />
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default ExplorePage;
