// src/pages/LearningPlanGeneratorPage.tsx
import React, { useState } from 'react';
import jsPDF from 'jspdf';

const LearningPlanGeneratorPage = () => {
  const [language, setLanguage] = useState('Python');
  const [level, setLevel] = useState('Beginner');
  const [plan, setPlan] = useState<string[]>([]);

  const generatePlan = () => {
    const steps = [
      `Start with ${language} fundamentals`,
      'Build simple projects',
      'Take intermediate courses',
      'Contribute to open source',
      'Prepare for interviews'
    ];
    setPlan(steps);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`📘 Personalized Learning Plan`, 20, 20);
    doc.setFontSize(12);
    doc.text(`Language: ${language}`, 20, 30);
    doc.text(`Level: ${level}`, 20, 40);
    plan.forEach((step, i) => {
      doc.text(`${i + 1}. ${step}`, 20, 60 + i * 10);
    });
    doc.save('learning_plan.pdf');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white py-12 px-4">
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">📄 Personalized Learning Plan Generator</h1>

        <div className="mb-4">
          <label className="block text-sm mb-1">Select Language:</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full px-3 py-2 border rounded">
            <option>Python</option>
            <option>JavaScript</option>
            <option>Java</option>
            <option>C++</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Select Experience Level:</label>
          <select value={level} onChange={(e) => setLevel(e.target.value)} className="w-full px-3 py-2 border rounded">
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>

        <button onClick={generatePlan} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Generate Plan
        </button>

        {plan.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">🧭 Your Plan:</h2>
            <ul className="list-disc list-inside space-y-1">
              {plan.map((step, idx) => <li key={idx}>{step}</li>)}
            </ul>
            <button onClick={downloadPDF} className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
              📥 Download as PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningPlanGeneratorPage;
