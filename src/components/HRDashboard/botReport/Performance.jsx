import React, { useEffect, useState } from "react";
import ViewPerformanceModal from '../ViewPerformanceModal'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Award } from "lucide-react";
import VibeChart from "../../employeeCompo/VibeChart";

const PerformanceReports = ({ result }) => {
  const [viewPerformanceModal , setViewPerformanceModal] = useState(false);

  return (
    <>
    <div className="p-4 mt-10">
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Performance Metrics Chart */}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-5 border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Vibe Trend</h2>
            <div className="text-xs text-gray-500 dark:text-gray-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
              Last 14 days
            </div>
          </div>

              {/* Chart */}
              < VibeChart
                vibes={result?.vibe_trend}
                height={180}
                className="mb-6"
              />

          <div className="flex justify-center space-x-4 mt-2">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-violet-600 rounded-full"></div>
              <span className="text-xs text-gray-600 dark:text-gray-300">Excited</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-600 dark:text-gray-300">Happy</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
              <span className="text-xs text-gray-600 dark:text-gray-300">Okay</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-sky-500 rounded-full"></div>
              <span className="text-xs text-gray-600 dark:text-gray-300">Sad</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span className="text-xs text-gray-600 dark:text-gray-300">Frustrated</span>
            </div>
          </div>
        </div>

        {/* Recognition & Feedback */}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-5 border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between">
            <h3 className="text-md font-semibold mb-2 text-gray-700 dark:text-gray-200">Awards & Recognition</h3>
            </div>

          {/* Performance Rating */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-green-500 rounded-full"></div>
                <span className="text-gray-700 dark:text-gray-300">Performance Rating</span>
              </div>
              {/* <span className="font-bold text-green-600 dark:text-green-400">{result.performance.Performance_Rating}/5</span> */}
              {result?.performance?.current?.rating ? (
             <span className="font-bold text-green-600 dark:text-green-400">
            {result.performance?.current?.rating}/5
            </span>
            ) : (
           <span className="text-gray-500">Not Available</span>
           )}
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: "84%" }}
              ></div>
            </div>
          </div>

          {/* Working Hours */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 dark:text-gray-300">Working Hours</span>
              </div>
              <span className="font-bold text-blue-600 dark:text-blue-400">
            {result?.communication_activity?.weekly_averages?.work_hours
            ? `${result.communication_activity.weekly_averages.work_hours} / week`
            : "NA"}
          </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{ width: `${result?.communication_activity?.weekly_averages?.work_hours*2}%` }}
              ></div>
            </div>
          </div>

          {/* Awards & Recognition */}
          <div className="mb-4">
            <h3 className="text-md font-semibold mb-2 text-gray-700 dark:text-gray-200">Awards & Recognition</h3>
            {result?.awards_and_recognition?.award_types?.length ? (
            <div className="flex flex-wrap gap-4">
          {result.awards_and_recognition?.award_types?.map((award, index) => (
           <div key={index} className="flex items-center space-x-2 bg-yellow-50 dark:bg-yellow-900/30 px-3 py-2 rounded">
          <div className="w-6 h-6 flex items-center justify-center text-white">
            <Award className="text-yellow-400"/>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{award}</div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <span className="text-xs text-gray-500">No awards yet</span>
  )}
          </div>

          {/* Manager Feedback */}
          <div className="bg-gray-50 dark:bg-gray-800/50 border-l-4 border-gray-500 p-3 mt-4">
            <h3 className="text-md font-semibold mb-2 text-gray-700 dark:text-gray-200">Manager Feedback</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
            {result?.performance?.current?result.performance.current.feedback : "No Feedback"}
            </p>
          </div>
        </div>
      </div>
    </div>
    {viewPerformanceModal && <ViewPerformanceModal setViewPerformanceModal={setViewPerformanceModal} />}
    </>
  );
};

export default PerformanceReports;
