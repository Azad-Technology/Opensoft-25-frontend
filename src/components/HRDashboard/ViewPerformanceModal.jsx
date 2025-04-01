import { X, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

const ViewPerformanceModal = ({ setViewPerformanceModal }) => {
  const [performanceData, setPerformanceData] = useState([
    {
      Employee_ID: "EMP1001",
      Review_Period: "Annual 2023",
      Performance_Rating: 5,
      Manager_Feedback: "Exceeds Expectations",
      Promotion_Consideration: true,
    },
    {
      Employee_ID: "EMP1002",
      Review_Period: "Annual 2023",
      Performance_Rating: 3,
      Manager_Feedback: "Needs Improvement",
      Promotion_Consideration: false,
    },
  ]);

  const [editIndex, setEditIndex] = useState(null);

  const handleDelete = (index) => {
    setPerformanceData(performanceData.filter((_, i) => i !== index));
  };

  const handleSave = (index, field, value) => {
    const updatedData = [...performanceData];
    updatedData[index] = { ...updatedData[index], [field]: value };
    setPerformanceData(updatedData);
    setEditIndex(null);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white md:rounded-xl min-h-screen md:min-h-0 md:max-h-96 md:mt-32 shadow-xl p-6 w-full md:max-w-2xl relative">
        <button
          className="absolute top-3 right-3 bg-green-400 text-white p-2 rounded-xl"
          onClick={() => setViewPerformanceModal(false)}
        >
          <X />
        </button>
        <h2 className="text-xl font-semibold text-center mb-4 text-green-400">Performance Details</h2>
        <div className="overflow-auto max-h-80">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-2 border-b">Review Period</th>
                <th className="p-2 border-b">Rating</th>
                <th className="p-2 border-b">Feedback</th>
                <th className="p-2 border-b">Promotion</th>
                <th className="p-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {performanceData.map((data, index) => (
                <tr key={index} className="h-12 odd:bg-gray-200 even:bg-white hover:bg-green-200">
                  {Object.keys(data).slice(1).map((key) => (
                    <td key={key} className="p-2">
                      {editIndex === index ? (
                        <input
                          type={
                            key === "Performance_Rating" ? "number" :
                            key === "Promotion_Consideration" ? "checkbox" : "text"
                          }
                          value={key === "Promotion_Consideration" ? undefined : data[key]}
                          checked={key === "Promotion_Consideration" ? data[key] : undefined}
                          onChange={(e) => handleSave(index, key, key === "Promotion_Consideration" ? e.target.checked : e.target.value)}
                          onBlur={() => setEditIndex(null)}
                          className="border p-1 rounded w-full"
                        />
                      ) : (
                        <div className="group relative cursor-pointer">
                          <span onDoubleClick={() => setEditIndex(index)}>{key === "Promotion_Consideration" ? (data[key] ? "Yes" : "No") : data[key]}</span>
                          <div className="invisible group-hover:visible absolute left-0 -top-8 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                            Double click to edit
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                          </div>
                        </div>
                      )}
                    </td>
                  ))}
                  <td className="p-2 flex gap-2">
                    <button onClick={() => handleDelete(index)} className="text-red-500 relative group">
                      <Trash2 />
                      <div className="invisible group-hover:visible absolute left-1/2 -top-8 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                        Delete
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                      </div>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewPerformanceModal;
