import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(null);

  // Load user from localStorage token on mount
  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed.user);
      setToken(parsed.access_token);
    }
    setIsLoading(false);
  }, []);

  // Handle redirects based on auth status and role
  useEffect(() => {
    if (!isLoading) {
      const path = location.pathname;

      if (user) {
        if (["/", "/login", "/signup"].includes(path)) {
          const redirectPath =
            user.role === "admin" ? "/admin/dashboard" : "/employee/dashboard";
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

  // Login: user is already fetched in login page, just save to context
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
    localStorage.removeItem("token");
    navigate("/login");
  };

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
