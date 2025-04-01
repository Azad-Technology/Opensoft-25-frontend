import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const VibeChart = ({
  vibes,
  height = 200,
  showAxis = true,
  className = "",
}) => {
  const vibeToValue = (vibe) => {
    const vibeMap = {
      frustrated: 1,
      sad: 2,
      okay: 3,
      happy: 4,
      excited: 5,
    };
    return vibeMap[vibe];
  };

  const valueToVibe = (value) => {
    if (value <= 1.5) return "frustrated";
    if (value <= 2.5) return "sad";
    if (value <= 3.5) return "okay";
    if (value <= 4.5) return "happy";
    return "excited";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const chartData = vibes
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((vibe) => ({
      date: formatDate(vibe.date),
      value: vibeToValue(vibe.vibe),
      vibe: vibe.vibe,
    }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const { date, value } = payload[0].payload;
      const vibe = valueToVibe(value);
      return (
        <div className="neo-glass p-2 text-xs">
          <p className="font-medium">{date}</p> {/* Show full date */}
          <p
            className="capitalize"
            style={{ color: `var(--color-vibe-${vibe})` }}
          >
            {vibe}
          </p>
        </div>
      );
    }
    return null;
  };


  const vibeColors = {
    frustrated: "var(--color-vibe-frustrated, #F87171)",
    sad: "var(--color-vibe-sad, #93C5FD)",
    okay: "var(--color-vibe-okay, #FCD34D)",
    happy: "var(--color-vibe-happy, #A3E635)",
    excited: "var(--color-vibe-excited, #8B5CF6)",
  };

  const getGradient = () => {
    const vibePositions = {
      frustrated: [],
      sad: [],
      okay: [],
      happy: [],
      excited: [],
    };

    chartData.forEach((point, index) => {
      const position = (index / (chartData.length - 1)) * 100;
      vibePositions[valueToVibe(point.value)].push(position);
    });

    let stops = [];
    Object.entries(vibePositions).forEach(([vibe, positions]) => {
      positions.forEach((pos) => {
        stops.push([pos, vibe]);
      });
    });

    stops.sort((a, b) => a[0] - b[0]);

    if (stops.length > 0) {
      return stops.map(([position, vibe], i) => (
        <stop key={i} offset={`${position}%`} stopColor={vibeColors[vibe]} />
      ));
    }

    return (
      <>
        <stop offset="0%" stopColor={vibeColors.okay} />
        <stop offset="100%" stopColor={vibeColors.okay} />
      </>
    );
  };

  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{
            top: 10,
            right: 10,
            left: showAxis ? 0 : -40,
            bottom: showAxis ? 0 : -20,
          }}
        >
          <defs>
            <linearGradient id="vibeGradient" x1="0" y1="0" x2="1" y2="0">
              {getGradient()}
            </linearGradient>
          </defs>

          {showAxis && (
            <>
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "#e5e7eb", strokeWidth: 1 }}
              />
              <YAxis
                domain={[1, 5]}
                ticks={[1, 2, 3, 4, 5]}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => {
                  const vibeTypes = [
                    "frustrated",
                    "sad",
                    "okay",
                    "happy",
                    "excited",
                  ];
                  return vibeTypes[value - 1]?.charAt(0).toUpperCase() || "";
                }}
                tickLine={false}
                axisLine={{ stroke: "#e5e7eb", strokeWidth: 1 }}
              />
            </>
          )}

          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="value"
            stroke="url(#vibeGradient)"
            strokeWidth={2}
            fill="url(#vibeGradient)"
            fillOpacity={0.2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VibeChart;
