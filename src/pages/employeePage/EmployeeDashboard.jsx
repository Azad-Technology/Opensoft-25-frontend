import React, { useState, useEffect } from "react";
import Layout from "../../components/employeeCompo/Layout";
import { useAuth } from "../../contexts/AuthContext";
import VibeChart from "../../components/employeeCompo/VibeChart";
import VibeSelector from "../../components/employeeCompo/VibeSelector";
import { MetricCard } from "../../components/employeeCompo/metricCard";
import ChatAlert from "../../components/employeeCompo/ChatAlert";
import {
  Calendar,
  CheckCheck,
  TrendingUp,
  Clock,
  Smile,
  Hourglass,
  Trophy,
} from "lucide-react";
import { toast } from "sonner";
import { queryClient } from "../../services/react-query-client"; // Import the query client

// 1) Import React Query
import { useQuery, useMutation } from "@tanstack/react-query";

const EmployeeDashboard = () => {
  const { user, refreshToken, token } = useAuth();

  // For vibe submission UI
  const [selectedVibe, setSelectedVibe] = useState(null);
  const [vibeComment, setVibeComment] = useState("");
  const [showVibeSubmitted, setShowVibeSubmitted] = useState(false);

  const BASE_URL = import.meta.env.VITE_REACT_APP_URL;

  // Refresh auth token on mount

  // 2) React Query Client (for invalidating queries on success)

  // 3) useQuery for employee dashboard stats
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

  // 4) useMutation for submitting vibe
  const submitVibeMutation = useMutation({
    mutationFn: async ({ vibe_score, message }) => {
      const res = await fetch(`${BASE_URL}/employee/submit_vibe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          vibe_score,
          message: message?.trim() || null,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Failed to submit vibe");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["employeeDashboard"]);
      setShowVibeSubmitted(true);
      toast.success("Vibe submitted successfully!");
    },
    onError: (err) => {
      toast.error(err.message); // displays server "detail"
    },
  });

  // 5) Handle vibe selection changes
  const handleVibeChange = (vibe) => {
    setSelectedVibe(vibe);
  };

  // 6) Submit vibe via mutation
  const handleVibeSubmit = () => {
    if (!selectedVibe) return;

    if (!vibeComment.trim()) {
      toast.error("Please share a comment about how you're feeling.");
      return;
    }

    const vibeMapping = {
      frustrated: 1,
      sad: 2,
      okay: 3,
      happy: 4,
      excited: 5,
    };
    const vibeScore = vibeMapping[selectedVibe.toLowerCase()] || 3;

    submitVibeMutation.mutate({
      vibe_score: vibeScore,
      message: vibeComment,
    });

    setSelectedVibe(null);
    setVibeComment("");
  };

  // 7) Loading & Error States
  if (isLoading) {
    return (
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

  // 8) If no user, show a fallback
  if (!user) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-80">
          <div>User not found. Please log in.</div>
        </div>
      </Layout>
    );
  }

  // 9) Safely access stats (e.g. optional chaining)
  const awardsCount = stats?.awards?.length ?? 0;

  // 10) Render the page
  return (
    <Layout>
      <div className="page-container py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="page-header mb-2">Welcome back, {user.name}</h1>
            <p className="text-muted-foreground">
              Track your well-being and stay connected with your team
            </p>
            
          </div>
        </div>
        {stats.is_chat_required && <ChatAlert />}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-2 space-y-8">
            {/* Vibe Chart & Submission */}
            <div
              className="neo-glass rounded-xl p-6 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h2 className="text-xl font-medium">Your Vibe Trend</h2>
                <div className="mt-2 md:mt-0 text-sm text-muted-foreground">
                  Last 14 days
                </div>
              </div>

              {/* Chart */}
              <VibeChart
                vibes={stats?.vibe_trend}
                height={180}
                className="mb-6"
              />

              {/* Vibe input */}
              {!showVibeSubmitted ? (
                <div>
                  <VibeSelector
                    selected={selectedVibe}
                    onChange={handleVibeChange}
                    className="mb-4"
                  />

                  {selectedVibe && (
                    <div className="space-y-4 animate-fade-in">
                      <div>
                        <label
                          htmlFor="vibeComment"
                          className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
                        >
                          Would you like to share more about how you're feeling?
                        </label>
                        <textarea
                          id="vibeComment"
                          value={vibeComment}
                          onChange={(e) => setVibeComment(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                          placeholder="Share your thoughts..."
                          rows={2}
                        />
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={handleVibeSubmit}
                          className="px-4 py-2 bg-green-600 text-white dark:text-white rounded-lg hover:bg-green-600/90 transition-colors button-hover"
                          disabled={submitVibeMutation.isLoading}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 bg-green-50 text-green-800 rounded-lg flex items-center animate-fade-in">
                  <CheckCheck size={20} className="mr-2" />
                  Thank you for sharing your vibe! Your input helps us better
                  understand how you're doing.
                </div>
              )}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <MetricCard
                title="Performance Rating"
                value={stats?.performance_rating}
                icon={
                  <TrendingUp
                    size={24}
                    className="text-green-600 dark:text-green-400"
                  />
                }
              />
              <MetricCard
                title="Leave Balance"
                value={stats?.leave_balance}
                icon={
                  <Clock
                    size={24}
                    className="text-green-600 dark:text-green-400"
                  />
                }
              />
              <MetricCard
                title="Total Meetings"
                value={stats?.meetings_attended}
                icon={
                  <Calendar
                    size={24}
                    className="text-green-600 dark:text-green-400"
                  />
                }
              />
              <MetricCard
                title="Current Vibe"
                value={stats?.latest_vibe?.vibe_score}
                icon={
                  <Smile
                    size={24}
                    className="text-green-600 dark:text-green-400"
                  />
                }
              />
              <MetricCard
                title="Average Work hours"
                value={stats?.average_work_hours}
                icon={
                  <Hourglass
                    size={24}
                    className="text-green-600 dark:text-green-400"
                  />
                }
              />
              <MetricCard
                title="Awards"
                value={awardsCount}
                icon={
                  <Trophy
                    size={24}
                    className="text-green-600 dark:text-green-400"
                  />
                }
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployeeDashboard;
