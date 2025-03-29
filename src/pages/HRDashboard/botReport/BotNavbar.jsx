import React from 'react'

function BotNavbar({activeTab , setActiveTab}) {
  return (

    <div className='flex bg-gray-950 text-gray-100'>
        <button onClick={() => setActiveTab("Leave") }
        className={`px-4 py-2 transition-all duration-300 
            ${activeTab === "Leave" 
                ? "border-b-2 border-indigo-600 text-indigo-400 font-bold" 
                : "text-gray-600 hover:text-gray-300"
            }`}>Leave</button>
        <button onClick={() => setActiveTab("Interaction")}
            className={`px-4 py-2 transition-all duration-300 
                ${activeTab === "Interaction" 
                    ? "border-b-2 border-indigo-600 text-indigo-400 font-bold" 
                    : "text-gray-600 hover:text-gray-300"
                }`}>Interaction</button>
        <button onClick={() => setActiveTab("Experience")}
            className={`px-4 py-2 transition-all duration-300 
                ${activeTab === "Experience" 
                    ? "border-b-2 border-indigo-600 text-indigo-400 font-bold" 
                    : "text-gray-600 hover:text-gray-300"
                }`}>Employee Experience</button>
        <button onClick={() => setActiveTab("Performance")}
            className={`px-4 py-2 transition-all duration-300 
                ${activeTab === "Performance" 
                    ? "border-b-2 border-indigo-600 text-indigo-400 font-bold" 
                    : "text-gray-600 hover:text-gray-300"
                }`}>Performance</button>
        <button onClick={() => setActiveTab("Emotion")}
            className={`px-4 py-2 transition-all duration-300 
                ${activeTab === "Emotion" 
                    ? "border-b-2 border-indigo-600 text-indigo-400 font-bold" 
                    : "text-gray-600 hover:text-gray-300"
                }`}>Emotion Zone</button>
    </div>
  )
}

export default BotNavbar
