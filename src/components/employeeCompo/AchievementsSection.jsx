import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { AchievementCard } from './AchievementCard';

const achievements = [
  {
    id: 1,
    title: 'Leadership Excellence',
    criterion: 'Lead at least 5 projects successfully',
    date: '12-02-2025',
    points: 150,
    category: 'leadership',
  },
  {
    id: 2,
    title: 'Technical Maestro',
    criterion: 'Complete advanced certification',
    date: '15-02-2025',
    points: 200,
    category: 'technical',
  },
  {
    id: 3,
    title: 'Innovation Champion',
    criterion: 'Implement 3 innovative solutions',
    date: '18-02-2025',
    points: 175,
    category: 'innovation',
  },
  {
    id: 4,
    title: 'Team Player',
    criterion: 'Mentor 5 junior team members',
    date: '20-02-2025',
    points: 125,
    category: 'teamwork',
  },
  {
    id: 5,
    title: 'Project Excellence',
    criterion: 'Deliver project ahead of schedule',
    date: '22-02-2025',
    points: 180,
    category: 'leadership',
  },
];

export const AchievementsSection = () => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Rewards & Achievements
        </h2>
        <button className="px-4 py-2 text-sm font-medium text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors">
          View All
        </button>
      </div>

      <div className="relative group">
        <div
          ref={scrollContainerRef}
          className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {achievements.map((achievement) => (
            <div key={achievement.id} className="snap-start">
              <AchievementCard achievement={achievement} />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg"
        >
          <ChevronRight className="w-5 h-5 transform rotate-180 text-gray-600 dark:text-gray-300" />
        </button>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg"
        >
          <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    </div>
  );
};