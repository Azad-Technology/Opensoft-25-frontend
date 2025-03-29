import React from "react";

const AnalyticsCard = ({
  title,
  subtitle,
  children,
  footer,
  className = "",
  style,
  action,
  isLoading = false,
}) => {
  return (
    <div
      className={`bg-white/80 dark:bg-gray-800/70 backdrop-blur-md rounded-xl border border-gray-100 dark:border-gray-700 shadow-md overflow-hidden p-6 ${className}`}
      style={style}
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>
        {action && <div className="ml-auto">{action}</div>}
      </div>

      <div className="mb-4">
        {isLoading ? (
          <div className="h-40 w-full flex items-center justify-center">
            <div className="animate-pulse text-gray-400">Loading data...</div>
          </div>
        ) : (
          children
        )}
      </div>

      {footer && (
        <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
          {footer}
        </div>
      )}
    </div>
  );
};

export default AnalyticsCard;
