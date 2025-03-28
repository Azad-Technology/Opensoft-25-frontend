import React from "react";
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const BarChart = ({
  data,
  bars,
  xAxisDataKey = "name",
  height = 300,
  grid = true,
  legend = true,
  stacked = false,
}) => {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart
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

          {bars.map((bar, index) => (
            <Bar
              key={index}
              dataKey={bar.dataKey}
              name={bar.name || bar.dataKey}
              fill={
                bar.fill ||
                `#${Math.floor(Math.random() * 16777215).toString(16)}`
              }
              stackId={stacked ? "stack" : undefined}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
