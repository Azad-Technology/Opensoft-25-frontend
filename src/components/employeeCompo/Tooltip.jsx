import React, { useState, useRef, useEffect } from 'react';

const Tooltip = ({ text, children, placement = 'top', arrow = true }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [adjustedPlacement, setAdjustedPlacement] = useState(placement);
  const tooltipRef = useRef(null);
  const containerRef = useRef(null);
  
  // Check if tooltip is going outside viewport and adjust if needed
  useEffect(() => {
    if (isVisible && tooltipRef.current && containerRef.current) {
      const timeout = setTimeout(() => {
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        
        // Check boundaries
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        let newPlacement = placement;
        
        // Check if tooltip would go outside viewport and flip if necessary
        if (placement === 'top' && tooltipRect.top < 5) {
          newPlacement = 'bottom';
        } else if (placement === 'bottom' && tooltipRect.bottom > viewportHeight - 5) {
          newPlacement = 'top';
        } else if (placement === 'left' && tooltipRect.left < 5) {
          newPlacement = 'right';
        } else if (placement === 'right' && tooltipRect.right > viewportWidth - 5) {
          newPlacement = 'left';
        }
        
        if (newPlacement !== adjustedPlacement) {
          setAdjustedPlacement(newPlacement);
        }
      }, 0);
      
      return () => clearTimeout(timeout);
    }
  }, [isVisible, placement, adjustedPlacement]);
  
  // Reset adjusted placement when user-specified placement changes
  useEffect(() => {
    setAdjustedPlacement(placement);
  }, [placement]);
  
  // Determine position classes
  const getPositionClasses = () => {
    switch (adjustedPlacement) {
      case 'bottom':
        return {
          tooltip: 'top-full mt-2 left-1/2 -translate-x-1/2',
          arrow: arrow ? 'bottom-full -mb-1 left-1/2 -translate-x-1/2' : 'hidden'
        };
      case 'left':
        return {
          tooltip: 'right-full mr-2 top-1/2 -translate-y-1/2',
          arrow: arrow ? 'right-0 -mr-1 top-1/2 -translate-y-1/2' : 'hidden'
        };
      case 'right':
        return {
          tooltip: 'left-full ml-2 top-1/2 -translate-y-1/2',
          arrow: arrow ? 'left-0 -ml-1 top-1/2 -translate-y-1/2' : 'hidden'
        };
      case 'top':
      default:
        return {
          tooltip: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
          arrow: arrow ? 'top-full -mt-1 left-1/2 -translate-x-1/2' : 'hidden'
        };
    }
  };
  
  const positions = getPositionClasses();
  
  // Material UI style transitions
  const transitionClasses = isVisible 
    ? 'opacity-100 scale-100' 
    : 'opacity-0 scale-95 pointer-events-none';
  
  return (
    <div 
      ref={containerRef}
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      
      <div 
        ref={tooltipRef}
        className={`absolute z-10 px-2 py-1 text-sm w-60 font-medium neo-glass rounded shadow transition-all duration-200 ${positions.tooltip} ${transitionClasses}`}
      >
        {text}
        {/* Triangle pointer */}
        <div className={`absolute w-2 h-2 neo-glass transform rotate-45 ${positions.arrow}`} />
      </div>
    </div>
  );
};

export default Tooltip;