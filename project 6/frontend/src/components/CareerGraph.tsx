import React from 'react';
import { motion } from 'framer-motion';
import { RecommendationDetails } from '../types';

interface Props {
  data: RecommendationDetails[];
  onSelectCareer: (careerName: string) => void;
  experienceLevel: string;
}

const NODE_WIDTH = 160;
const NODE_HEIGHT = 60;
const spacingX = 180;
const startY = 60;
const COLORS = ['#fca5a5', '#fde68a', '#a5f3fc', '#c4b5fd', '#bbf7d0', '#fdba74'];

const CareerGraph: React.FC<Props> = ({ data, onSelectCareer }) => {
  const nodes = data.slice(0, 6); // max 6 for balance
  const treeWidth = (nodes.length - 1) * spacingX + NODE_WIDTH;
  const rootX = treeWidth / 2;
  const childY = startY + 140;

  return (
    <div className="relative w-full overflow-x-auto bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-xl py-12">
      <div className="min-w-[640px] mx-auto relative" style={{ width: `${treeWidth}px`, height: `${childY + NODE_HEIGHT + 60}px` }}>
        {/* Root Node */}
        <motion.div
          className="absolute z-10 bg-indigo-600 text-white font-bold px-6 py-3 rounded-full shadow-lg text-sm text-center"
          style={{
            top: startY,
            left: rootX - NODE_WIDTH / 2,
            width: NODE_WIDTH,
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          You 🌱
        </motion.div>

        {/* SVG Connectors */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          {nodes.map((_, i) => {
            const childX = i * spacingX + NODE_WIDTH / 2;
            return (
              <path
                key={i}
                d={`M ${rootX} ${startY + NODE_HEIGHT} C ${rootX} ${startY + 90}, ${childX} ${childY - 50}, ${childX} ${childY}`}
                stroke="#a78bfa"
                strokeWidth="2"
                fill="none"
              />
            );
          })}
        </svg>

        {/* Child Nodes */}
        {nodes.map((role, i) => {
          const x = i * spacingX;
          return (
            <motion.div
              key={role.career}
              onClick={() => onSelectCareer(role.career)}
              className="absolute rounded-xl cursor-pointer text-sm font-semibold text-center shadow-md hover:shadow-xl border-2"
              style={{
                width: NODE_WIDTH,
                height: NODE_HEIGHT,
                top: childY,
                left: x,
                backgroundColor: COLORS[i % COLORS.length],
                borderColor: '#a78bfa',
                boxShadow: `0 0 10px ${COLORS[i % COLORS.length]}`,
              }}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center justify-center h-full px-2">
                {role.career}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CareerGraph;
