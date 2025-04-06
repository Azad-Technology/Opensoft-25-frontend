import React, { useState } from "react";

const VibeSelector = ({ selected, onChange, className = "" }) => {
  const [hoveredVibe, setHoveredVibe] = useState(null);

  const vibes = [
    {
      type: "frustrated",
      label: "Frustrated",
      color: "bg-vibe-frustrated",
      emoji: "😠",
    },
    { type: "sad", label: "Sad", color: "bg-vibe-sad", emoji: "😢" },
    { type: "okay", label: "Okay", color: "bg-vibe-okay", emoji: "😐" },
    { type: "happy", label: "Happy", color: "bg-vibe-happy", emoji: "😊" },
    {
      type: "excited",
      label: "Excited",
      color: "bg-vibe-excited",
      emoji: "🤩",
    },
  ];

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium">How are you feeling today?</p>
        {hoveredVibe && (
          <p className="text-sm text-muted-foreground capitalize animate-fade-in">
            {hoveredVibe}
          </p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 md:grid-cols-5">
        {vibes.map((vibe) => (
          <button
            key={vibe.type}
            type="button"
            className={`flex-1 aspect-square rounded-xl flex flex-col items-center justify-center transition-all duration-200 ${
              selected === vibe.type
                ? `${vibe.color} bg-opacity-100 ring-2 ring-offset-2 scale-105`
                : `${vibe.color} bg-opacity-15 hover:bg-opacity-30`
            }`}
            onClick={() => onChange(vibe.type)}
            onMouseEnter={() => setHoveredVibe(vibe.type)}
            onMouseLeave={() => setHoveredVibe(null)}
          >
            <span className="text-2xl md:text-3xl">{vibe.emoji}</span>
            <span
              className={`text-[10px] md:text-xs font-medium mt-1 ${
                selected === vibe.type ? "text-white" : ""
              }`}
            >
              {vibe.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default VibeSelector;
