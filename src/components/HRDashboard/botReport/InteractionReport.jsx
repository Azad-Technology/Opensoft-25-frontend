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
  const [selectedEmployee, setSelectedEmployee] = useState("John Doe");


  // const communicationData = [
  //   { name: "Mon", teamMessages: 12, emails: 8, meetings: 1 },
  //   { name: "Tue", teamMessages: 15, emails: 10, meetings: 2 },
  //   { name: "Wed", teamMessages: 10, emails: 7, meetings: 3 },
  //   { name: "Thu", teamMessages: 9, emails: 6, meetings: 2 },
  //   { name: "Fri", teamMessages: 6, emails: 4, meetings: 1 },
  // ];
  console.log("result in Interaction Page" , result);
  const communicationActivity = result?.communication_activity_weekly || {};

  const communicationData = (communicationActivity) => {
    const daysOrder = ["Mon", "Tue", "Wed", "Thu", "Fri","Sat","Sun"];
    return daysOrder.map((day) => ({
      name: day,
      teamMessages: communicationActivity[day]?.teams_messages_sent || 0,
      emails: communicationActivity[day]?.emails_sent || 0,
      meetings: communicationActivity[day]?.meetings_attended || 0,
    }));
  };

  console.log("communicationData" , communicationData(communicationActivity));

  const totalCommunication = Object.values(result?.communication_activity_weekly).reduce(
    (acc, day) => {
        acc.teamMessages += day.teams_messages_sent;
        acc.emails += day.emails_sent;
        acc.meetings += day.meetings_attended;
        return acc;
    },
    { teamMessages: 0, emails: 0, meetings: 0 }
);

console.log(totalCommunication);

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
              <span className="text-gray-700 dark:text-gray-300">{totalCommunication.teamMessages} / week</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: "60%" }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              60% of team average (83 messages)
            </div>
          </div>

        
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 dark:text-gray-300">Emails Sent</span>
              </div>
              <span className="text-gray-700 dark:text-gray-300">{totalCommunication.emails} / week</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{ width: "70%" }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              70% of team average (50 emails)
            </div>
          </div>

         
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-gray-500 rounded-full"></div>
                <span className="text-gray-700 dark:text-gray-300">Meetings Attended</span>
              </div>
              <span className="text-gray-700 dark:text-gray-300">{totalCommunication.meetings} / week</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-gray-500 h-2.5 rounded-full"
                style={{ width: "90%" }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              90% of team average (10 meetings)
            </div>
          </div>

         
          <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-500 p-3 mt-4">
            <div className="flex items-center space-x-2 mb-2">
              <svg
                className="w-5 h-5 text-yellow-500 dark:text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-yellow-600 dark:text-yellow-400 font-semibold">
                Inactivity Alert
              </span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
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
