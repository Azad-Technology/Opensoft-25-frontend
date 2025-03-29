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
  ArrowRight, TrendingUp, Clock, Users, BookOpen, Target
} from "lucide-react";
import { toast } from "sonner";

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const { getEmployeeStats, submitNewVibe } = useData();

  const [selectedVibe, setSelectedVibe] = useState(null);
  const [vibeComment, setVibeComment] = useState("");
  const [stats, setStats] = useState(null);
  const [showVibeSubmitted, setShowVibeSubmitted] = useState(false);

  useEffect(() => {
    if (user) {
      const employeeStats = getEmployeeStats(user.employeeId);
      setStats(employeeStats);
    }
  }, [user, getEmployeeStats]);

  const handleVibeChange = (vibe) => {
    setSelectedVibe(vibe);
  };

  const handleVibeSubmit = () => {
    if (!user || !selectedVibe) return;

    submitNewVibe(user.employeeId, selectedVibe, vibeComment);

    const updatedStats = getEmployeeStats(user.employeeId);
    setStats(updatedStats);

    setShowVibeSubmitted(true);
    setTimeout(() => setShowVibeSubmitted(false), 3000);

    setSelectedVibe(null);
    setVibeComment("");

    toast.success("Thank you for sharing your vibe!");
  };
  const metrics = [
    {
      title: 'Performance Index',
      value: '85%',
      trend: 12,
      icon: <TrendingUp size={24} className="text-green-600 dark:text-green-400" />,
      rating: 4
    },
    {
      title: 'Leave Balance',
      value: '5 days',
      trend: -8,
      icon: <Clock size={24} className="text-green-600 dark:text-green-400" />,
    },
    {
      title: 'Upcoming Meetings',
      value: '3',
      trend: 20,
      icon: <Calendar size={24} className="text-green-600 dark:text-green-400" />,
    },
    {
      title: 'Team Size',
      value: '12',
      trend: 5,
      icon: <Users size={24} className="text-green-600 dark:text-green-400" />,
    },
    {
      title: 'Training Hours',
      value: '24h',
      trend: 15,
      icon: <BookOpen size={24} className="text-green-600 dark:text-green-400" />,
      rating: 5
    },
    {
      title: 'Goals Achieved',
      value: '8/10',
      trend: 10,
      icon: <Target size={24} className="text-green-600 dark:text-green-400" />,
      rating: 3
    },
  ];

  if (!user || !stats) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-80">
          <div className="animate-pulse-slow">Loading your dashboard...</div>
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

          {!stats.completedMonthlyChatbot && (
            <div className="mt-4 md:mt-0">
              <Link
                to="/employee/chat"
                className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors button-hover"
              >
                <MessageSquare size={18} className="mr-2" />
                Complete Monthly Chat
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                vibes={stats.recentVibes}
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
                          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors button-hover"
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


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {metrics.map((metric) => (
                <MetricCard key={metric.title} {...metric} />
              ))}
            </div>

          </div>

          <div className="space-y-6">
            <div
              className="neo-glass rounded-xl p-6 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex items-center space-x-4">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-16 w-16 rounded-full object-cover border border-border"
                  />
                ) : (
                  <div className="h-16 w-16 bg-secondary rounded-full flex items-center justify-center">
                    <span className="text-2xl font-medium text-secondary-foreground">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                )}

                <div>
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {user.department || "No department"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    ID: {user.employeeId}
                  </p>
                </div>
              </div>

              {stats.performanceRating && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="text-sm text-muted-foreground mb-1">
                    Performance Rating
                  </div>
                  <div className="flex items-center">
                    <div className="font-medium text-lg">
                      {stats.performanceRating.toFixed(1)}
                    </div>
                    <div className="text-xs text-muted-foreground ml-2">
                      / 5.0
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div
              className="neo-glass rounded-xl p-6 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <h3 className="font-medium mb-4">Upcoming</h3>

              <div className="space-y-4">
                {!stats.completedMonthlyChatbot && (
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                      <MessageSquare size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Monthly Check-in</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Complete your monthly well-being check-in
                      </p>
                      <Link
                        to="/employee/chat"
                        className="text-xs text-primary hover:underline mt-1 inline-block"
                      >
                        Start now
                      </Link>
                    </div>
                  </div>
                )}

                <div className="flex items-start space-x-3">
                  <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                    <CalendarCheck size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Performance Review</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Scheduled for next month
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="neo-glass rounded-xl p-6 animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              <h3 className="font-medium mb-4">Quick Links</h3>

              <div className="space-y-2">
                <Link
                  to="/employee/chat"
                  className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-secondary transition-colors"
                >
                  <span className="text-sm">Chat with VibeCatcher</span>
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/employee/reports"
                  className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-secondary transition-colors"
                >
                  <span className="text-sm">View My Reports</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployeeDashboard;
