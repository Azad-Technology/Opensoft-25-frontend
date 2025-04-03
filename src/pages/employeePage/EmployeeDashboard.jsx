import React, { useState, useEffect } from "react";
import Layout from "../../components/employeeCompo/Layout";
import { useAuth } from "../../contexts/AuthContext";
import { useData } from "../../contexts/DataContext";
import VibeChart from "../../components/employeeCompo/VibeChart";
import VibeSelector from "../../components/employeeCompo/VibeSelector";
import { MetricCard } from "../../components/employeeCompo/metricCard";
import StatCard from "../../components/employeeCompo/StatCard";
import { Link } from "react-router-dom";
import {
  Calendar,
  CalendarCheck,
  MessageSquare,
  Bell,
  CheckCheck,
  ArrowRight,
  TrendingUp,
  Clock,
  Smile,
  Hourglass,
  BookOpen,
  Trophy,
} from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "../../contexts/ThemeContext";

const EmployeeDashboard = () => {
  const { user, refreshToken, token } = useAuth();
  const { getEmployeeStats, submitNewVibe } = useData();
  const { theme } = useTheme();

  const [selectedVibe, setSelectedVibe] = useState(null);
  const [vibeComment, setVibeComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showVibeSubmitted, setShowVibeSubmitted] = useState(false);

  const BASE_URL = import.meta.env.VITE_REACT_APP_URL;


  useEffect(() => {
    refreshToken();
  }, []);

  // https://opensoft-25-backend.onrender.com/data/employee/:id/summary

  const [stats, setStats] = useState({
    totalLeaves: 5,
    currentMonthLeaves: 1,
    averageVibe: "happy",
    recentVibes: [
      { date: "2024-03-30", vibe: "excited" },
      { date: "2024-03-29", vibe: "frustrated" },
      { date: "2024-03-28", vibe: "okay" },
    ],
    activityLevel: "high",
    totalMeetings: 12,
    totalEmails: 45,
    totalMessages: 120,
  });

  const handleVibeChange = (vibe) => {
    setSelectedVibe(vibe);
  };

  const handleVibeSubmit = () => {

    const vibeMapping = {
      "frustrated": 1,
      "sad": 2,
      "okay": 3,
      "happy": 4,
      "excited": 5
    };
    const vibeScore = vibeMapping[selectedVibe.toLowerCase()] || 3;
    const now = new Date().toJSON().slice(0, 19);

    stats.latest_vibe = {
      "vibe_score": vibeScore,
      "date": now,
    };

    stats.vibe_trend.push(stats.latest_vibe);
    setSelectedVibe(null);
    setVibeComment("");

  };

  useEffect(() => {
    if (!token) return;

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/employee/dashboard/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          throw new Error("Expected JSON but got: " + text);
        }

        const data = await response.json();
        // console.log("Fetched Data:", data);

        // Update stats directly with the new data
        setStats(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token, BASE_URL]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-80">
          <div className="animate-pulse-slow">Loading your dashboard...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-80">
          <div className="text-red-500">Error: {error}</div>
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

  const getActivityDescription = (level) => {
    switch (level) {
      case "low":
        return "Your activity level is lower than usual. Taking time to recharge?";
      case "high":
        return "You have higher than usual activity. Make sure to take breaks!";
      default:
        return "Your activity level is within a healthy range.";
    }
  };

  const getLeaveDescription = (count) => {
    if (count === 0) return "You haven't taken any leaves this month.";
    if (count === 1) return "You've taken 1 leave this month.";
    return `You've taken ${count} leaves this month.`;
  };
  const awardsCount = stats && stats.awards ? stats.awards.length : 0;
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-2 space-y-8">
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

              <VibeChart
                vibes={stats.vibe_trend}
                height={180}
                className="mb-6"
              />

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
                          className="block text-sm font-medium mb-1"
                        >
                          Would you like to share more about how you're feeling?
                        </label>
                        <textarea
                          id="vibeComment"
                          value={vibeComment}
                          onChange={(e) => setVibeComment(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                          placeholder="Optional: Share your thoughts..."
                          rows={2}
                        />
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={handleVibeSubmit}
                          className="px-4 py-2 bg-green-600 text-primary-foreground rounded-lg hover:bg-green-600/90 transition-colors button-hover"
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <MetricCard title="Performance Rating" value={stats.performance_rating} icon={<TrendingUp size={24} className="text-green-600 dark:text-green-400" />} />
              <MetricCard title="Leave Balance" value={stats.leave_balance} icon={<Clock size={24} className="text-green-600 dark:text-green-400" />} />
              <MetricCard title="Total Meetings" value={stats.meetings_attended} icon={<Calendar size={24} className="text-green-600 dark:text-green-400" />} />
              <MetricCard title="Current Vibe" value={stats.latest_vibe.vibe_score} icon={<Smile size={24} className="text-green-600 dark:text-green-400" />} />
              <MetricCard title="Average Work hours" value={stats.average_work_hours} icon={<Hourglass size={24} className="text-green-600 dark:text-green-400" />} />
              <MetricCard title="Awards" value={awardsCount} icon={<Trophy size={24} className="text-green-600 dark:text-green-400" />} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployeeDashboard;