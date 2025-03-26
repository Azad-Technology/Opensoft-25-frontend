import React, { useState } from "react";

const moods = [
  { label: "Frustrated", emoji: "😡", color: "bg-red-500" },
  { label: "Sad", emoji: "😞", color: "bg-orange-400" },
  { label: "Okay", emoji: "😐", color: "bg-yellow-400" },
  { label: "Happy", emoji: "😊", color: "bg-green-400" },
  { label: "Excited", emoji: "🤩", color: "bg-blue-500" }
];

const Vibemeter = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (!selectedMood) {
      alert("Please select your mood!");
      return;
    }
    console.log("Mood:", selectedMood.label);
    console.log("Feedback:", feedback);
    alert(`Submitted: ${selectedMood.label} - ${feedback}`);
    setSelectedMood(null);
    setFeedback("");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-gray-700 text-center">How do you feel today?</h2>

      {/* Mood Selection */}
      <div className="flex justify-between mt-6">
        {moods.map((mood) => (
          <button
            key={mood.label}
            className={`flex flex-col items-center p-3 rounded-lg transition-all ${
              selectedMood?.label === mood.label ? `${mood.color} text-white` : "bg-gray-200"
            }`}
            onClick={() => setSelectedMood(mood)}
          >
            <span className="text-2xl">{mood.emoji}</span>
            <span className="text-sm mt-1">{mood.label}</span>
          </button>
        ))}
      </div>

      {/* Feedback Input */}
      <textarea
        className="w-full p-2 mt-4 border rounded-lg"
        placeholder="Tell us more (optional)..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />

      {/* Submit Button */}
      <button
        className="w-full mt-4 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-all"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default Vibemeter;
