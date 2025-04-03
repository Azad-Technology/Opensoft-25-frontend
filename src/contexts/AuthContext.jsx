import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(null);

  // Load user from localStorage token on mount
  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored) {
      const parsed = JSON.parse(stored);
      const currentTime = Date.now();
      if (parsed.expiration && currentTime > parsed.expiration) {
        localStorage.removeItem("auth"); // Expired, clean up
      } else {
        setUser(parsed.user);
        setToken(parsed.access_token);
      }
    }
    setIsLoading(false);
  }, []);

  // Auto-logout on token expiration
  useEffect(() => {
    const checkTokenExpiration = () => {
      const stored = localStorage.getItem("auth");
      if (stored) {
        const parsed = JSON.parse(stored);
        const currentTime = Date.now();
        if (parsed.expiration && currentTime > parsed.expiration) {
          console.warn("Token expired, logging out.");
          logout();
        }
      }
    };

    checkTokenExpiration(); // Run immediately
    const interval = setInterval(checkTokenExpiration, 60 * 60 * 1000); // Every 1 minute
    return () => clearInterval(interval);
  }, []);

  // Handle redirects based on auth status and role
  useEffect(() => {
    if (!isLoading) {
      const path = location.pathname;

      if (user) {
        if (["/login", "/signup"].includes(path)) {
          const redirectPath =
            user.role_type === "hr"
              ? "/admin/dashboard"
              : "/employee/dashboard";
          navigate(redirectPath);
        }
      } else {
        const isProtected =
          path.startsWith("/admin") || path.startsWith("/employee");

        if (isProtected && !["/login", "/signup"].includes(path)) {
          navigate("/login");
        }
      }
    }
  }, [user, isLoading, location.pathname, navigate]);


  const login = async (userData, access_token) => {
    setIsLoading(true);
    try {
      setUser(userData);
      setToken(access_token);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth");
    navigate("/login");
  };


  const refreshToken = async () => {
    const tokenData = JSON.parse(localStorage.getItem("auth"));
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_URL}/auth/token`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenData.access_token}`,
        }
      })

      const res= await response.json();
      const expTime=Date.now()+(res.expires_in*1000);

      const newTokenData={
        access_token:res.access_token,
        expiration:expTime,
        user:tokenData.user
      }
      // localStorage.removeItem("auth");
      localStorage.setItem("auth",JSON.stringify(newTokenData));
      setToken(newTokenData.access_tokens);
    } catch (error) {
      console.error("refresh token error:", error);
      toast.error("Error refreshing token");
    }

  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        setUser,
        refreshToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};