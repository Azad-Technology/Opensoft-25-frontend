import React from "react";

const VibeStatusBadge = ({
  vibe,
  showLabel = true,
  size = "md",
  className = "",
}) => {
  const vibeEmoji = {
    Frustrated: "😠",
    Sad: "😢",
    Okay: "😐",
    Happy: "😊",
    Excited: "🤩",
  };

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-0.5",
    lg: "text-base px-3 py-1",
  };

  const vibeBgColors = {
    Frustrated: "bg-vibe-frustrated bg-opacity-15",
    Sad: "bg-vibe-sad bg-opacity-15",
    Okay: "bg-vibe-okay bg-opacity-15",
    Happy: "bg-vibe-happy bg-opacity-15",
    Excited: "bg-vibe-excited bg-opacity-15",
  };

  const vibeTextColors = {
    Frustrated: "text-vibe-frustrated",
    Sad: "text-vibe-sad",
    Okay: "text-vibe-okay",
    Happy: "text-vibe-happy",
    Excited: "text-vibe-excited",
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
