import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const InteractionReports = () => {
  const [selectedEmployee, setSelectedEmployee] = useState("John Doe");

  const communicationData = [
    { name: "Mon", teamMessages: 12, emails: 8, meetings: 1 },
    { name: "Tue", teamMessages: 15, emails: 10, meetings: 2 },
    { name: "Wed", teamMessages: 10, emails: 7, meetings: 3 },
    { name: "Thu", teamMessages: 9, emails: 6, meetings: 2 },
    { name: "Fri", teamMessages: 6, emails: 4, meetings: 1 },
  ];

  return (
    <div className="p-4 bg-white mt-10">
      {/* Main Content */}
      <div className="grid grid-cols-2 gap-4">
        {/* Communication Activity Chart */}
        <div className="border rounded p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Communication Activity</h2>
            <div className="text-xs text-gray-500 bg-green-100 px-2 py-1 rounded">
              Last 7 days
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={communicationData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="teamMessages"
                stroke="#84cc16"
                strokeWidth={3}
                dot={true}
              />
              <Line
                type="monotone"
                dataKey="emails"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={true}
              />
              <Line
                type="monotone"
                dataKey="meetings"
                stroke="#71717a"
                strokeWidth={3}
                dot={true}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-4 mt-2">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-lime-500 rounded-full"></div>
              <span className="text-xs">Team Messages</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs">Emails</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <span className="text-xs">Meetings</span>
            </div>
          </div>
        </div>

        {/* Inactivity Analysis */}
        <div className="border rounded p-4">
          <h2 className="text-lg font-semibold mb-4">Inactivity Analysis</h2>

          {/* Team Messages */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-green-500 rounded-full"></div>
                <span>Team Messages</span>
              </div>
              <span>50 / week</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: "60%" }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              60% of team average (83 messages)
            </div>
          </div>

          {/* Emails Sent */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                <span>Emails Sent</span>
              </div>
              <span>35 / week</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{ width: "70%" }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              70% of team average (50 emails)
            </div>
          </div>

          {/* Meetings Attended */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-gray-500 rounded-full"></div>
                <span>Meetings Attended</span>
              </div>
              <span>9 / week</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-gray-500 h-2.5 rounded-full"
                style={{ width: "90%" }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              90% of team average (10 meetings)
            </div>
          </div>

          {/* Inactivity Alert */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 mt-4">
            <div className="flex items-center space-x-2 mb-2">
              <svg
                className="w-5 h-5 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-yellow-600 font-semibold">
                Inactivity Alert
              </span>
            </div>
            <p className="text-sm text-gray-700">
              Team message activity is below expected levels. Consider checking
              if there are any communication barriers or workload issues.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractionReports;
