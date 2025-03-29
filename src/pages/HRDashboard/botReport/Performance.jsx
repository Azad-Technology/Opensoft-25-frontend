import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const PerformanceReports = () => {
  const [selectedEmployee, setSelectedEmployee] = useState("John Doe");

  const performanceData = [
    { name: "Jan", productivity: 100, tasks: 2 },
    { name: "Feb", productivity: 150, tasks: 3 },
    { name: "Mar", productivity: 180, tasks: 4 },
  ];

  return (
    <div className="p-4 bg-white min-h-screen">
      {/* Main Content */}
      <div className="grid grid-cols-2 gap-4">
        {/* Performance Metrics Chart */}
        <div className="border rounded p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Performance Metrics</h2>
            <div className="text-xs text-gray-500 bg-green-100 px-2 py-1 rounded">
              Last 3 months
            </div>
          </div>

          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={performanceData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis
                yAxisId="left"
                orientation="left"
                stroke="#3b82f6"
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#10b981"
                axisLine={false}
                tickLine={false}
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="tasks"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="productivity"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>

          <div className="flex justify-center space-x-4 mt-2">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs">Tasks</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs">Productivity</span>
            </div>
          </div>
        </div>

        {/* Recognition & Feedback */}
        <div className="border rounded p-4">
          <h2 className="text-lg font-semibold mb-4">Recognition & Feedback</h2>

          {/* Performance Rating */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-green-500 rounded-full"></div>
                <span>Performance Rating</span>
              </div>
              <span className="font-bold text-green-600">4.2 / 5.0</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: "84%" }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Above team average (3.8)
            </div>
          </div>

          {/* Working Hours */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                <span>Working Hours</span>
              </div>
              <span className="font-bold text-blue-600">172 hrs / month</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{ width: "95%" }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              95% of expected hours (180)
            </div>
          </div>

          {/* Awards & Recognition */}
          <div className="mb-4">
            <h3 className="text-md font-semibold mb-2">Awards & Recognition</h3>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 bg-yellow-50 px-3 py-2 rounded">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white">
                  🏆
                </div>
                <div>
                  <div className="text-sm font-medium">Team Player Award</div>
                  <div className="text-xs text-gray-500">February</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white">
                  💡
                </div>
                <div>
                  <div className="text-sm font-medium">Innovation Award</div>
                  <div className="text-xs text-gray-500">January</div>
                </div>
              </div>
            </div>
          </div>

          {/* Manager Feedback */}
          <div className="bg-gray-50 border-l-4 border-gray-500 p-3 mt-4">
            <h3 className="text-md font-semibold mb-2">Manager Feedback</h3>
            <p className="text-sm text-gray-700">
              "John Doe has shown consistent improvement over the last quarter.
              Their project contributions have been valuable and they've
              demonstrated good teamwork skills. Areas for growth include taking
              more initiative on complex tasks."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceReports;
