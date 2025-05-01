import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const AiGeminiChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: 'user' | 'ai'; text: string; time: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const formatTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { from: 'user', text: input, time: formatTime() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('https://career-path-backend-oac1.onrender.com/gemini-chat', {
        question: input
      });
      const aiMessage = { from: 'ai', text: response.data.answer, time: formatTime() };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [...prev, { from: 'ai', text: '⚠️ Failed to get response. Please try again.', time: formatTime() }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ from: 'ai', text: "👋 Hello! I’m CareerBot. Ask me anything about tech careers, learning paths, or programming skills!", time: formatTime() }]);
    }
  }, [isOpen]);

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${darkMode ? 'dark' : ''}`}>
      {isOpen ? (
        <div className={`w-80 shadow-xl rounded-xl border overflow-hidden flex flex-col ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-gray-300'}`}>
          <div className="flex justify-between items-center px-4 py-2 font-bold bg-indigo-700 text-white border-b border-indigo-900">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤖</span>
              <span className="tracking-wide">CareerBot</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setDarkMode(!darkMode)} title="Toggle Theme">🌓</button>
              <button onClick={() => setIsOpen(false)}>✖</button>
            </div>
          </div>
          <div className="p-4 flex-1 overflow-y-auto space-y-3 text-sm">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className="flex items-end gap-2">
                  {msg.from === 'ai' && <div className="text-lg">🧠</div>}
                  <div className={`p-2 rounded-md max-w-xs ${msg.from === 'user' ? 'bg-blue-100 text-right' : darkMode ? 'bg-gray-700 text-left' : 'bg-gray-100 text-left'}`}>
                    <p>{msg.text}</p>
                    <span className="block mt-1 text-xs text-gray-500 text-right">{msg.time}</span>
                  </div>
                  {msg.from === 'user' && <div className="text-lg">🙋‍♂️</div>}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <div className="text-lg">🧠</div>
                  <div className="animate-pulse">Typing...</div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex border-t border-gray-200 dark:border-gray-700">
            <input
              type="text"
              className="flex-1 p-2 text-sm outline-none dark:bg-gray-800 dark:text-white"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={loading}
            />
            <button
              onClick={handleSend}
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
          🤖 Ask CareerBot
        </button>
      )}
    </div>
  );
};

export default AiGeminiChatWidget;
