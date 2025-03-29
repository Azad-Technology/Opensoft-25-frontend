import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BotReports = () => {
  const [selectedEmployee, setSelectedEmployee] = useState("John Doe");
  const leaveData = [
    { month: "Jan", sickLeave: 1, personalLeave: 0, vacation: 0 },
    { month: "Feb", sickLeave: 0, personalLeave: 1, vacation: 0 },
    { month: "Mar", sickLeave: 2, personalLeave: 0, vacation: 1 },
  ];
  const leaveReasons = [
    { reason: "Medical appointment", days: 2 },
    { reason: "Family emergency", days: 1 },
    { reason: "Illness", days: 1 },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6 relative overflow-hidden">
      {/* Subtle Background Light Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-gray-900/10 to-gray-900/30 pointer-events-none"></div>
      
      {/* Subtle Backdrop Blur */}
      <div className="absolute inset-0 backdrop-blur-[2px] opacity-50 pointer-events-none"></div>

      {/* Header
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex justify-between items-center mb-6 bg-gray-900/60 rounded-xl p-4 backdrop-blur-md shadow-2xl border border-gray-800"
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 
            shadow-lg shadow-indigo-500/30 animate-pulse"></div>
          <select
            className="bg-gray-800 text-gray-200 rounded-lg px-3 py-2 
            border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600
            shadow-inner shadow-gray-900/50"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option>John Doe</option>
          </select>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-300">John Doe</div>
          <div className="text-xs text-gray-500">Engineering</div>
        </div>
      </motion.div> */}

      {/* Navigation Tabs
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 flex border-b border-gray-800 mb-6"
      >
        {[
          "Leave",
          "Interaction",
          "Employee Experience",
          "Performance",
          "Emotion Zone",
        ].map((tab) => (
          <div
            key={tab}
            className={`px-4 py-2 transition-all duration-300 ${
              tab === "Leave" 
                ? "border-b-2 border-indigo-600 text-indigo-400 font-bold" 
                : "text-gray-600 hover:text-gray-300"
            }`}
          >
            {tab}
          </div>
        ))}
      </motion.div> */}

      {/* Main Content */}
      <div className="grid grid-cols-2 gap-6 relative z-10">
        {/* Leave Density Chart */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gray-900/60 rounded-2xl p-6 backdrop-blur-md 
          border border-gray-800 shadow-2xl shadow-gray-900/50 hover:shadow-indigo-900/30 
          transition-shadow duration-300"
        >
          <h2 className="text-xl font-bold mb-4 text-indigo-400">Leave Density</h2>
          <div className="text-xs text-gray-500 mb-2">3 days this month</div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={leaveData}
                margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="month" stroke="#6366f1" />
                <YAxis stroke="#6366f1" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#111827', 
                    borderColor: '#1f2937',
                    color: '#6366f1'
                  }}
                />
                <Bar dataKey="sickLeave" stackId="a" fill="#6366f1" />
                <Bar dataKey="personalLeave" stackId="a" fill="#8b5cf6" />
                <Bar dataKey="vacation" stackId="a" fill="#a78bfa" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Sick Leave</span>
            <span>Personal Leave</span>
            <span>Vacation</span>
          </div>
        </motion.div>

        {/* Leave Analysis */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-gray-900/60 rounded-2xl p-6 backdrop-blur-md 
          border border-gray-800 shadow-2xl shadow-gray-900/50 hover:shadow-purple-900/30 
          transition-shadow duration-300"
        >
          <h2 className="text-xl font-bold mb-4 text-indigo-400">Leave Analysis</h2>

          {/* Leave Comment */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 
            border-l-4 border-indigo-600 p-4 mb-6 rounded-r-xl"
          >
            <p className="text-sm text-gray-300">
              Employee has taken more sick leave than average this month.
              Consider checking in about their wellbeing.
            </p>
          </motion.div>

          {/* Major Reasons for Leave */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-indigo-400">
              Major Reasons for Leave
            </h3>
            <AnimatePresence>
              {leaveReasons.map((reason, index) => (
                <motion.div
                  key={reason.reason}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: 0.7 + (index * 0.2) }}
                  className="flex justify-between text-sm mb-3 
                  bg-gray-800/50 p-3 rounded-xl 
                  hover:bg-gray-800/70 transition-all duration-300
                  shadow-md hover:shadow-indigo-900/30"
                >
                  <span className="text-gray-300">
                    {index + 1}. {reason.reason}
                  </span>
                  <span className="text-indigo-400 font-bold">
                    ({reason.days} days)
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Subtle Glow Effects */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-900/20 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl opacity-30 -z-10"></div>
    </div>
  );
};

export default BotReports;