import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

const categoryColors = {
  "Leadership Excellence": {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-800',
  },
  "Innovation Award": {
    bg: 'bg-green-50 dark:bg-green-900/20',
    text: 'text-green-600 dark:text-green-400',
    border: 'border-green-200 dark:border-green-800',
  },
  "Best Team Player": {
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-200 dark:border-purple-800',
  },
  "Star Performer": {
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    text: 'text-orange-600 dark:text-orange-400',
    border: 'border-orange-200 dark:border-orange-800',
  },
};

export const AchievementCard = ({ achievement }) => {
  const colors = categoryColors[achievement.type];

  return (
    <motion.div
      whileHover={{ x: 2,y: 2, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`flex-shrink-0 w-[300px] ${colors.bg} backdrop-blur-sm p-6 rounded-xl shadow-lg border ${colors.border}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2 rounded-lg ${colors.bg}`}>
          <Award className={`w-6 h-6 ${colors.text}`} />
        </div>
        <span className={`text-lg font-bold ${colors.text}`}>+{achievement.reward_points} pts</span>
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {achievement.type}
      </h3>
      
      {/* <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {achievement.criterion}
      </p> */}
      
      <div className="text-xs text-gray-500 dark:text-gray-500">
        Accomplished on {achievement.date}
      </div>
    </motion.div>
  );
};