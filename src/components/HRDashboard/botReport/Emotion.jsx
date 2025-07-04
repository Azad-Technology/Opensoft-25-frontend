import React, { useRef } from "react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import FileSaver from "file-saver";

const Emotion = ({ result }) => {
  const dataToAnalyze =
    result?.chat_analysis?.wellbeing_analysis?.component_breakdown || {};
  const chartRef = useRef(null);

  const rechartToSvg = async (chartRef) => {
    try {
      // Get the chart container element
      const chartContainer = chartRef.current;

      if (!chartContainer) {
        throw new Error("Chart reference is not available");
      }

      // Find the SVG element within the Recharts component
      const chartSvg = chartContainer.querySelector("svg");

      if (!chartSvg) {
        throw new Error("SVG element not found in the chart");
      }

      // Clone the SVG to avoid modifying the original
      const svgClone = chartSvg.cloneNode(true);

      // Serialize the SVG to a string
      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(svgClone);

      // Create a Blob from the SVG string
      const svgBlob = new Blob([svgString], {
        type: "image/svg+xml;charset=utf-8",
      });

      // Create a URL for the Blob
      const svgUrl = URL.createObjectURL(svgBlob);

      return {
        svgElement: svgClone,
        svgString: svgString,
        svgBlob: svgBlob,
        svgUrl: svgUrl,
      };
    } catch (error) {
      console.error("Error converting Recharts to SVG:", error);
      return null;
    }
  };

  const handleSvgExport = async () => {
    const svgData = await rechartToSvg(chartRef);

    if (svgData) {
      // Download the SVG file
      FileSaver.saveAs(svgData.svgBlob, "chart.svg");
    }
  };

  const getMainWord = (word) => {
    if (!word) return "Unknown";
    let mainWord = "";
    for (let i = 0; i < word.length; i++) {
      if (word[i] === "_") return mainWord || "Unknown";
      mainWord += word[i];
    }
    return mainWord || "Unknown";
  };

  const wellbeingData = [];
  if (dataToAnalyze && Object.keys(dataToAnalyze).length > 0) {
    Object.entries(dataToAnalyze).forEach(([key, value]) => {
      if (value && typeof value.score !== "undefined") {
        const label = getMainWord(key);
        wellbeingData.push({
          dimension: label,
          value: Math.min(30, Math.round((value.score / 100) * 30)),
          fullMark: 30,
        });
      }
    });
  }

  const keyInsights = [];
  if (dataToAnalyze && Object.keys(dataToAnalyze).length > 0) {
    Object.entries(dataToAnalyze).forEach(([key, value]) => {
      if (value && value.summary) {
        keyInsights.push({
          tag: getMainWord(key),
          summary: value.summary,
        });
      }
    });
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Radar Chart */}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-5 border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Wellbeing Analysis
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            Based on bot interactions
          </p>

          {wellbeingData.length > 0 ? (
            <>
              <div
                className="h-96 w-full flex items-center justify-center"
                ref={chartRef}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="85%"
                    data={wellbeingData}
                  >
                    <PolarGrid stroke="#01601E" />
                    <PolarAngleAxis
                      dataKey="dimension"
                      tick={{ fontSize: 12, fill: "#03C03C" }}
                    />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 30]}
                      tickCount={7}
                      tick={{ fontSize: 10 }}
                      stroke="#02862A"
                    />
                    <Radar
                      name="Wellbeing Score"
                      dataKey="value"
                      stroke="green"
                      fill="#8884d8"
                      fillOpacity={0.8}
                    />
                    <Tooltip
                      formatter={(value, name, props) => [
                        `Score: ${value}`,
                        props.payload.dimension,
                      ]}
                      contentStyle={{
                        backgroundColor: "rgba(0, 0, 0, 0.85)",
                        color: "#fff",
                        border: "none",
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Labels below chart */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-center">
                {wellbeingData.map((item, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-md"
                  >
                    {item.dimension}: {item.value}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <div className="h-64 w-full flex items-center justify-center text-gray-500 dark:text-gray-400">
              No wellbeing data available
            </div>
          )}
        </div>

        {/* Insights */}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-5 border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Wellbeing Inferences
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Based on natural language processing of bot conversations, the
            following inferences were detected.
          </p>

          <div className="space-y-2">
            <h3 className="text-md font-semibold mb-2 text-gray-700 dark:text-gray-200">
              Key Insights
            </h3>

            {keyInsights.length > 0 ? (
              keyInsights.map((insight, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 bg-gray-50 dark:bg-gray-900 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex-shrink-0 text-green-500 dark:text-green-400 font-bold">
                    {index + 1}.
                  </div>
                  <div>
                    <span className="inline-block px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 rounded-md mb-1">
                      {insight.tag}
                    </span>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {insight.summary}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 py-4">
                No insights available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emotion;
