import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { AchievementCard } from './AchievementCard';
import { Info } from 'lucide-react';
import Tooltips from './Tooltip';


export const AchievementsSection = ({ awards }) => {
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
        <h2 className="text-xl font-medium">Rewards & Achievements</h2>
        <Tooltips text={"This section highlights the awards, certifications, and milestones that showcase your skills and dedication."} placement="left">
          <Info className="text-muted-foreground" size={20} />
        </Tooltips>
      </div>


      {(awards.length > 0) ? <div className="relative group">
        <div
          ref={scrollContainerRef}
          className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {awards.map((achievement, index) => (
            <div key={index} className="snap-start">
              <AchievementCard achievement={achievement} />
            </div>
          ))}
        </div>

        {(awards.length > 3) && <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg"
        >
          <ChevronRight className="w-5 h-5 transform rotate-180 text-gray-600 dark:text-gray-300" />
        </button>}

        {(awards.length > 3) && <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg"
        >
          <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>}
      </div> : <div className="flex items-center justify-center h-32 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">No Achievements</div>}
    </div>
  );
};