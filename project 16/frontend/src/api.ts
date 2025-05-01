import axios from 'axios';
import { ApiResponse } from './types';

// ✅ Load from .env (defined as VITE_API_URL)
const API_URL = import.meta.env.VITE_API_URL || 'https://career-path-backend-oac1.onrender.com';
console.log("Calling API:", API_URL);

export const api = {
  getCareerRecommendation: async (programming_language: string, experience_level: string): Promise<ApiResponse> => {
    try {
      const response = await axios.post(`${API_URL}/career-recommendation`, {
        programming_language,
        experience_level
      }, {
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNREFUSED') {
          throw new Error('Unable to connect to the server. Please make sure the backend is running.');
        }
        throw new Error(error.response?.data?.detail || 'Failed to fetch recommendations. Please try again.');
      }
      throw error;
    }
  },

  getLearningPath: async (career: string, experienceLevel: string) => {
    try {
      const response = await axios.post(`${API_URL}/personalised-learning-path`, {
        career,
        experience_level: experienceLevel.toLowerCase()
      }, {
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNREFUSED') {
          throw new Error('Unable to connect to the server. Please make sure the backend is running.');
        }
        throw new Error(error.response?.data?.detail || 'Failed to fetch learning path. Please try again.');
      }
      throw error;
    }
  }
};
