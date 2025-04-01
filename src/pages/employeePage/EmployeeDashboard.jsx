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
  ArrowRight, TrendingUp, Clock, Smile, Hourglass, BookOpen, Trophy
} from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "../../contexts/ThemeContext";

const EmployeeDashboard = () => {
  const { user,refreshToken, token } = useAuth();
  const { getEmployeeStats, submitNewVibe } = useData();

  const [selectedVibe, setSelectedVibe] = useState(null);
  const [vibeComment, setVibeComment] = useState("");
  // const [stats, setStats] = useState(null);
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showVibeSubmitted, setShowVibeSubmitted] = useState(false);
  const {theme} =useTheme();

  useEffect(() => {
    refreshToken();
  }, [])
  

  // https://opensoft-25-backend.onrender.com/data/employee/:id/summary

  // useEffect(() => {
  //   if (user) {
  //     const employeeStats = getEmployeeStats(user.employeeId);
  //     setStats(employeeStats);
  //     console.log(employeeStats)
  //   }
  // }, [user, getEmployeeStats]);

  const [stats,setStats] = useState({
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
  })

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

  useEffect(() => {
    const fetchDashboardData = async ({token}) => {
      try {
        const response = await axios.get("https://opensoft-25-backend.onrender.com/employee/dashboard/EMP0125/summary", {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        setMetrics(response.data);
        console.log(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // const metrics = [
  //   {
  //     title: 'Performance Rating',
  //     value: '85%',
  //     icon: <TrendingUp size={24} className="text-green-600 dark:text-green-400" />,
  //     rating: 4
  //   },
  //   {
  //     title: 'Leave Balance',
  //     value: '5 days',
  //     icon: <Clock size={24} className="text-green-600 dark:text-green-400" />,
  //   },
  //   {
  //     title: 'Total Meetings',
  //     value: '3',
  //     icon: <Calendar size={24} className="text-green-600 dark:text-green-400" />,
  //   },
  //   {
  //     title: 'Current Vibe',
  //     value: '12',
  //     icon: <Smile size={24} className="text-green-600 dark:text-green-400" />,
  //   },
  //   {
  //     title: 'Average Work hours',
  //     value: '24h',
  //     icon: <Hourglass size={24} className="text-green-600 dark:text-green-400" />,
  //   },
  //   {
  //     title: 'Awards',
  //     value: '8/10',
  //     icon: <Trophy size={24} className="text-green-600 dark:text-green-400" />,
  //     rating: 3
  //   },
  // ];

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
                          className={`px-4 py-2 bg-green-600 text-primary-foreground rounded-lg hover:bg-green-600/90 transition-colors button-hover`}
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

            {/* Metrics Component */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <MetricCard title="Performance Rating" icon= <TrendingUp size={24} className="text-green-600 dark:text-green-400" />  />
              <MetricCard title= 'Leave Balance' icon=<Clock size={24} className="text-green-600 dark:text-green-400" /> />
              <MetricCard title= 'Total Meetings' icon= <Calendar size={24} className="text-green-600 dark:text-green-400" />/>
              <MetricCard title= 'Current Vibe' icon= <Smile size={24} className="text-green-600 dark:text-green-400"/>/>
              <MetricCard title= 'Average Work hours' icon= <Hourglass size={24} className="text-green-600 dark:text-green-400" />/>
              <MetricCard title= 'Awards' icon= <Trophy size={24} className="text-green-600 dark:text-green-400" /> />
            </div>

          </div>

        </div>
      </div>
    </Layout>
  );
};

export default EmployeeDashboard;
