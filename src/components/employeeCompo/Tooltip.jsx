import React, { useState } from 'react';

const Tooltip = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div 
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      
      {isVisible && (
        <div className="absolute bottom-full mb-2 z-10 px-3 py-2 text-sm text-white bg-gray-800 rounded shadow-lg whitespace-nowrap">
          {text}
          {/* Triangle pointer */}
          <div className="absolute top-full -mt-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 transform rotate-45" />
        </div>
      )}
    </div>
  );
};

export default Tooltip;