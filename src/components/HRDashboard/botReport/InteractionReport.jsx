import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const InteractionReports = ({ result }) => {
  const communicationActivity =
    result?.communication_activity?.weekly_averages || {};
  const activityLevel = result?.communication_activity?.activity_level || [];

  const communicationData = (communicationActivity) => {
    const daysOrder = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
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

  const activityLevelData = Object.values(activityLevel)
    .map((item) => ({
      ...item,
      formattedDate: new Date(item.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      dateObj: new Date(item.date),
    }))
    .sort((a, b) => a.dateObj - b.dateObj);

  return (
    <div className="p-4 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-5 border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Communication Activity
            </h2>
            <div className="text-xs text-gray-500 dark:text-gray-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
              Last 30 days
            </div>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={activityLevelData}
              margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="formattedDate"
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis tick={{ fontSize: 12 }} width={40} />
              <Tooltip
                labelFormatter={(value) => `Date: ${value}`}
                contentStyle={{
                  color: "#333",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "rgba(255,255,255,0.9)",
                }}
              />
              <Bar
                dataKey="teamsMessages"
                name="Teams Messages"
                fill="#8E44AD"
                radius={[10, 10, 0, 0]}
              />
              <Bar
                dataKey="emails"
                name="Emails"
                fill="#1ABC9C"
                radius={[10, 10, 0, 0]}
              />
              <Bar
                dataKey="meetings"
                name="Meetings"
                fill="#E67E22"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

          <div className="flex justify-center space-x-4 mt-2">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-lime-500 rounded-full"></div>
              <span className="text-xs text-gray-600 dark:text-gray-300">
                Team Messages
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-gray-600 dark:text-gray-300">
                Emails
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <span className="text-xs text-gray-600 dark:text-gray-300">
                Meetings
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-5 border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Inactivity Analysis
          </h2>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-green-500 rounded-full"></div>
                <span className="text-gray-700 dark:text-gray-300">
                  Team Messages
                </span>
              </div>
              <span className="text-gray-700 dark:text-gray-300">
                {communicationActivity?.teams_messages || "N/A"} / week
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                style={{
                  width: `${
                    result?.communication_activity?.communication_scores
                      ?.messages_score || 0
                  }%`,
                  backgroundColor: "#8E44AD",
                  height: "100%",
                  borderRadius: "inherit",
                }}
              ></div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 dark:text-gray-300">Emails</span>
              </div>
              <span className="text-gray-700 dark:text-gray-300">
                {communicationActivity?.emails || "N/A"} / week
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                style={{
                  width: `${
                    result?.communication_activity?.communication_scores
                      ?.emails_score || 0
                  }%`,
                  backgroundColor: "#1ABC9C",
                  height: "100%",
                  borderRadius: "inherit",
                }}
              ></div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-gray-500 rounded-full"></div>
                <span className="text-gray-700 dark:text-gray-300">
                  Meetings
                </span>
              </div>
              <span className="text-gray-700 dark:text-gray-300">
                {communicationActivity?.meetings || "N/A"} / week
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                style={{
                  width: `${
                    result?.communication_activity?.communication_scores
                      ?.meetings_score || 0
                  }%`,
                  backgroundColor: "#E67E22",
                  height: "100%",
                  borderRadius: "inherit",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractionReports;
