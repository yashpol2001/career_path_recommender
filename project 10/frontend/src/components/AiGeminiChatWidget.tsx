
import React, { useState } from 'react';
import axios from 'axios';

const AiGeminiChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: 'user' | 'ai'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { from: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/gemini-chat', {
        question: input
      });
      const aiMessage = { from: 'ai', text: response.data.answer };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [...prev, { from: 'ai', text: '⚠️ Failed to get response. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 bg-white shadow-xl rounded-xl border border-gray-300 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-4 py-2 font-semibold flex justify-between items-center">
            <span>Gemini AI</span>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>
          <div className="p-4 h-80 overflow-y-auto space-y-2 text-sm">
            {messages.map((msg, idx) => (
              <div key={idx} className={`p-2 rounded-md ${msg.from === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex border-t border-gray-200">
            <input
              type="text"
              className="flex-1 p-2 text-sm outline-none"
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
          🤖 Gemini Chat
        </button>
      )}
    </div>
  );
};

export default AiGeminiChatWidget;
