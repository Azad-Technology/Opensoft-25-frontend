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

// Assume 'result' prop is passed in with the structure like the example JSON
const BotReports = ({ result }) => {
  // Process leave data with proper error handling
  // Access the monthly breakdown safely
  const monthlyBreakdown = result?.leaves_analysis?.monthly_breakdown || {};

  // Initialize map to store total leave days per reason over the selected period
  const leaveReasonsMap = { sick: 0, casual: 0, annual: 0, unpaid: 0, other: 0 };

  // --- Process data for the Chart (Last 12 Months) ---

  // 1. Get month keys, convert to Date objects for sorting
  // 2. Sort chronologically
  // 3. Keep only the latest 12 entries
  // 4. Get the original month strings back in sorted order
  const sortedMonths = Object.keys(monthlyBreakdown)
    .map(month => ({
      original: month,
      date: new Date(month) // JS Date constructor usually handles "Month Year" format
    }))
    .sort((a, b) => a.date - b.date) // Sort oldest to newest
    .slice(-12) // Take the last 12 months
    .map(m => m.original); // Get the string keys back

  // 5. Map sorted months to the format needed by the chart
  //    Also, accumulate totals for the leave breakdown section simultaneously
  const leaveData = sortedMonths.map(month => {
    const leaves = monthlyBreakdown[month] || {}; // Get data for the specific month, default to empty object if missing
    
    // Format month for X-axis display (e.g., "Mar 2025")
    const formattedMonth = new Date(month).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });

    // Accumulate total leave days for each type across these 12 months
    Object.entries(leaves).forEach(([type, days]) => {
      // Check if the type exists in our map before adding
      if (leaveReasonsMap.hasOwnProperty(type)) {
         leaveReasonsMap[type] = (leaveReasonsMap[type] || 0) + (days || 0);
      }
      // If the type from data isn't one of the expected keys, you might want to handle it
      // For now, we only accumulate the known types.
    });

    // Return the data structure for this month's bar in the chart
    return {
      month: formattedMonth,
      sickLeave: leaves.sick || 0,
      personalLeave: leaves.casual || 0, // Map 'casual' from data to 'personalLeave' for chart
      vacation: leaves.annual || 0,     // Map 'annual' from data to 'vacation' for chart
      unpaidLeave: leaves.unpaid || 0,
      otherLeave: leaves.other || 0,
    };
  });

  // --- Process data for the Leave Breakdown List ---

  // Convert the accumulated totals map to an array suitable for rendering
  // Filter out reasons with 0 days
  const leaveReasons = Object.entries(leaveReasonsMap)
    .filter(([_, days]) => days > 0) // Keep only leave types with count > 0
    .map(([reason, days]) => ({
      // Format reason names for display
      reason: reason === "casual" ? "Personal" 
             : reason === "annual" ? "Vacation" 
             : reason.charAt(0).toUpperCase() + reason.slice(1), // Capitalize others (Sick, Unpaid, Other)
      days // Keep the total days
    }));

  // --- Render the Component ---
  return (
    <div className="p-4 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Leave Density Chart Card */}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-5 border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Leave Density (Last 12 Months)
          </h2>
          <div className="h-96 w-full">
            {/* Responsive container for the chart */}
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={leaveData} // Use the processed leaveData for the chart
                margin={{ top: 20, right: 20, left: 20, bottom: 60 }} // Adjust margins for labels
              >
                {/* Grid lines */}
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" /> 
                {/* X Axis (Months) */}
                <XAxis 
                  dataKey="month" 
                  stroke="#666" // Axis line color
                  tick={{
                    angle: -45,       // Angle ticks for readability
                    textAnchor: 'end',  // Anchor text at the end
                    fontSize: 10,       // Smaller font size
                    fill: "currentColor" // Use theme text color for ticks
                  }}
                  interval={0} // Show all ticks
                />
                {/* Y Axis (Number of Days) */}
                <YAxis stroke="#666" /> 
                {/* Tooltip on hover */}
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))', // Use CSS variables if available
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    fontSize: '12px'
                  }}
                  cursor={{ fill: 'rgba(206, 206, 206, 0.2)' }} // Subtle hover effect
                />
                {/* Bar definitions - Note the stackId="a" makes them stacked */}
                <Bar dataKey="sickLeave" name="Sick Leave" fill="#86d3ff" stackId="a" />
                <Bar dataKey="personalLeave" name="Personal Leave" fill="#82ca9d" stackId="a" />
                <Bar dataKey="vacation" name="Vacation" fill="#8884d8" stackId="a" />
                <Bar dataKey="unpaidLeave" name="Unpaid Leave" fill="#ff8686" stackId="a" />
                <Bar dataKey="otherLeave" name="Other Leave" fill="#ffc486" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Legend for the chart */}
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

        {/* Leave Breakdown Card */}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-5 border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Leave Breakdown (Last 12 Months) 
            </h2>
            {/* Display current date for context - optional */}
            {/* <div className="text-xs text-gray-500 dark:text-gray-400">
              {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div> */}
          </div>

          {/* Conditional rendering: Show message if no leave data, otherwise show list */}
          {leaveReasons.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 h-full flex items-center justify-center">
              No leave records found for the last 12 months.
            </div>
          ) : (
            <div className="space-y-4">
              {/* Map through the processed leaveReasons array */}
              {leaveReasons.map(({ reason, days }) => (
                <div key={reason} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {/* Color indicator matching the chart legend/bars */}
                    <div className="w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{
                          // Map the display reason back to its corresponding color
                          backgroundColor: {
                            'Sick': '#86d3ff',
                            'Personal': '#82ca9d',
                            'Vacation': '#8884d8',
                            'Unpaid': '#ff8686',
                            'Other': '#ffc486'
                          }[reason] || '#cccccc' // Default color if somehow mismatched
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{reason}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {days} day{days !== 1 ? 's' : ''} {/* Pluralize 'day' correctly */}
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

export default BotReports; // Export the component for use