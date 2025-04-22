import React, { useState } from 'react';
import axios from 'axios';

const ResumeAnalyzerPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('resume', file);
    setLoading(true);
    setResult('');

    try {
      const res = await axios.post('http://localhost:8000/analyze-resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(res.data.analysis);
    } catch (err) {
      console.error(err);
      setResult('❌ Failed to analyze resume.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white py-10 px-6">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">🧾 AI-Powered Resume Analyzer</h1>

        <input
          type="file"
          accept=".pdf,.docx,.txt"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-4 text-sm"
        />

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-indigo-700 transition"
        >
          {loading ? 'Analyzing...' : 'Analyze Resume'}
        </button>

        {result && (
          <div className="mt-6 bg-gray-100 dark:bg-gray-700 p-4 rounded text-sm whitespace-pre-wrap">
            {result}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeAnalyzerPage;
