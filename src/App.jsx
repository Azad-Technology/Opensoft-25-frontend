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
import BlogPage from "./pages/blogPage/BlogPage";
import BlogDetail from "./pages/blogPage/BlogDetail"
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
import Onboarding from "./components/HRDashboard/Onboarding";
import HelpAndSupportPage from "./pages/employeePage/HelpSupport";
import AdminSupportPage from "./pages/admin/AdminSupportPage";
import Report from "./components/EmployeeReportPdf/Report";
import EmployeeReportPage from "./components/EmployeeReportPdf/dashPage";
import Schedule from "./pages/schedule/myschedule"; // Updated import
import { UserProvider } from "./contexts/UserContext";
// import EmployeeReportGenerator from "./components/AdminEmployeePDF/EmployeeReportGenerator";
import EmployeeReportGenerator from "./components/EmployeeReportPdf/Report";

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

  if (
    allowedRoles.length > 0 &&
    user &&
    !allowedRoles.includes(user.role_type)
  ) {
    return (
      <Navigate
        to={
          user.role_type === "hr" ? "/admin/dashboard" : "/employee/dashboard"
        }
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
            <UserProvider>
              <Sonner />
              <Routes>
                {/* Public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:blogId" element={<BlogDetail />} />
                {/* <Route path="/signup" element={<Signup />} /> */}
                <Route path="/" element={<Home />} />

                {/* Protected Employee routes */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute allowedRoles={["employee", "hr"]}>
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

              <Route
                path="/employee/schedule" // New route for Schedule
                element={
                  <ProtectedRoute allowedRoles={["employee"]}>
                    <Schedule />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employee/help"
                element={
                  <ProtectedRoute allowedRoles={["employee"]}>
                    <HelpAndSupportPage/>
                  </ProtectedRoute>
                }
              />

                <Route
                  path="/admin/exportReport/:employeeId"
                  element={
                    <ProtectedRoute allowedRoles={["hr"]}>
                      <EmployeeReportPage />
                    </ProtectedRoute>
                  }
                />

                {/* Protected Admin routes */}
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={["hr"]}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/reports"
                  element={
                    <ProtectedRoute allowedRoles={["hr"]}>
                      <AdminReports />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/inquiries"
                  element={
                    <ProtectedRoute allowedRoles={["hr"]}>
                      <AdminSupportPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/onboarding"
                  element={
                    <ProtectedRoute allowedRoles={["hr"]}>
                      <Onboarding />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/schedule"
                  element={
                    <ProtectedRoute allowedRoles={["hr"]}>
                      <Schedule />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/admin/reports/:employeeId"
                  element={
                    <ProtectedRoute allowedRoles={["hr"]}>
                      <AdminEmployeeDetail />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/employees"
                  element={
                    <ProtectedRoute allowedRoles={["hr"]}>
                      <EmployeesPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/employee-report/:month/:year"
                  element={
                    <ProtectedRoute allowedRoles={["hr"]}>
                      <AdminEmployeeReportPage />
                    </ProtectedRoute>
                  }
                />

                {/* Default route */}
                {/* <Route path="/" element={<Index />} /> */}

                {/* 404 catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </UserProvider>
          </DataProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
