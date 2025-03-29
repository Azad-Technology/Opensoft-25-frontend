import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { StarBadge } from './starBadge.jsx';

export const MetricCard = ({ title, value, trend, icon, rating }) => {
  const isPositive = trend >= 0;
    
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-green-100/80 dark:bg-green-900/80 backdrop-blur-sm rounded-lg">
          {icon}
        </div>
        <div
          className={`flex items-center ${
            isPositive ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          <span className="ml-1">{Math.abs(trend)}%</span>
        </div>
      </div>
      <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">
        {title}
      </h3>
      <div className="flex items-center justify-between mt-1">
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {value}
        </p>
        {rating && <StarBadge rating={rating} />}
      </div>
    </motion.div>
  );
};