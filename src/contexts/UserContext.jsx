import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(null);
  const { token } = useAuth();

  const fetchProfileData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_URL}/common/profile`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const res = await response.json();
      setProfileData(res);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      toast.error("Error fetching profile data");
    }
  };

  //   fetchProfileData

  return (
    <UserContext.Provider value={{ profileData, fetchProfileData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserData = () => {
  return useContext(UserContext);
};
