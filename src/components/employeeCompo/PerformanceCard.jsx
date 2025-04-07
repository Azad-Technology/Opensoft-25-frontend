import React from "react";
import { motion } from "framer-motion";

const PerformanceReviewCard = ({
  review = {
    Review_Period: "H1 2023",
    Performance_Rating: 4,
    Manager_Feedback: "Needs Improvement",
  },
}) => {
  // Rating colors based on performance score (1-5)
  const ratingColors = {
    1: "bg-red-500",
    2: "bg-orange-500",
    3: "bg-yellow-500",
    4: "bg-blue-500",
    5: "bg-green-500",
  };

  // Rating labels
  const ratingLabels = {
    1: "Poor",
    2: "Below Average",
    3: "Average",
    4: "Good",
    5: "Excellent",
  };

  // Calculate the percentage for the progress bar (rating out of 5)
  const ratingPercentage = (review.Performance_Rating / 5) * 100;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 mb-2 shadow-lg border border-gray-100 dark:border-gray-700"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Performance Review
        </h3>
        <span
          className={`px-2 py-1 text-xs font-medium text-white rounded-full ${
            ratingColors[review.Performance_Rating] || "bg-gray-500"
          }`}
        >
          {ratingLabels[review.Performance_Rating] || "Not Rated"}
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-full text-sm text-gray-700 dark:text-gray-300">
            {review.Review_Period}
          </span>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Rating
            </span>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {review.Performance_Rating}/5
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${ratingPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-2 rounded-full ${ratingColors[review.Performance_Rating] || "bg-gray-500"}`}
            />
          </div>
        </div>

        <div className="mt-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
            Manager Feedback
          </p>
          <div className="bg-gray-100/80 dark:bg-gray-700/80 rounded-lg p-3">
            <p className="text-gray-700 dark:text-gray-300">
              {review.Manager_Feedback}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PerformanceReviewCard;
