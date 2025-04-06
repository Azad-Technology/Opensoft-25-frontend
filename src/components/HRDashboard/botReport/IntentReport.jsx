import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const IntentReport = ({ result }) => {

  const intentData = result?.intent_analysis;

    const priorityToValue = {
      High: 3,
      Medium: 2,
      Low: 1
    };

    const formatTag = (tag) => {
      let formattedTag = "";

      for(let i = 0 ; i < tag.length ; i++){
        if(tag[i] != '_'){
          formattedTag += tag[i];
        }
        else{
          formattedTag += ' ';
        }
      }

      return formattedTag;
    }

    let getPriority = (weight) => {
      if(weight > 0.6){
        return "High";
      }
      else if(weight >= 0.4){
        return "Medium";
      }
      else{
        return "Low";
      }
    }

    const getColor = (priority) => {
      if (priority === "High") return "#EF4444";
      if (priority === "Medium") return "#F59E0B";
      return "#10B981";
    };

    const graphData = [];
      intentData?.tags?.map((tag , index) =>{
         graphData.push({tag : formatTag(tag.tag) , priority:getPriority(tag.weight) , value:priorityToValue[getPriority(tag.weight)]});
      })

      console.log("graphData" , graphData);

    const getTagInfo = (weight) => {
        let priorityColor;
        if (weight > 0.6) {
          priorityColor = "from-red-500 to-red-400";
        } else if (weight >= 0.4) {
          priorityColor = "from-yellow-500 to-yellow-400";
        } else {
          priorityColor = "from-green-500 to-green-400";
        }
        return priorityColor;
    };

    return (
      <div className="p-4">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Emotional State Chart */}
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-5 border border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Vibemeter Priority Distribution Analysis</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              Based on bot interactions
            </p>

      <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={graphData}
            dataKey="value"
            nameKey="tag"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={60} 
            paddingAngle={5} 
            label={({ tag }) => `${tag}`} 
          >
            {graphData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry.priority)} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(152, 251, 152, 0.5)",
              color: "#fff",
              borderRadius: "8px",
              border: "none",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center mt-4 space-x-6">
        <div className="flex items-center space-x-2">
          <span
            className="inline-block w-4 h-4 rounded-full"
            style={{ backgroundColor: "#FF6B6B" }}
          ></span>
          <span className="text-sm text-gray-700 dark:text-gray-300">High</span>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className="inline-block w-4 h-4 rounded-full"
            style={{ backgroundColor: "#FFD93D" }}
          ></span>
          <span className="text-sm text-gray-700 dark:text-gray-300">Medium</span>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className="inline-block w-4 h-4 rounded-full"
            style={{ backgroundColor: "#6BCB77" }}
          ></span>
          <span className="text-sm text-gray-700 dark:text-gray-300">Low</span>
        </div>
      </div>
    </div>
   </div>

          {/* Emotional Inferences */}
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-5 border border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Vibemeter Summary</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {intentData.primary_issues}
            </p>

            <div className="space-y-2">
              <h3 className="text-md font-semibold mb-2 text-gray-700 dark:text-gray-200">Diagnostic Insights</h3>
              {intentData.tags.map((tag, index) => {
                const tagInfo = getTagInfo(tag.weight);
                return (
                  <div key={index} className="flex flex-col items-start text-sm w-full">
                    <p className="text-gray-700 dark:text-gray-300">{formatTag(tag.tag)}</p>
                    <div className="mb-3 w-full">
                      <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                        <span>Priority:</span>
                        <span className={tag.weight > 0.6 ? 'text-red-500' : tag.weight >= 0.4 ? 'text-yellow-500' : 'text-green-500'}>{tag.weight > 0.6 ? 'High' : (tag.weight >= 0.4 ? 'Medium':'Low')}</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full w-full bg-gradient-to-r ${tagInfo}`}
                          style={{ width: `${tag.weight * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
};

export default IntentReport;

