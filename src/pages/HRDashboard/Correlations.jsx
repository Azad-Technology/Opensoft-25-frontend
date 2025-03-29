import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
 ResponsiveContainer ,Cell } from "recharts";

const dataMoodVsLeaves = [
  { mood: "Frustrated", leaves: 5 },
  { mood: "Sad", leaves: 6 },
  { mood: "Okay", leaves: 4 },
  { mood: "Happy", leaves: 3 },
  { mood: "Excited", leaves: 2 },
];

const moodColors = {
    Frustrated: "#ff4d4d", 
    Sad: "#800080", 
    Okay: "#ffcc00",
    Happy: "#33cc33", 
    Excited: "#00bfff",
  };

const dataMoodVsHours = [
  { mood: "Frustrated", hours: 7 },
  { mood: "Sad", hours: 7.2 },
  { mood: "Okay", hours: 8 },
  { mood: "Happy", hours: 8.5 },
  { mood: "Excited", hours: 9 },
];

const dataPerformanceVsSentiment = [
  { mood: "Frustrated", performance: 60 },
  { mood: "Sad", performance: 65 },
  { mood: "Okay", performance: 70 },
  { mood: "Happy", performance: 80 },
  { mood: "Excited", performance: 90 },
];

const tabs = [
  { id: 1, name: "Mood vs Leaves", data: dataMoodVsLeaves, key: "leaves", color: "#ff4d4d" },
  { id: 2, name: "Mood vs Working Hours", data: dataMoodVsHours, key: "hours", color: "#ffcc00" },
  { id: 3, name: "Performance vs Sentiment", data: dataPerformanceVsSentiment, key: "performance", color: "#33cc33" },
];

const CorrelationAnalysis = () => {
  const [activeTab, setActiveTab] = useState(1);

  const activeData = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-auto m-10">
      <h2 className="text-xl font-semibold mb-4">Correlation Analysis</h2>

  <div className="flex h-auto md:h-12 bg-gray-100 mb-5 justify-around rounded-lg sm:overflow-visible overflow-x-auto">
  {tabs.map((tab) => (
    <button
      key={tab.id}
      className={`m-1.5 w-full sm:w-1/3 h-auto py-2 px-4 rounded-t-md font-medium transition-colors hover:cursor-pointer ${
        activeTab === tab.id ? "bg-white text-green-400" : "text-gray-400"
      }`}
      onClick={() => setActiveTab(tab.id)}
    >
      {tab.name}
    </button>
  ))}
</div>

      <div className="flex flex-col items-center bg-gray-100 p-5 rounded-lg">
        <h3 className="text-lg font-medium mb-2">{activeData.name}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={activeData.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="mood" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={activeData.key} barSize={140} >
             {activeData.data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={moodColors[entry.mood] || "#999999"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CorrelationAnalysis;
