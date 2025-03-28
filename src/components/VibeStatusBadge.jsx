import React from "react";

const VibeStatusBadge = ({
  vibe,
  showLabel = true,
  size = "md",
  className = "",
}) => {
  const vibeEmoji = {
    frustrated: "😠",
    sad: "😢",
    okay: "😐",
    happy: "😊",
    excited: "🤩",
  };

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-0.5",
    lg: "text-base px-3 py-1",
  };

  const vibeBgColors = {
    frustrated: "bg-vibe-frustrated bg-opacity-15",
    sad: "bg-vibe-sad bg-opacity-15",
    okay: "bg-vibe-okay bg-opacity-15",
    happy: "bg-vibe-happy bg-opacity-15",
    excited: "bg-vibe-excited bg-opacity-15",
  };

  const vibeTextColors = {
    frustrated: "text-vibe-frustrated",
    sad: "text-vibe-sad",
    okay: "text-vibe-okay",
    happy: "text-vibe-happy",
    excited: "text-vibe-excited",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${
        sizeClasses[size]
      } ${vibeBgColors[vibe]} ${vibeTextColors[vibe]} ${className}`}
    >
      <span className="mr-1">{vibeEmoji[vibe]}</span>
      {showLabel && <span className="capitalize">{vibe}</span>}
    </span>
  );
};

export default VibeStatusBadge;
