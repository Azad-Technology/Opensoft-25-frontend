import React, { useEffect, useState } from "react";
import Layout from "../../components/employeeCompo/Layout.jsx";
import SevereCases from "../../components/HRDashboard/SevereCases.jsx";
import { Smile, ArrowDownRight, ChartNoAxesCombined, Brain } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";


const AnimatedValue = ({ value, isDecimal, suffix = "" }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (value === undefined || value === null) return;
    
    const end = isDecimal ? Math.round(value * 10) : value;
    let start = 0;
    const duration = 1000;
    const totalSteps = end || 1;
    const stepTime = Math.abs(Math.floor(duration / totalSteps));

    const timer = setInterval(() => {
      start += 1;
      if (start >= totalSteps) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, isDecimal]);

  if (isDecimal) {
    return <span>{(count / 10).toFixed(1)}{suffix}</span>;
  }
  return <span>{count}</span>;
};

const AdminDashboard = () => {
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [weeklyData, setWeeklyData] = useState([]);
  const [moodData, setMoodData] = useState([]);

  const BASE_URL = import.meta.env.VITE_REACT_APP_URL;
  const navigate = useNavigate();

  const moodLabel = () => {
    if (!data) return "Unknown";
    const score = data.overall_mood;
    if (score >= 4.5) return "Excellent";
    if (score >= 3.5) return "Good";
    if (score >= 2.5) return "Neutral";
    if (score >= 1.5) return "Poor";
    return "Critical";
  };

  const processWeeklyData = (weeklyRiskTrend) => {
    const dataWithDates = Object.entries(weeklyRiskTrend).map(([date, score]) => ({
      dateObj: new Date(date),
      day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
      score: score || 0
    }));
    dataWithDates.sort((a, b) => a.dateObj - b.dateObj);
    return dataWithDates.map(({ day, score }) => ({ day, score }));
  };

  const processMoodData = (moodDistribution) => {
    const colorMap = {
      "excited": "#A78BFA",
      "happy": "#34D399",
      "ok": "#60A5FA",
      "sad": "#F87171",
      "frustrated": "#FBBF24"
    };
    return Object.entries(moodDistribution).map(([mood, count]) => ({
      name: mood.charAt(0).toUpperCase() + mood.slice(1),
      value: count,
      color: colorMap[mood]
    }));
  };

  useEffect(() => {
    if (!token) return;
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/admin/overall_dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          throw new Error("Expected JSON but got: " + text);
        }

        const apiData = await response.json();
        setData(apiData);
        if (apiData?.weekly_mood_trend) {
          setWeeklyData(processWeeklyData(apiData.weekly_mood_trend));
        }
        if (apiData?.mood_distribution) {
          setMoodData(processMoodData(apiData.mood_distribution));
        }

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token, BASE_URL]);

  if (loading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-screen w-full">
          <div className="flex flex-col items-center justify-center">
            <div className="relative h-20 w-20">
              
              <span className="absolute inset-0 rounded-full animate-ping opacity-20 bg-emerald-500"></span>

             
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

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-80">
          <div className="text-red-500">Error: {error}</div>
        </div>
      </Layout>
    );
  }

  const cardData = [
    {
      title: "Overall Risk Score",
      value: data.overall_risk_score,
      isDecimal: true,
      suffix: "/5",
      sign: <Smile className="text-green-400" />
    },
    {
      title: "Critical Cases",
      value: data.critical_cases_count,
      isDecimal: false,
      sign: <ArrowDownRight className="text-red-600" />
    },
    {
      title: "Total Employees Surveyed",
      value: data.total_employees,
      isDecimal: false,
      sign: <ChartNoAxesCombined className="text-green-400" />
    },
    {
      title: "Overall Mood",
      value: moodLabel(),
      isLabel: true,
      sign: <Brain className="text-green-400" />
    },
  ];

  return (
    <Layout>
      <div className="relative bg-gray-50 dark:bg-gray-900 min-h-screen pb-4">
        <div className="py-6 px-6 md:px-10">
          <div className="mb-8 animate-fade-in">
            <h1 className="page-header mb-2 text-gray-800 dark:text-gray-100">HR Dashboard</h1>
            <p className="text-muted-foreground dark:text-gray-400">
              Monitor employee well-being and engagement across the organization
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cardData.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col justify-center items-center text-center w-full min-h-[150px] border border-gray-100 dark:border-gray-700"
              >
                <div className={`h-10 w-10 rounded-sm ${item.title === "Critical Cases" ? 'bg-red-100 dark:bg-red-900/30' : 'bg-green-100 dark:bg-green-900/30'} flex justify-center items-center`}>
                  {item.sign}
                </div>
                <p className="text-gray-400 dark:text-gray-300 font-semibold text-lg">{item.title}</p>
                <p className="text-3xl font-bold text-black dark:text-white mt-2">
                  {item.isLabel ? (
                    item.value
                  ) : (
                    <AnimatedValue value={item.value} isDecimal={item.isDecimal} suffix={item.suffix} />
                  )}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-xl border border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-4">Weekly Wellness Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyData}>
                  <XAxis dataKey="day" stroke="#03C03C" />
                  <YAxis domain={[0, 10]} stroke="#03C03C" />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', color: '#fff', border: 'none' }} />
                  <Line type="monotone" dataKey="score" stroke="#03C03C" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-xl border border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-4">Mood Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={moodData} cx="50%" cy="50%" innerRadius={50} outerRadius={100} dataKey="value">
                    {moodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend formatter={(value) => <span className="text-gray-800 dark:text-gray-200">{value}</span>} />
                  <Tooltip contentStyle={{ backgroundColor: '#C4EED9', color: '#fff', border: 'none' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <SevereCases criticalCases={data.critical_cases} />
      </div>
    </Layout>
  );
};

export default AdminDashboard;