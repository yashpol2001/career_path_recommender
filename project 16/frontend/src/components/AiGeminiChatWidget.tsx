import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const botAvatar = 'https://api.dicebear.com/7.x/bottts/svg?seed=NextStepAI';
const userAvatar = 'https://api.dicebear.com/7.x/thumbs/svg?seed=User';

const cleanText = (text: string) => {
  return text.replace(/\*\*/g, '').replace(/\*/g, '').trim();
};

const AiGeminiChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: 'user' | 'ai'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [dynamicSuggestions, setDynamicSuggestions] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ from: 'ai', text: "👋 Hi! I'm NextStep AI. Ask me anything about tech careers, skills, and growth!" }]);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const generateSuggestions = (text: string) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('career')) {
      return ['🔎 Explore career options', '🛠 Recommend skills to learn', '🎯 Help me choose a path'];
    } else if (lowerText.includes('skills')) {
      return ['📚 Show skill-building resources', '🏆 Recommended certifications'];
    } else if (lowerText.includes('project')) {
      return ['💻 Suggest projects', '🚀 Help me build a portfolio'];
    } else {
      return ['🤔 Tell me more', '🔍 Explore more topics', '📈 Guide my growth'];
    }
  };

  const streamText = async (fullText: string) => {
    let index = 1;

    setMessages((prev) => {
      const last = prev[prev.length - 1];
      if (last && last.from === 'ai') {
        const updated = [...prev.slice(0, -1), { ...last, text: fullText.slice(0, 1) }];
        return updated;
      } else {
        return prev;
      }
    });

    const interval = setInterval(() => {
      setMessages((prev) => {
        if (index >= fullText.length) {
          clearInterval(interval);
          setShowSuggestions(true);
          return prev;
        }

        const last = prev[prev.length - 1];
        if (last && last.from === 'ai') {
          const updated = [...prev.slice(0, -1), { ...last, text: fullText.slice(0, index + 1) }];
          return updated;
        } else {
          return prev;
        }
      });
      index++;
    }, 20);
  };

  const handleSend = async (customInput?: string) => {
    const text = customInput || input;
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { from: 'user', text }]);
    setInput('');
    setLoading(true);
    setError('');
    setShowSuggestions(false);

    try {
      const response = await axios.post('https://career-path-backend-oac1.onrender.com/gemini-chat', { question: text });
      let aiResponse = response.data.answer;
      if (!aiResponse || typeof aiResponse !== 'string') {
        throw new Error('Invalid response from AI.');
      }
      aiResponse = cleanText(aiResponse);

      setMessages((prev) => {
        const updated = [...prev, { from: 'ai', text: '' }];
        setTimeout(() => {
          streamText(aiResponse);
        }, 10);
        return updated;
      });

      setDynamicSuggestions(generateSuggestions(aiResponse));
    } catch (err) {
      console.error('Error sending message:', err);
      setError('⚠️ Failed to get response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 bg-white shadow-xl rounded-xl border border-gray-300 overflow-hidden flex flex-col">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-4 py-2 font-semibold flex justify-between items-center">
            <span>NextStep AI</span>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>
          <div className="p-4 overflow-y-auto space-y-3 text-sm" style={{ height: '400px' }}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex items-start gap-2 ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.from === 'ai' && <img src={botAvatar} alt="AI" className="w-8 h-8 rounded-full" />}
                <div className={`p-2 rounded-md max-w-[70%] ${msg.from === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'}`}>
                  {msg.text}
                </div>
                {msg.from === 'user' && <img src={userAvatar} alt="User" className="w-8 h-8 rounded-full" />}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-gray-500">
                <img src={botAvatar} alt="AI" className="w-8 h-8 rounded-full" />
                <div className="flex gap-1 animate-pulse">
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                </div>
              </div>
            )}
            {showSuggestions && !loading && (
              <div className="flex flex-wrap gap-2 mt-4">
                {dynamicSuggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(suggestion)}
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full hover:bg-indigo-200 transition"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          {error && (
            <div className="text-center text-red-500 text-xs py-2">
              {error}
              <button
                onClick={() => handleSend(messages[messages.length - 1]?.text)}
                className="ml-2 underline text-blue-600"
              >
                Retry
              </button>
            </div>
          )}
          <div className="flex border-t border-gray-200">
            <input
              type="text"
              className="flex-1 p-2 text-sm outline-none"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setShowSuggestions(false);
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={loading}
            />
            <button
              onClick={() => handleSend()}
              className="bg-blue-600 text-white px-4 text-sm disabled:opacity-50"
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-indigo-700 transition"
        >
          🤖 NextStep AI
        </button>
      )}
    </div>
  );
};

export default AiGeminiChatWidget;
