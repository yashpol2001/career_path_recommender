import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Explore', path: '/explore' },
  { name: 'Career Planner 🚀', path: '/careerflow' },
{ name: 'AI Tools 🤖', path: '/ai-tools' },
  { name: 'About', path: '/about' },
  

];

export const Navbar = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto flex justify-between items-center p-4 px-6">
        <ul className="flex space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <li key={item.name}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`transition-all duration-300 px-4 py-2 rounded-full cursor-pointer shadow-sm hover:shadow-md ${
                  location.pathname === item.path
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                    : 'text-gray-700 bg-indigo-50 hover:bg-indigo-100'
                }`}
              >
                <Link to={item.path}>{item.name}</Link>
              </motion.div>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
