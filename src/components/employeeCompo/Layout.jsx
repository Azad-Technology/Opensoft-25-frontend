import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Bell, Settings, User, ChevronDown, X } from "lucide-react";
import Sidebar from "../Sidebar";
import ThemeSwitch from "./ThemeSwitch";
import { useTheme } from "../../contexts/ThemeContext";
import { notifications } from "../../data/mockData";
import toast, { Toaster } from 'react-hot-toast';


const Layout = ({ children }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { theme, toggleTheme } = useTheme();
  const[showAll, setShowAll]=useState(false);

  
  

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

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showUserDropdown) setShowUserDropdown(false);
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
                {/* Notifications */}
                <div className="relative notifications-container">
                  <button
                    className="rounded-full p-2 text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors"
                    onClick={toggleNotifications}
                    aria-label="Notifications"
                  >
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                      2
                    </span>
                  </button>

                  {showNotifications && (
                    <div className={`fixed sm:absolute right-0 sm:right-auto mt-2 w-full max-w-[calc(100vw-2rem)] sm:w-80 sm:max-w-sm overflow-y-auto neo-glass rounded-lg shadow-xl z-20 animate-fade-in ${
                         showAll ? "max-h-[600px]" : "max-h-96"
                       }`}>
                      <div className="flex items-center justify-between p-3 border-b border-green-100/50 dark:border-green-900/50">
                        <h3 className="font-medium text-gray-700 dark:text-gray-200">
                          Notifications
                        </h3>
                        <button
                          className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                          onClick={() => setShowNotifications(false)}
                        >
                          <X size={18} />
                        </button>
                      </div>
                      
                      <div className="p-2 overflow-y-auto" style={{ maxHeight: showAll ? 'none' : '128px' }}>
                         
                          {notifications.map(
                            (notification, index) => (
                          <a
                            key={index}
                            href={notification.route}
                            className="block px-3 py-2 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-md transition-colors"
                            
                          >
                            <div className="flex items-start">
                              <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 p-2 rounded-lg">
                                <Bell size={16} />
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                  {notification.title}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                  {notification.time}
                                </p>
                              </div>
                            </div>
                          </a>
                            )
                          )}
                       
                      </div>

                      
                      <div className="p-2 border-t border-green-100/50">
                         <button
                           onClick={() => setShowAll(!showAll)}
                           className="block w-full text-center text-xs text-green-600 hover:underline py-1"
                           
                         >
                           {showAll ? "Show Less" : "View all notifications"}
                         </button>
                       </div>
                     </div>
                  )}
                </div>

                <ThemeSwitch />

                {/* Settings */}
                <button
                  className="rounded-full p-2 text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors"
                  aria-label="Settings"
                >
                  <Settings size={20} />
                </button>

                {/* User dropdown */}
                <div className="relative user-dropdown-container">
                  <button
                    className="flex items-center space-x-3 rounded-full hover:bg-green-50 dark:hover:bg-green-900/30 p-1 transition-colors"
                    onClick={toggleUserDropdown}
                    aria-label="User menu"
                  >
                    <div className="hidden md:block text-right">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {user?.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user?.role_type}
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
                        <Link
                          to="/settings"
                          className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-400 rounded-md transition-colors"
                        >
                          <Settings size={16} className="mr-2" />
                          Settings
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
          className={`py-6 border-t border-green-100 dark:border-green-900/40 glass transition-all duration-300 ease-in-out ${
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
                href="#"
                className="text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-500 text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-500 text-sm"
              >
                Terms of Service
              </a>
              <a
                href="#"
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
