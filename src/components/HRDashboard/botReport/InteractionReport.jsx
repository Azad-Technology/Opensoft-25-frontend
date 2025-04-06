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

const InteractionReports = ({ result }) => {


  console.log("result in Interaction Page" , result);
  const communicationActivity = result?.communication_activity?.weekly_pattern|| {};

  console.log("communication Activity" , communicationActivity);

  // const communicationData = (communicationActivity) => {
  //   const daysOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday","Sunday"];
  //   return daysOrder.map((day) => ({
  //     name: day,
  //     teamMessages: communicationActivity?.teams_messages || 0,
  //     emails: communicationActivity?.emails || 0,
  //     meetings: communicationActivity?.meetings || 0,
  //   }));
  // };

  const communicationData = (communicationActivity) => {
    const daysOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return daysOrder.map((day) => {
      const dayData = communicationActivity?.[day] || {};
      return {
        name: day,
        teamMessages: dayData.teams_messages || 0,
        emails: dayData.emails || 0,
        meetings: dayData.meetings || 0,
      };
    });
  };

  console.log("communicationData" , communicationData(communicationActivity));


  return (
    <div className="p-4 mt-10">
   
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
       
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-5 border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Communication Activity</h2>
            <div className="text-xs text-gray-500 dark:text-gray-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
              Last 7 days
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={communicationData(communicationActivity)}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="#90EE90" />
              <YAxis axisLine={false} tickLine={false} stroke="#90EE90" />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', color: '#fff', border: 'none' }} />
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
              <span className="text-xs text-gray-600 dark:text-gray-300">Team Messages</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-gray-600 dark:text-gray-300">Emails</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <span className="text-xs text-gray-600 dark:text-gray-300">Meetings</span>
            </div>
          </div>
        </div>

        
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-5 border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Inactivity Analysis</h2>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-green-500 rounded-full"></div>
                <span className="text-gray-700 dark:text-gray-300">Team Messages</span>
              </div>
              <span className="text-gray-700 dark:text-gray-300">{result?.communication_activity?.total_activity?.teams_messages}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: "60%" }}
              ></div>
            </div>
          </div>

        
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 dark:text-gray-300">Emails Sent</span>
              </div>
              <span className="text-gray-700 dark:text-gray-300">{result?.communication_activity?.total_activity?.emails}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{ width: "70%" }}
              ></div>
            </div>
          </div>

         
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-gray-500 rounded-full"></div>
                <span className="text-gray-700 dark:text-gray-300">Meetings Attended</span>
              </div>
              <span className="text-gray-700 dark:text-gray-300">{result?.communication_activity?.total_activity?.meetings}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-gray-500 h-2.5 rounded-full"
                style={{ width: "90%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractionReports;
