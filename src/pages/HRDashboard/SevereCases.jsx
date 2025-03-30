import { useState } from "react";
import React from "react";
import { AlertTriangle, Eye, Search } from "lucide-react";

const severeCases = [
  { name: "Michael Chen", role: "Senior Analyst", department: "Finance", score: 3.2, risk: "HIGH", lastInteraction: "2 days ago" },
  { name: "David Kim", role: "UX Designer", department: "Technology", score: 2.9, risk: "HIGH", lastInteraction: "3 days ago" },
  { name: "Robert Johnson", role: "Senior Associate", department: "Audit", score: 3.5, risk: "HIGH", lastInteraction: "6 days ago" }
];

const getRiskColor = (risk) => {
  return risk === "HIGH"
    ? "bg-red-600 dark:bg-red-700 text-white"
    : "bg-yellow-500 dark:bg-yellow-600 text-black dark:text-white";
};

const SevereCases = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCases = severeCases.filter((caseItem) =>
    `${caseItem.name} ${caseItem.role} ${caseItem.department}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mt-7 ml-8 mr-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-red-400 dark:text-red-300 flex items-center gap-2">
          <AlertTriangle className="text-yellow-400 dark:text-yellow-300" size={22} /> Severe Cases
        </h2>
        <button className="text-green-400 dark:text-green-300 font-semibold hover:underline
        flex items-center gap-1 hover:cursor-pointer">
          <Eye size={18} /> View All
        </button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" size={18} />
        <input
          type="text"
          placeholder="Search by name, role, or department..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg shadow-sm outline-none
          border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200"
        />
      </div>

      <ul className="space-y-4">
        {filteredCases.map((caseItem, index) => (
          <li key={index} className="flex justify-between items-center
          p-4 rounded-xl shadow-md transition duration-300
          bg-gray-100 dark:bg-gray-800/50 hover:cursor-pointer
          hover:shadow-[0_0_15px_rgba(255,255,255,0.8)] dark:hover:shadow-[0_0_15px_rgba(0,0,0,0.8)]
          border border-gray-200 dark:border-gray-700">
            <div>
              <span className="block font-semibold text-black dark:text-white">{caseItem.name}</span>
              <span className="text-sm text-gray-400 dark:text-gray-500">{caseItem.role} - {caseItem.department}</span>
            </div>
            <div className="text-center">
              <span className={`px-3 py-1 rounded-lg font-bold text-sm ${getRiskColor(caseItem.risk)}`}>
                {caseItem.risk}
              </span>
              <p className="text-xs text-gray-400 dark:text-gray-500">{caseItem.lastInteraction}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SevereCases;
