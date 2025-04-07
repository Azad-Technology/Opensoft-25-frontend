import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Bell, Settings, User, ChevronDown, X } from "lucide-react";
import Sidebar from "../Sidebar";
import ThemeSwitch from "./ThemeSwitch";
import { useTheme } from "../../contexts/ThemeContext";

const Layout = ({ children }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarExpanded(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setShowUserDropdown(false);
    setShowNotifications(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
    if (showNotifications) setShowNotifications(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserDropdown || showNotifications) {
        const target = event.target;
        if (
          !target.closest(".user-dropdown-container") &&
          !target.closest(".notifications-container")
        ) {
          setShowUserDropdown(false);
          setShowNotifications(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showUserDropdown, showNotifications]);

  return (
    <div className={`min-h-screen flex flex-col bg-pattern dark:bg-gray-900 ${theme=="dark" && "text-white"}`}>
      {isAuthenticated && (
        <>
          <Sidebar expanded={sidebarExpanded} onToggle={toggleSidebar} />

          <header
            className={`sticky top-0 z-10 glass border-b border-green-100 dark:border-green-900/40 shadow-sm transition-all duration-300 ease-in-out ${
              sidebarExpanded ? "md:ml-64" : "md:ml-20"
            }`}
          >
            <div className="container mx-auto flex items-center justify-between py-3 px-4">
              <button
                className="md:hidden p-2 text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-500 transition-colors"
                onClick={toggleSidebar}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              <div className="flex items-center space-x-4 ml-auto">

                <ThemeSwitch />

                {/* User dropdown */}
                <div className="relative user-dropdown-container">
                  <button
                    className="flex items-center space-x-3 rounded-full hover:bg-green-50 dark:hover:bg-green-900/30 p-1 transition-colors"
                    onClick={toggleUserDropdown}
                    aria-label="User menu"
                  >
                    <div className="hidden md:block text-right px-5">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {user?.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user?.role_type=="hr"?"Hiring Manager":"Employee"}
                      </p>
                    </div>
                    <div className="relative">
                      {user?.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="h-9 w-9 rounded-full object-cover border border-green-100 dark:border-green-900"
                        />
                      ) : (
                        <div className="h-9 w-9 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                          <User
                            size={18}
                            className="text-green-600 dark:text-green-400"
                          />
                        </div>
                      )}
                      <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></span>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`hidden md:block text-gray-400 dark:text-gray-500 transition-transform duration-200 ${
                        showUserDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2 w-48 neo-glass rounded-lg shadow-xl z-20 animate-fade-in">
                      <div className="p-3 border-b border-green-100/50 dark:border-green-900/50">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                          {user?.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {user?.email}
                        </p>
                      </div>
                      <div className="p-2">
                        <Link
                          to="/profile"
                          className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-400 rounded-md transition-colors"
                        >
                          <User size={16} className="mr-2" />
                          View Profile
                        </Link>
                      </div>
                      <div className="p-2 border-t border-green-100/50 dark:border-green-900/50">
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>
        </>
      )}

      <main
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isAuthenticated ? (sidebarExpanded ? "md:ml-64" : "md:ml-20") : ""
        }`}
      >
        {children}
      </main>

      {isAuthenticated && (
        <footer
          className={`py-3  border-t border-green-100 dark:border-green-900/40 glass transition-all duration-300 ease-in-out flex  ${
            sidebarExpanded ? "md:ml-64" : "md:ml-20"
          }`}
        >
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>
                © {new Date().getFullYear()} VibeCatcher. All rights reserved.
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a
                href="https://www2.deloitte.com/us/en/footerlinks1/privacy.html"
                className="text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-500 text-sm"
              >
                Privacy
              </a>
              <a
                href="https://www2.deloitte.com/us/en/footerlinks1/terms-of-use.html?icid=bottom_terms-of-use"
                className="text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-500 text-sm"
              >
                Terms of Use
              </a>
              <a
                href="/"
                className="text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-500 text-sm"
              >
                Contact Us
              </a>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
