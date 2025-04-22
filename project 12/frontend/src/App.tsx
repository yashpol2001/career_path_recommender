import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import AboutPage from './pages/AboutPage';
import AiGeminiChatWidget from './components/AiGeminiChatWidget';
import AiToolsPage from './pages/AiToolsPage';
import ResumeAnalyzerPage from './pages/ResumeAnalyzerPage';
import LearningPlanGeneratorPage from './pages/LearningPlanGeneratorPage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/ai-tools" element={<AiToolsPage />} />
        <Route path="/resume-analyzer" element={<ResumeAnalyzerPage />} />
        <Route path="/learning-plan" element={<LearningPlanGeneratorPage />} />
        <Route path="*" element={<div className="text-center py-10 text-red-600 text-xl">404 - Page Not Found</div>} />
      </Routes>
      <AiGeminiChatWidget />
    </>
  );
}

export default App;
