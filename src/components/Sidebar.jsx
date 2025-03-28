import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Settings,
  Users,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Activity,
  BarChart4,
  HelpCircle,
  Calendar,
  AlertCircle,
} from "lucide-react";

const Sidebar = ({ expanded, onToggle }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  const adminNavItems = [
    {
      path: "/admin/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      path: "/admin/reports",
      label: "Reports & Analytics",
      icon: <BarChart4 size={20} />,
    },
    {
      path: "/admin/employee-report/march/2024",
      label: "Employee Reports",
      icon: <FileText size={20} />,
    },
    { path: "/admin/employees", label: "Employees", icon: <Users size={20} /> },
    { path: "/admin/alerts", label: "Alerts", icon: <AlertCircle size={20} /> },
    {
      path: "/admin/schedule",
      label: "Schedule",
      icon: <Calendar size={20} />,
    },
    {
      path: "/admin/settings",
      label: "Settings",
      icon: <Settings size={20} />,
    },
  ];

  const employeeNavItems = [
    {
      path: "/employee/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      path: "/employee/chat",
      label: "Wellbeing Chat",
      icon: <MessageSquare size={20} />,
    },
    {
      path: "/employee/reports",
      label: "My Reports",
      icon: <FileText size={20} />,
    },
    {
      path: "/employee/activity",
      label: "Activity",
      icon: <Activity size={20} />,
    },
    {
      path: "/employee/schedule",
      label: "My Schedule",
      icon: <Calendar size={20} />,
    },
    {
      path: "/employee/help",
      label: "Help & Support",
      icon: <HelpCircle size={20} />,
    },
    {
      path: "/employee/settings",
      label: "Settings",
      icon: <Settings size={20} />,
    },
  ];

  const navItems = user?.role === "admin" ? adminNavItems : employeeNavItems;

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {isMobile && expanded && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar ${!expanded ? "sidebar-collapsed" : ""}`}>
        <div className="flex flex-col h-full">
          {/* Logo + Toggle */}
          <div className="flex items-center justify-between p-4 border-b border-green-100/50 dark:border-green-800/30">
            {expanded ? (
              <Link to="/" className="flex items-center">
                <div className="text-xl font-semibold text-gradient">
                  Vibe<span className="font-bold">Catcher</span>
                </div>
              </Link>
            ) : (
              <div className="w-full flex justify-center">
                <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/60 flex items-center justify-center text-green-600 dark:text-green-300 font-bold">
                  V
                </div>
              </div>
            )}

            <button
              onClick={onToggle}
              className="p-1 rounded-md text-gray-500 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-900/40 hover:text-green-600 dark:hover:text-green-300 transition-colors"
              aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
            >
              {expanded ? (
                <ChevronLeft size={20} />
              ) : (
                <ChevronRight size={20} />
              )}
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 py-4 overflow-y-auto">
            <ul className="space-y-1 px-3">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center ${expanded ? "justify-start px-4" : "justify-center"} py-3 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? "bg-green-100 dark:bg-green-800/40 text-green-700 dark:text-green-300"
                        : "text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-600 dark:hover:text-green-300"
                    }`}
                    title={!expanded ? item.label : undefined}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    {expanded && (
                      <span className="ml-3 text-sm font-medium">
                        {item.label}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer User Info */}
          <div
            className={`p-4 mt-auto border-t border-green-100/50 dark:border-green-800/30 ${!expanded ? "flex justify-center" : ""}`}
          >
            {expanded ? (
              <div className="flex items-center">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full object-cover border border-green-100 dark:border-green-800/50"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-800/60 flex items-center justify-center text-green-600 dark:text-green-300 font-medium">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                )}
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-100 truncate max-w-[120px]">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    {user?.role}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-auto p-2 text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-300 transition-colors"
                  aria-label="Log out"
                  title="Log out"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-300 transition-colors"
                aria-label="Log out"
                title="Log out"
              >
                <LogOut size={18} />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
