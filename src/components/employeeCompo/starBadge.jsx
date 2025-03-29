import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const badgeColors = {
  3: {
    bg: 'from-amber-700 to-amber-500',
    border: 'border-amber-600',
    shadow: 'shadow-amber-500/20',
  },
  4: {
    bg: 'from-slate-400 to-slate-300',
    border: 'border-slate-400',
    shadow: 'shadow-slate-400/20',
  },
  5: {
    bg: 'from-yellow-500 to-yellow-300',
    border: 'border-yellow-400',
    shadow: 'shadow-yellow-400/20',
  },
};

export const StarBadge = ({ rating }) => {
  const colors = badgeColors[rating];
  const stars = Array(rating).fill(null);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center px-3 py-1.5 rounded-lg bg-gradient-to-r ${colors.bg} 
        border ${colors.border} ${colors.shadow} shadow-lg`}
      style={{
        boxShadow: 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.25)',
      }}
    >
      {stars.map((_, index) => (
        <Star
          key={index}
          size={16}
          className="text-white fill-white mr-0.5 last:mr-0"
          strokeWidth={1.5}
        />
      ))}
    </motion.div>
  );
};