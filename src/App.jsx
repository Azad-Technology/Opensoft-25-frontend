import React from "react";
import { Toaster as Sonner } from "sonner";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { queryClient } from "./services/react-query-client";

// Pages
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import EmployeeDashboard from "./pages/employeePage/EmployeeDashboard";
import EmployeeChat from "./pages/employeePage/EmployeeChat";
import EmployeeReports from "./pages/employeePage/EmployeeReports";
import AdminReports from "./pages/admin/AdminReports";
import AdminEmployeeDetail from "./pages/admin/AdminEmployeeDetail";
import NotFound from "./pages/NotFound/NotFound";
import Index from "./pages/Auth/Index";
import EmployeesPage from "./pages/employeePage/EmployeesPage";
import AdminEmployeeReportPage from "./pages/admin/AdminEmployeeReportPage";
import Home from "./pages/HomePage/Home";
import Profile from "./pages/profilePage1/Profile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Onboarding from "./components/HRDashboard/Onboarding"

// Protected route component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pattern">
        <div className="neo-glass p-8 rounded-xl shadow-lg animate-pulse-slow">
          <p className="text-gray-600">Loading your experience...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role_type)) {
    return (
      <Navigate
        to={user.role_type === "admin" ? "/admin/dashboard" : "/employee/dashboard"}
      />
    );
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <DataProvider>
            <Sonner />
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              {/* <Route path="/signup" element={<Signup />} /> */}
              <Route path="/" element={<Home />} />

              {/* Protected Employee routes */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute allowedRoles={["employee"]}>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/employee/dashboard"
                element={
                  <ProtectedRoute allowedRoles={["employee"]}>
                    <EmployeeDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employee/chat"
                element={
                  <ProtectedRoute allowedRoles={["employee"]}>
                    <EmployeeChat />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employee/reports"
                element={
                  <ProtectedRoute allowedRoles={["employee"]}>
                    <EmployeeReports />
                  </ProtectedRoute>
                }
              />

              {/* Protected Admin routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/reports"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <AdminReports />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/onboarding"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <Onboarding />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/reports/:employeeId"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <AdminEmployeeDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/employees"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <EmployeesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/employee-report/:month/:year"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <AdminEmployeeReportPage />
                  </ProtectedRoute>
                }
              />

              {/* Default route */}
              {/* <Route path="/" element={<Index />} /> */}

              {/* 404 catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </DataProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
