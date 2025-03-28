import React from "react";
import {
  Line,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const LineChart = ({
  data,
  lines,
  xAxisDataKey = "name",
  height = 300,
  grid = true,
  legend = true,
}) => {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {grid && <CartesianGrid strokeDasharray="3 3" stroke="#eee" />}
          <XAxis
            dataKey={xAxisDataKey}
            tick={{ fill: "#888", fontSize: 12 }}
            tickLine={{ stroke: "#888" }}
            axisLine={{ stroke: "#888" }}
          />
          <YAxis
            tick={{ fill: "#888", fontSize: 12 }}
            tickLine={{ stroke: "#888" }}
            axisLine={{ stroke: "#888" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: "8px",
              border: "1px solid #eee",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          />
          {legend && <Legend />}

          {lines.map((line, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={line.dataKey}
              name={line.name || line.dataKey}
              stroke={
                line.stroke ||
                `#${Math.floor(Math.random() * 16777215).toString(16)}`
              }
              strokeWidth={2}
              dot={{
                stroke: line.stroke || "#333",
                strokeWidth: 2,
                r: 4,
                fill: "#fff",
              }}
              activeDot={{
                r: 6,
                stroke: line.stroke || "#333",
                strokeWidth: 2,
                fill: "#fff",
              }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
