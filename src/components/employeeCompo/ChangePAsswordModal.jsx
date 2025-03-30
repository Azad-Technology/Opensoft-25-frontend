"use client";
import React from "react";

import { useState } from "react";

export default function ChangePasswordModal({ isOpen, onClose }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = () => {
 
    onClose(); 
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Change Password</h2>

       
          <input
            type="password"
            placeholder="Enter Previous Password"
            className="w-full p-2 border rounded-md mb-3 dark:bg-gray-800 dark:text-white"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter New Password"
            className="w-full p-2 border rounded-md mb-4 dark:bg-gray-800 dark:text-white"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

        
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
    )
  );
}
