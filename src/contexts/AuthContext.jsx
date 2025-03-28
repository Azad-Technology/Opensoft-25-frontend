import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { users } from "../data/mockData";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("vibe_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        const currentPath = location.pathname;
        if (user.role === "admin") {
          if (
            currentPath === "/" ||
            currentPath === "/login" ||
            currentPath === "/signup"
          ) {
            navigate("/admin/dashboard");
          }
        } else {
          if (
            currentPath === "/" ||
            currentPath === "/login" ||
            currentPath === "/signup"
          ) {
            navigate("/employee/dashboard");
          }
        }
      } else {
        const isProtectedRoute =
          location.pathname.startsWith("/admin") ||
          location.pathname.startsWith("/employee");

        if (
          isProtectedRoute &&
          location.pathname !== "/login" &&
          location.pathname !== "/signup"
        ) {
          navigate("/login");
        }
      }
    }
  }, [user, isLoading, navigate, location.pathname]);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const foundUser = users.find((u) => u.email === email);

      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem("vibe_user", JSON.stringify(foundUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const exists = users.some(
        (u) =>
          u.email === userData.email || u.employeeId === userData.employeeId,
      );

      if (exists) {
        return false;
      }

      const newUser = {
        id: `user_${Date.now()}`,
        employeeId: userData.employeeId,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        department: userData.department,
      };

      setUser(newUser);
      localStorage.setItem("vibe_user", JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("vibe_user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
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
