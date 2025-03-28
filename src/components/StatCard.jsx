import React from "react";

const StatCard = ({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
  className = "",
  style,
}) => {
  return (
    <div
      className={`bg-white/80 dark:bg-gray-800/70 backdrop-blur-md rounded-xl border border-gray-100 dark:border-gray-700 shadow-md p-6 flex flex-col ${className}`}
      style={style}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-800 dark:text-white">
              {value}
            </p>
            {trend && trendValue && (
              <span
                className={`ml-2 text-sm font-medium ${
                  trend === "up"
                    ? "text-green-600"
                    : trend === "down"
                      ? "text-red-600"
                      : "text-gray-500"
                }`}
              >
                {trend === "up" ? "↑" : trend === "down" ? "↓" : "•"}{" "}
                {trendValue}
              </span>
            )}
          </div>
        </div>
        {icon && (
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
            {icon}
          </div>
        )}
      </div>
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-auto">
          {description}
        </p>
      )}
    </div>
  );
};

export default StatCard;
