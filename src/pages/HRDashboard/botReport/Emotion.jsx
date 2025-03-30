import React, { useState } from "react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const BotReportsEmotionalState = () => {
  const [selectedEmployee, setSelectedEmployee] = useState("John Doe");

  const emotionalStateData = [
    { dimension: "Happy", value: 75, fullMark: 100 },
    { dimension: "Satisfied", value: 65, fullMark: 100 },
    { dimension: "Motivated", value: 60, fullMark: 100 },
    { dimension: "Stressed", value: 30, fullMark: 100 },
    { dimension: "Tired", value: 40, fullMark: 100 },
    { dimension: "Frustrated", value: 25, fullMark: 100 },
  ];

  const keyInsights = [
    "Employee shows generally positive emotional state with high happiness and satisfaction scores",
    "Moderate stress levels detected, potentially related to recent project deadlines",
    "Motivation levels are good but could be improved with additional recognition",
    "Frustration levels are low, indicating good problem-solving and team support",
  ];

  return (
    <div className="p-4 mt-10">
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Emotional State Chart */}
        <div className="bg-white shadow-xl rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-4">Emotional State</h2>
          <p className="text-xs text-gray-500 mb-2">
            Based on bot interactions
          </p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                data={emotionalStateData}
                margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
              >
                <PolarGrid />
                <PolarAngleAxis dataKey="dimension" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  dataKey="value"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Emotional Inferences */}
        <div className="bg-white shadow-xl rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-4">Emotional Inferences</h2>
          <p className="text-sm text-gray-600 mb-4">
            Based on natural language processing of bot conversations, the
            following emotional patterns were detected.
          </p>

          <div className="space-y-2">
            <h3 className="text-md font-semibold mb-2">Key Insights</h3>
            {keyInsights.map((insight, index) => (
              <div key={index} className="flex items-start text-sm">
                <span className="mr-2 text-green-500 font-bold">
                  {index + 1}
                </span>
                <p>{insight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotReportsEmotionalState;
