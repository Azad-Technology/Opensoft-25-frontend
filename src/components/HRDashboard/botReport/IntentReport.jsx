
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend
} from "recharts";
import { Info } from "lucide-react";
import { a } from "framer-motion/client";

const IntentReport = ({ result }) => {
  const intentData = result?.intent_analysis || {
    tags: [],
    primary_issues: "No intent analysis available",
  };

  const priorityToValue = {
    High: 3,
    Medium: 2,
    Low: 1,
  };

  const formatTag = (tag) => {
    if (!tag) return "Unknown";
    return tag.replace(/_/g, " ");
  };

  const getPriority = (weight) => {
    if (weight > 0.6) return "High";
    if (weight >= 0.4) return "Medium";
    return "Low";
  };

  const getColor = (priority) => {
    if (priority === "High") return "#EF4444";
    if (priority === "Medium") return "#F59E0B";
    return "#10B981";
  };

  const graphData = [];
  if (intentData?.tags && Array.isArray(intentData.tags)) {
    intentData.tags.forEach((tag) => {
      if (tag && typeof tag === "object") {
        const tagText = tag.tag || "Unnamed";
        const weight = typeof tag.weight === "number" ? tag.weight : 0;
        const priority = getPriority(weight);
        graphData.push({
          tag: formatTag(tagText),
          priority: priority,
          value: priorityToValue[priority],
        });
      }
    });
  }

  const getTagInfo = (weight) => {
    if (weight > 0.6) return "from-red-500 to-red-400";
    if (weight >= 0.4) return "from-yellow-500 to-yellow-400";
    return "from-green-500 to-green-400";
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload?.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-100 p-2 rounded shadow">
          <p><strong>{data.tag}</strong></p>
          <p>Priority: {data.priority}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bar Chart Section */}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-5 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Vibemeter Priority Distribution
            </h2>
            <div className="group relative flex items-center">
              <Info className="w-5 h-5 text-gray-500 dark:text-gray-400 cursor-pointer" />
              <div className="absolute z-10 left-6 top-0 w-max bg-gray-800 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition">
                High = 3, Medium = 2, Low = 1
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            Based on bot interactions
          </p>

          <div className="w-full overflow-x-auto">
            <div className="min-w-[350px] h-64">
              {graphData.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={graphData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <YAxis
                      allowDecimals={false}
                      ticks={[1, 2, 3]}
                      domain={[0, 3]}
                      tick={{ fontSize: 12 }}
                    />
                    console.log(graphData)
                    <XAxis dataKey="tag" fontSize={12}/>
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value">
                      {graphData.map((entry, index) => (
                        <Cell key={index} fill={getColor(entry.priority)} />
                      ))}
                    </Bar>
                    <Legend payload={[{value: 'High', type: 'square', color:'#EF4444'},{value: 'Medium', type: 'square', color:'#F59E0B'},{value: 'Low', type: 'square', color:'#10B981'}]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  No priority data available
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-5 border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Vibemeter Summary
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            {intentData?.primary_issues || "No summary available"}
          </p>

          <div className="space-y-2">
            <h3 className="text-md font-semibold mb-2 text-gray-700 dark:text-gray-200">
              Diagnostic Insights
            </h3>
            {intentData?.tags?.length ? (
              intentData.tags.map((tag, index) => {
                const tagText = tag.tag || "Unnamed";
                const weight = typeof tag.weight === "number" ? tag.weight : 0;
                const tagInfo = getTagInfo(weight);
                return (
                  <div key={index} className="flex flex-col items-start text-sm w-full">
                    <p className="text-gray-700 dark:text-gray-300">
                      {formatTag(tagText)}
                    </p>
                    <div className="mb-3 w-full">
                      <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                        <span>Priority:</span>
                        <span
                          className={
                            weight > 0.6
                              ? "text-red-500"
                              : weight >= 0.4
                              ? "text-yellow-500"
                              : "text-green-500"
                          }
                        >
                          {weight > 0.6
                            ? "High"
                            : weight >= 0.4
                            ? "Medium"
                            : "Low"}
                        </span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${tagInfo}`}
                          style={{ width: `${weight * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 py-4">
                No diagnostic insights available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntentReport;
