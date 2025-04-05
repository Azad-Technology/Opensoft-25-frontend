import React, { useState } from "react";
import ViewLeaveModal from "./ViewLeaveModal";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BotReports = ({ result }) => {
  const [viewLeaveModal , setViewLeaveModal] = useState(false);
  // const [selectedEmployee, setSelectedEmployee] = useState("John Doe");
  // const leaveData = [
  //   { month: "Jan", sickLeave: 1, personalLeave: 0, vacation: 0 },
  //   { month: "Feb", sickLeave: 0, personalLeave: 1, vacation: 0 },
  //   { month: "Mar", sickLeave: 2, personalLeave: 0, vacation: 1 },
  // ];
  // const leaveReasons = [
  //   { reason: "Medical appointment", days: 2 },
  //   { reason: "Family emergency", days: 1 },
  //   { reason: "Illness", days: 1 },
  // ];

  // "leaves": {
  //       "sick": 0,
  //       "casual": 0,
  //       "annual": 0,
  //       "unpaid": 0,
  //       "other": 0,
  //       "per_month": {}
  //   },

  const leaveReasons = [];
  const leaveData = [];
  Object.entries(result?.leaves).forEach(([key , value]) => {
    if(key !== 'per_month'){
      leaveReasons.push({
        reason:key,
        days:result.leaves[key]
      })
    }
    else{
      Object.entries(value).forEach(([month, leaveTypes]) => {
        leaveData.push({
          month,
          sickLeave: leaveTypes.sick || 0,
          personalLeave: leaveTypes.casual || 0,
          vacation: leaveTypes.annual || 0
        });
      });
    }
  })

  console.log("leaveReasons" , leaveReasons);
  console.log("leaveData" , leaveData);

  return (
    <>
    <div className="p-4 mt-10">
     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-5 border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Leave Density</h2>
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">3 days this month</div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={leaveData}
                margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#90EE90" />
                <XAxis dataKey="month" stroke="#03C03C" />
                <YAxis stroke="#03C03C" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', color: '#fff', border: 'none' }} />
                <Bar dataKey="sickLeave"  fill="#86d3ff" />
                <Bar dataKey="personalLeave"  fill="#82ca9d" />
                <Bar dataKey="vacation"  fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* <div className="flex justify-between text-xs text-gray-600 dark:text-gray-300 mt-2">
            <span>Sick Leave</span>
            <span>Personal Leave</span>
            <span>Vacation</span>
          </div> */}
        </div>
       
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-5 border border-gray-100 dark:border-gray-700">

          <div className="flex justify-between">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Leave Analysis</h2>
          <p className="text-sm hover:cursor-pointer hover:underline hover:text-green-400"
          onClick={() => setViewLeaveModal(true)}>view more</p>
          </div>

          
          {/* <div className="bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500 p-3 mb-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Employee has taken more sick leave than average this month.
              Consider checking in about their wellbeing.
            </p>
          </div> */}
         
          <div>
            <h3 className="text-md font-semibold mb-2 text-gray-700 dark:text-gray-200">
              Major Reasons for Leave
            </h3>
            
            {leaveReasons.every((reason) => reason.days === 0) ? (
          <div className="text-sm text-gray-700 dark:text-gray-300">
          No leaves yet
           </div>
          ) : (
         leaveReasons.map((reason) =>
         reason.days > 0 ? (
        <div
         key={reason.reason}
         className="flex justify-between text-sm mb-1 text-gray-700 dark:text-gray-300"
       >
        <span>{reason.reason}</span>
        <span>({reason.days} days)</span>
      </div>
    ) : null
  )
)}

          </div>
        </div>
      </div>
    </div>
    {viewLeaveModal && <ViewLeaveModal setViewLeaveModal={setViewLeaveModal}/>}
    </>
  );
};

export default BotReports;
