import React,{ useEffect } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    } else {
      document.body.style.overflow = "auto"; 
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
      onClick={onClose} // Close modal when clicking the background
    >
      <div
        className="bg-white p-2 rounded-2xl shadow-xl w-96"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <button className="absolute top-3 right-3 text-gray-600" onClick={onClose}>
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
