import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from "../../contexts/AuthContext";
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { AchievementCard } from './AchievementCard';
import { div } from 'framer-motion/client';

// const achievements = [
//   {
//     id: 1,
//     title: 'Leadership Excellence',
//     criterion: 'Lead at least 5 projects successfully',
//     date: '12-02-2025',
//     points: 150,
//     category: 'leadership',
//   },
//   {
//     id: 2,
//     title: 'Technical Maestro',
//     criterion: 'Complete advanced certification',
//     date: '15-02-2025',
//     points: 200,
//     category: 'technical',
//   },
//   {
//     id: 3,
//     title: 'Innovation Champion',
//     criterion: 'Implement 3 innovative solutions',
//     date: '18-02-2025',
//     points: 175,
//     category: 'innovation',
//   },
//   {
//     id: 4,
//     title: 'Team Player',
//     criterion: 'Mentor 5 junior team members',
//     date: '20-02-2025',
//     points: 125,
//     category: 'teamwork',
//   },
//   {
//     id: 5,
//     title: 'Project Excellence',
//     criterion: 'Deliver project ahead of schedule',
//     date: '22-02-2025',
//     points: 180,
//     category: 'leadership',
//   },
// ];




export const AchievementsSection = ({awards}) => {
  const scrollContainerRef = useRef(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const BASE_URL = import.meta.env.VITE_REACT_APP_URL;

  useEffect(() => {
    if (!token) return;

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/employee/dashboard/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          throw new Error("Expected JSON but got: " + text);
        }

        const data = await response.json();

        // Update stats directly with the new data
        setStats(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token, BASE_URL]);

  const achievements = stats?.awards || [];
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

      {(!awards)? <div className="relative group">
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
      </div>:<div className="flex items-center justify-center h-32 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">No Achievements</div>}
    </div>
  );
};