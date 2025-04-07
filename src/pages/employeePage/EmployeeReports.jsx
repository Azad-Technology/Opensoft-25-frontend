import React, { useEffect, useState } from "react";
import Layout from "../../components/employeeCompo/Layout";
import { useAuth } from "../../contexts/AuthContext";
import { useData } from "../../contexts/DataContext";
import VibeChart from "../../components/employeeCompo/VibeChart";
import VibeStatusBadge from "../../components/employeeCompo/VibeStatusBadge";
import { AchievementsSection } from '../../components/employeeCompo/AchievementsSection';
import ProjectCard from "../../components/employeeCompo/ProjectCard";
import ChatAlert from "../../components/employeeCompo/ChatAlert";
import PerformanceCard from "../../components/employeeCompo/PerformanceCard";
import { Info } from 'lucide-react';
import Tooltips from "../../components/employeeCompo/Tooltip";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const EmployeeReports = () => {
  const { user, token } = useAuth();
  // const { vibes, leaves, activities, recognitions, performances } = useData();

  const BASE_URL = import.meta.env.VITE_REACT_APP_URL;

  const navigate = useNavigate();

  const {
    data: stats, // "stats" will contain the returned JSON object
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["employeeDashboard"],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/employee/dashboard/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }
      return response.json();
    },
    enabled: !!token, // Only fetch if we have a valid token
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-screen w-full">
          <div className="flex flex-col items-center justify-center">
            <div className="relative h-20 w-20">
              {/* Pulse animation around the spinner */}
              <span className="absolute inset-0 rounded-full animate-ping opacity-20 bg-emerald-500"></span>

              {/* Main spinner with nice transition effect */}
              <svg className="absolute inset-0 animate-spin" viewBox="0 0 50 50">
                <circle
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="text-emerald-500"
                  strokeDasharray="80"
                  strokeDashoffset="60"
                />
              </svg>
            </div>

            {/* Text with subtle fade-in animation */}
            <div className="mt-6 text-xl font-medium text-gray-800 dark:text-gray-100 animate-fadeIn">
              Loading
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
              Just a moment
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-80">
          <div className="text-red-500">Error: {error.message}</div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-80">
          <div>User not found. Please log in.</div>
        </div>
      </Layout>
    );
  }
  const userVibes = Object.values(stats.vibe_trend);
  const userLeaves = Object.values(stats.all_leaves);
  const activityData = Object.values(stats.activity_level);
  const awards = Object.values(stats.awards);
  const performance = stats.performance_rating;


  return (
    <Layout>
      <div className="page-container py-8">

        <div className="mb-8 animate-fade-in flex items-center justify-between">
          <div>
            <h1 className="page-header mb-2">My Reports</h1>
            <p className="text-muted-foreground">
              View detailed information about your well-being and performance
            </p>
          </div>

        </div>
        {stats.is_chat_required && <ChatAlert />}

        <div className="space-y-8">
          {/* Vibe trend */}
          <div
            className="neo-glass rounded-xl p-6 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium">Vibe Trend</h2>
              <Tooltips text={"Vibe trend shows the distribution of your vibes over 14 Days. It shows emotional well-being and identifies patterns."} placement="left">
                <Info className="text-muted-foreground" size={20} />
              </Tooltips>
            </div>

            {userVibes.length > 0 ? (
              <div className="space-y-6">
                <VibeChart vibes={userVibes} height={200} />

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {["Frustrated", "Sad", "Okay", "Happy", "Excited"].map(
                    (vibe) => {
                      const count = userVibes.filter(
                        (v) => v.vibe === vibe,
                      ).length;
                      const percentage =
                        userVibes.length > 0
                          ? Math.round((count / userVibes.length) * 100)
                          : 0;

                      return (
                        <div
                          key={vibe}
                          className="flex flex-col items-center p-3 rounded-lg bg-secondary"
                        >
                          <VibeStatusBadge
                            vibe={vibe}
                            size="sm"
                            className="mb-2"
                          />
                          <span className="text-lg font-medium">{count}</span>
                          <span className="text-xs text-muted-foreground">
                            {percentage}%
                          </span>
                        </div>
                      );
                    },
                  )}
                </div>

                <div className="text-sm text-muted-foreground">
                  Based on {stats.vibe_trend.length} entries
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No vibe data available yet
              </div>
            )}
          </div>


          {/* Achievements and Rewards */}
          <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 mb-8">
            <AchievementsSection awards={awards} />
          </div>

          {/* Activity levels */}
          <div
            className="neo-glass rounded-xl p-6 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium">Activity Levels</h2>
              <Tooltips text={"This section displays your activity levels over the last 30 days, including Team Messages, Emails, and Meetings taken during this period."} placement="left">
                <Info className="text-muted-foreground" size={20} />
              </Tooltips>
            </div>
            {(activityData.length > 0) ? (
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={activityData
                      .map(item => ({
                        ...item,
                        formattedDate: new Date(item.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        }),
                        // Keep original date for sorting
                        dateObj: new Date(item.date)
                      }))
                      // Sort in reverse chronological order (newest first)
                      .sort((a, b) => a.dateObj - b.dateObj)
                    }
                    margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="formattedDate"
                      tick={{ fontSize: 12 }}
                      interval="preserveStartEnd"
                    />
                    <YAxis tick={{ fontSize: 12 }} width={40} />
                    <Tooltip
                      labelFormatter={(value) => `Date: ${value}`}
                      contentStyle={{
                        color: "#333",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                      }}
                    />
                    <Bar
                      dataKey="teamsMessages"
                      name="Teams Messages"
                      fill="#8E44AD"
                      radius={[10, 10, 0, 0]}
                    />
                    <Bar
                      dataKey="emails"
                      name="Emails"
                      fill="#1ABC9C"
                      radius={[10, 10, 0, 0]}
                    />
                    <Bar
                      dataKey="meetings"
                      name="Meetings"
                      fill="#E67E22"
                      radius={[10, 10, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex items-center justify-center h-32 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">No Activity Data</div>
            )}
          </div>

          {/* Performance and Recognition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Performance */}
            <div
              className="neo-glass rounded-xl p-6 animate-fade-in "
              style={{ animationDelay: "0.4s" }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-medium">Performance</h2>
                <Tooltips text={"This section displays the performance rating, review period and Manager Feedback"} placement="left">
                  <Info className="text-muted-foreground" size={20} />
                </Tooltips>
              </div>

              {performance.length > 0 ? (<div className="min-h-40 max-h-80 overflow-auto p-3"> {
                performance.map((review, index) => (
                  <PerformanceCard review={review} key={index} />
                ))}</div>
              ) : (
                <div className="flex items-center justify-center h-[70%] bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">
                  No performance data available yet
                </div>
              )}
            </div>

            {/* Leave history */}
            <div
              className="neo-glass rounded-xl p-6 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-medium">Leave History</h2>
                <Tooltips text={"This section displays the leaves taken in the past year"} placement="left">
                  <Info className="text-muted-foreground" size={20} />
                </Tooltips>
              </div>

              {userLeaves.length > 0 ? (
                <div className="max-h-72 overflow-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="text-left border-b border-border">
                        <th className="py-3 px-4 font-medium">Date Range</th>
                        <th className="py-3 px-4 font-medium">Leave Days</th>
                        <th className="py-3 px-4 font-medium">Leave Type</th>
                      </tr>
                    </thead>
                    <tbody className="overflow-scroll">
                      {userLeaves.map((leave, index) => (
                        <tr key={index} className="border-b border-border">
                          <td className="py-3 px-4">
                            {new Date(leave.leave_start_date).toLocaleDateString()} -{" "}
                            {new Date(leave.leave_end_date).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">{leave.leave_days}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${leave.leave_type === "Casual Leave"
                                ? "bg-blue-100 text-blue-800"
                                : leave.leave_type === "Sick Leave"
                                  ? "bg-red-100 text-gray-800"
                                  : leave.leave_type === "Unpaid Leave"
                                    ? "bg-gray-100  text-red-800"
                                    : leave.leave_type === "Annual Leave"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-purple-100 text-purple-800"
                                }`}
                            >
                              {leave.leave_type.charAt(0).toUpperCase() +
                                leave.leave_type.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[85%] bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">No Leave Data</div>
              )}
            </div>

          </div>

          <div className="neo-glass rounded-xl p-6 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium">Assigned Projects</h2>
              <Tooltips text={"This section displays the active projects of the employee"} placement="left">
                <Info className="text-muted-foreground" size={20} />
              </Tooltips>
            </div>

            {(stats.projects) ?
              (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">{Object.values(stats.projects).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
              </div>) :
              (<div className="flex items-center justify-center h-32 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">
                No Leave Data
              </div>)

            }

          </div>

        </div>
      </div>
    </Layout >
  );
};

export default EmployeeReports;