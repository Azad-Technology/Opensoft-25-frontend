import React from "react";
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
  
  const monthlyBreakdown = result?.leave_analysis?.monthly_breakdown || {};

  const leaveReasonsMap = { sick: 0, casual: 0, annual: 0, unpaid: 0, other: 0 };

  const sortedMonths = Object.keys(monthlyBreakdown)
    .map(month => ({
      original: month,
      date: new Date(month) 
    }))
    .sort((a, b) => a.date - b.date) 
    .slice(-12) 
    .map(m => m.original); 

 
  const leaveData = sortedMonths.map(month => {
    const leaves = monthlyBreakdown[month] || {}; 
    
    const formattedMonth = new Date(month).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });

    
    Object.entries(leaves).forEach(([type, days]) => {
      
      if (leaveReasonsMap.hasOwnProperty(type)) {
         leaveReasonsMap[type] = (leaveReasonsMap[type] || 0) + (days || 0);
      }
      
    });

    
    return {
      month: formattedMonth,
      sickLeave: leaves.sick || 0,
      personalLeave: leaves.casual || 0, 
      vacation: leaves.annual || 0,    
      unpaidLeave: leaves.unpaid || 0,
      otherLeave: leaves.other || 0,
    };
  });

  
  const leaveReasons = Object.entries(leaveReasonsMap)
    .filter(([_, days]) => days > 0) 
    .map(([reason, days]) => ({
      reason: reason === "casual" ? "Personal" 
             : reason === "annual" ? "Vacation" 
             : reason.charAt(0).toUpperCase() + reason.slice(1), 
      days 
    }));

  
  return (
    <div className="p-4 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
       
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-5 border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Leave Density (Last 12 Months)
          </h2>
          <div className="h-96 w-full">
        
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={leaveData} 
                margin={{ top: 20, right: 20, left: 20, bottom: 60 }} 
              >
                
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" /> 
               
                <XAxis 
                  dataKey="month" 
                  stroke="#666" 
                  tick={{
                    angle: -45,       
                    textAnchor: 'end',  
                    fontSize: 10,       
                    fill: "currentColor" 
                  }}
                  interval={0} 
                />
               
                <YAxis stroke="#666" /> 
                
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    fontSize: '12px'
                  }}
                  cursor={{ fill: 'rgba(206, 206, 206, 0.2)' }} 
                />
                
                <Bar dataKey="sickLeave" name="Sick Leave" fill="#86d3ff" stackId="a" />
                <Bar dataKey="personalLeave" name="Personal Leave" fill="#82ca9d" stackId="a" />
                <Bar dataKey="vacation" name="Vacation" fill="#8884d8" stackId="a" />
                <Bar dataKey="unpaidLeave" name="Unpaid Leave" fill="#ff8686" stackId="a" />
                <Bar dataKey="otherLeave" name="Other Leave" fill="#ffc486" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center text-xs text-gray-600 dark:text-gray-300 mt-4">
            {[
              { label: 'Sick', color: '#86d3ff' },
              { label: 'Personal', color: '#82ca9d' },
              { label: 'Vacation', color: '#8884d8' },
              { label: 'Unpaid', color: '#ff8686' },
              { label: 'Other', color: '#ffc486' }
            ].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-1">
                <div 
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: color }}
                />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

       
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-5 border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Leave Breakdown (Last 12 Months) 
            </h2>
          </div>

          
          {leaveReasons.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 h-full flex items-center justify-center">
              No leave records found for the last 12 months.
            </div>
          ) : (
            <div className="space-y-4">
              
              {leaveReasons.map(({ reason, days }) => (
                <div key={reason} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                  
                    <div className="w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{
                          
                          backgroundColor: {
                            'Sick': '#86d3ff',
                            'Personal': '#82ca9d',
                            'Vacation': '#8884d8',
                            'Unpaid': '#ff8686',
                            'Other': '#ffc486'
                          }[reason] || '#cccccc' 
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{reason}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {days} day{days !== 1 ? 's' : ''} 
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BotReports; 