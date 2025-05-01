import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import AboutPage from './pages/AboutPage';
import CareerFlow from './pages/CareerFlow';
import AiGeminiChatWidget from './components/AiGeminiChatWidget';
import AiToolsPage from './pages/AiToolsPage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/careerflow" element={<CareerFlow />} />
	<Route path="/ai-tools" element={<AiToolsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="*"
          element={<div className="text-center py-10 text-red-600 text-xl">404 - Page Not Found</div>}
        />
      </Routes>
      <AiGeminiChatWidget />
    </>
  );
}

export default App;
