import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const EmployeeExperience = () => {
  const [selectedEmployee, setSelectedEmployee] = useState("John Doe");

  const onboardingData = [
    { name: "Excellent", value: 20, color: "#84cc16" },
    { name: "Good", value: 30, color: "#3b82f6" },
    { name: "Average", value: 40, color: "#22d3ee" },
    { name: "Poor", value: 10, color: "#71717a" },
  ];

  return (
    <div className="p-4 bg-gray-950 text-gray-100">
      
      <div className="grid grid-cols-2 gap-4">
       
        <div className="border rounded p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Onboarding Experience</h2>
            <div className="text-xs text-gray-500 bg-green-100 px-2 py-1 rounded">
              Joined 3 months ago
            </div>
          </div>

          <div className="relative h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={onboardingData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  dataKey="value"
                >
                  {onboardingData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-2xl font-bold text-blue-600">30%</div>
              <div className="text-sm text-gray-600">Good</div>
            </div>
          </div>

          <div className="flex justify-center space-x-4 mt-4">
            {onboardingData.map((entry) => (
              <div key={entry.name} className="flex items-center space-x-1">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-xs">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

        
        <div className="border rounded p-4">
          <h2 className="text-lg font-semibold mb-4">Transition Details</h2>

          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Onboarding Feedback</span>
              <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
                Good
              </span>
            </div>
            <p className="text-xs text-gray-600">
              Employee rated their onboarding experience as "Good" with some
              suggestions for improvement.
            </p>
          </div>

          
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="font-medium">Initial Training</span>
              <p className="text-xs text-gray-600">
                Completed all required training modules within first month.
              </p>
            </div>
            <svg
              className="w-5 h-5 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="font-medium">30-Day Check-in</span>
              <p className="text-xs text-gray-600">
                Successfully completed 30-day check-in with manager and HR.
              </p>
            </div>
            <svg
              className="w-5 h-5 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>

         
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="font-medium">Mentor Assigned</span>
              <p className="text-xs text-gray-600">
                Sarah Johnson was assigned as mentor for the first 3 months.
              </p>
            </div>
            <svg
              className="w-5 h-5 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Transition Summary */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mt-4">
            <p className="text-sm text-gray-700">
              Employee has successfully transitioned into their role with good
              feedback on the onboarding process. All required training has been
              completed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeExperience;
