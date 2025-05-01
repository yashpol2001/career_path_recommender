import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

const AiToolsPage = () => {
  const [resumeText, setResumeText] = useState('');
  const [resumeResult, setResumeResult] = useState<any>(null);
  const [selectedInterest, setSelectedInterest] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedGoal, setSelectedGoal] = useState('');
  const [learningPathResult, setLearningPathResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const interestOptions = ['AI', 'Web Development', 'Cybersecurity', 'Cloud Computing', 'Data Science'];
  const languageOptions = ['Python', 'JavaScript', 'Java', 'C++', 'Go'];
  const goalOptions = ['Build AI applications', 'Become a Full-Stack Developer', 'Get FAANG job', 'Start Freelancing', 'Get Certified'];

  const handleResumeAnalyze = async () => {
    setLoading(true);
    try {
      const res = await axios.post('https://career-path-backend-oac1.onrender.com/ai-tools/resume-analyzer', { resume_text: resumeText });
      setResumeResult(res.data);
    } catch {
      alert('Failed to analyze resume');
    }
    setLoading(false);
  };

  const handleLearningPathGenerate = async () => {
    setLoading(true);
    try {
      const res = await axios.post('https://career-path-backend-oac1.onrender.com/ai-tools/learning-path-generator', {
        interest: selectedInterest,
        known_languages: selectedLanguages,
        goal: selectedGoal
      });
      setLearningPathResult(res.data.response);
    } catch {
      alert('Failed to generate learning path');
    }
    setLoading(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post("https://career-path-backend-oac1.onrender.com/ai-tools/resume-upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setResumeText(res.data.extracted_text);
    } catch {
      alert("Failed to extract text.");
    }
  };

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages(prev =>
      prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
    );
  };

  const downloadLearningPathPDF = () => {
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(learningPathResult ?? '', 180);
    doc.text(lines, 10, 10);
    doc.save('learning_path.pdf');
  };

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-white to-indigo-50">
      <h1 className="text-4xl font-bold mb-10 text-purple-800 text-center">🛠 AI Tools</h1>

      <section className="mb-16 bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700">📄 Resume Analyzer</h2>
        <label>Upload PDF/DOCX:</label>
        <input type="file" accept=".pdf,.docx" onChange={handleFileUpload} className="mb-4" />
        <textarea value={resumeText} onChange={(e) => setResumeText(e.target.value)} rows={8} className="w-full p-4 border rounded mb-4" placeholder="Paste your resume here..." />
        <button onClick={handleResumeAnalyze} disabled={loading || !resumeText} className="px-6 py-2 bg-purple-600 text-white rounded">{loading ? 'Analyzing...' : 'Analyze Resume'}</button>

        {resumeResult?.response && (
          <div className="mt-4 p-4 bg-gray-50 border rounded">
            <h3 className="text-indigo-700 font-semibold mb-2">Gemini Response:</h3>
            <pre className="whitespace-pre-wrap text-sm">{resumeResult.response}</pre>
          </div>
        )}
      </section>

      <section className="bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700">📝 Learning Path Generator</h2>
        <label>Select Interest:</label>
        <select value={selectedInterest} onChange={e => setSelectedInterest(e.target.value)} className="w-full p-3 border rounded mb-4">
          <option value="">-- Select Interest --</option>
          {interestOptions.map(opt => <option key={opt}>{opt}</option>)}
        </select>

        <label>Select Known Languages:</label>
        <div className="flex flex-wrap gap-2 mb-4">
          {languageOptions.map(lang => (
            <button key={lang} onClick={() => toggleLanguage(lang)} className={`px-3 py-1 border rounded ${selectedLanguages.includes(lang) ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>
              {lang}
            </button>
          ))}
        </div>

        <label>Select Goal:</label>
        <select value={selectedGoal} onChange={e => setSelectedGoal(e.target.value)} className="w-full p-3 border rounded mb-4">
          <option value="">-- Select Goal --</option>
          {goalOptions.map(opt => <option key={opt}>{opt}</option>)}
        </select>

        <button onClick={handleLearningPathGenerate} disabled={loading || !selectedInterest || !selectedGoal || selectedLanguages.length === 0} className="px-6 py-2 bg-indigo-600 text-white rounded">
          {loading ? 'Generating...' : 'Generate Learning Path'}
        </button>

        {learningPathResult && (
          <div className="mt-4 p-4 bg-gray-50 border rounded">
            <h3 className="text-indigo-700 font-semibold mb-2">Generated Learning Path:</h3>
            <pre className="whitespace-pre-wrap text-sm">{learningPathResult}</pre>
            <button onClick={downloadLearningPathPDF} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">Download as PDF</button>
          </div>
        )}
      </section>
    </div>
  );
};

export default AiToolsPage;
