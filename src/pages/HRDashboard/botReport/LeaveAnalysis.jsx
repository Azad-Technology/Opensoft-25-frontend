import React, { useState } from "react";
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
    <div className="p-4 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-green-500"></div>
          <select
            className="border rounded px-2 py-1"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option>John Doe</option>
          </select>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">John Doe</div>
          <div className="text-xs text-gray-500">Engineering</div>
        </div>
      </div>
      {/* Navigation Tabs */}
      <div className="flex border-b mb-4">
        {[
          "Leave",
          "Interaction",
          "Employee Experience",
          "Performance",
          "Emotion Zone",
        ].map((tab) => (
          <div
            key={tab}
            className={`px-4 py-2 ${tab === "Leave" ? "border-b-2 border-green-500 text-green-500" : "text-gray-500"}`}
          >
            {tab}
          </div>
        ))}
      </div>
      {/* Main Content */}
      <div className="grid grid-cols-2 gap-4">
        {/* Leave Density Chart */}
        <div className="border rounded p-4">
          <h2 className="text-lg font-semibold mb-4">Leave Density</h2>
          <div className="text-xs text-gray-500 mb-2">3 days this month</div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={leaveData}
                margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sickLeave" stackId="a" fill="#86d3ff" />
                <Bar dataKey="personalLeave" stackId="a" fill="#82ca9d" />
                <Bar dataKey="vacation" stackId="a" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-2">
            <span>Sick Leave</span>
            <span>Personal Leave</span>
            <span>Vacation</span>
          </div>
        </div>
        {/* Leave Analysis */}
        <div className="border rounded p-4">
          <h2 className="text-lg font-semibold mb-4">Leave Analysis</h2>

          {/* Leave Comment */}
          <div className="bg-green-50 border-l-4 border-green-500 p-3 mb-4">
            <p className="text-sm text-gray-700">
              Employee has taken more sick leave than average this month.
              Consider checking in about their wellbeing.
            </p>
          </div>
          {/* Major Reasons for Leave */}
          <div>
            <h3 className="text-md font-semibold mb-2">
              Major Reasons for Leave
            </h3>
            {leaveReasons.map((reason, index) => (
              <div
                key={reason.reason}
                className="flex justify-between text-sm mb-1"
              >
                <span>
                  {index + 1}. {reason.reason}
                </span>
                <span>({reason.days} days)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotReports;
