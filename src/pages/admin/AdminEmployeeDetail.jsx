import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../../components/employeeCompo/Layout";
import { useData } from "../../contexts/DataContext";
import VibeChart from "../../components/employeeCompo/VibeChart";
import VibeStatusBadge from "../../components/employeeCompo/VibeStatusBadge";
import Emotion from "../../components/HRDashboard/botReport/Emotion"
import Experience from '../../components/HRDashboard/botReport/Experience';
import InteractionReports from "../../components/HRDashboard/botReport/InteractionReport";
import LeaveAnalysis from '../../components/HRDashboard/botReport/LeaveAnalysis';
import Performance from '../../components/HRDashboard/botReport/Performance';
import { users } from "../../data/mockData";
import {
  ArrowLeft,
  Calendar,
  CheckCheck,
  Award,
  MessageSquare,
  Briefcase,
  User,
  Mail,
  UserCheck,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useAuth } from "../../contexts/AuthContext";
import IntentReport from "../../components/HRDashboard/botReport/IntentReport";

const AdminEmployeeDetail = () => {
  const { employeeId } = useParams();
  const { token } = useAuth();
  const VITE_REACT_APP_URL = import.meta.env.VITE_REACT_APP_URL;
  const [employee, setEmployee] = useState(null);
  const [result , setResult] = useState(null);
  const [employeeVibes, setEmployeeVibes] = useState([]);
  const [employeeLeaves, setEmployeeLeaves] = useState([]);
  const [employeeActivities, setEmployeeActivities] = useState([]);
  const [employeeRecognitions, setEmployeeRecognitions] = useState([]);
  const [employeePerformance, setEmployeePerformance] = useState(null);
  const [employeeOnboarding, setEmployeeOnboarding] = useState(null);
  const [employeeChatSessions, setEmployeeChatSessions] = useState([]);
  console.log("token" , token);
  const employeeData = async () => {
    try {
      const response = await fetch(`${VITE_REACT_APP_URL}/admin/${employeeId}/summary` ,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const resultData = await response.json();
      console.log("result", resultData);
      setResult(resultData);

        if (resultData.employee_id) {
               setEmployee(resultData.employee_id);
                if(resultData.mental_states){
                  const filteredVibes = Object.entries(resultData.mental_states).map(([state, count]) => ({
                    state,
                    count,
                  }));
                  setEmployeeVibes(filteredVibes);
                }
                if (resultData.leaves) {
                  const filteredLeaves = Object.entries(resultData.leaves).map(([reason, count]) => ({
                    reason,
                    count,
                  }));
                  setEmployeeLeaves(filteredLeaves);
                }

                if(resultData.communication_activity){
                  const filteredActivities = Object.entries(resultData.communication_activity).map(([message_type, count]) => ({
                    message_type,
                    count,
                  }));
                  
                  const formattedActivities = filteredActivities.map((a) => ({
                    ...a,
                    total:
                      (resultData.communication_activity.teams_messages_sent || 0) +
                      (resultData.communication_activity.emails_sent || 0) +
                      (resultData.communication_activity.meetings_attended || 0),
                  }));
                  setEmployeeActivities(formattedActivities);
                }
            
                if(resultData.rewards){
                  const formattedRewards = [
                    {
                      total_points: resultData.rewards.total_points,
                      awards: resultData.rewards.awards,
                    },
                  ];
                  setEmployeeRecognitions(formattedRewards);
                }
                
                if (resultData.performance) {
                  setEmployeePerformance({
                    employeeId: resultData.performance.Employee_ID,
                    reviewPeriod: resultData.performance.Review_Period,
                    performanceRating: resultData.performance.Performance_Rating,
                    managerFeedback: resultData.performance.Manager_Feedback,
                    promotionConsideration: resultData.performance.Promotion_Consideration,
                  });
                }
                
                if (resultData.onboarding_data) {
                  setEmployeeOnboarding({
                    feedback: resultData.onboarding_data.feedback,
                    mentorAssigned: resultData.onboarding_data.mentor_assigned,
                    trainingCompleted: resultData.onboarding_data.training_completed,
                  });
                }
              }
    }catch (error) {
      console.log("unable to fetch user data", error);
    }
  };
  

  useEffect(() =>{
    employeeData()
  } , [employeeId, token]);

  if (!employee) {
    return (
      <Layout>
        <div className="page-container py-8">
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              Employee not found. Please check the ID and try again.
            </p>
            <Link
              to="/admin/reports"
              className="mt-4 inline-flex items-center text-primary hover:underline"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to Reports
            </Link>
          </div>
          {/* <Emotion /> */}
        </div>
      </Layout>
    );
  }

  const latestVibe =
    employeeVibes.length > 0
      ? employeeVibes[employeeVibes.length - 1].vibe
      : null;

  const activityLevel =
    employeeActivities.length > 0
      ? (() => {
          const avgActivity =
            employeeActivities.reduce(
              (sum, a) => sum + a.teamsMessages + a.emails + a.meetings,
              0,
            ) / employeeActivities.length;

          return avgActivity < 10
            ? "low"
            : avgActivity > 30
              ? "high"
              : "normal";
        })()
      : "normal";

  const currentMonthCheckIn = (() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return employeeChatSessions.some((session) => {
      const sessionDate = new Date(session.startTime);
      return (
        session.completed &&
        sessionDate.getMonth() === currentMonth &&
        sessionDate.getFullYear() === currentYear
      );
    });
  })();

  const getEmployeeRisk = () => {
    if (!latestVibe) return "unknown";

    if (latestVibe === "frustrated" || latestVibe === "sad") {
      
      const recentVibes = employeeVibes.slice(-3);
      const negativeCount = recentVibes.filter(
        (v) => v.vibe === "frustrated" || v.vibe === "sad",
      ).length;

      if (negativeCount >= 2) return "high";
      return "medium";
    }

    if (latestVibe === "okay") return "low";
    return "none";
  };

  const riskLevel = getEmployeeRisk();

  const getRiskBadge = () => {
    switch (riskLevel) {
      case "high":
        return (
          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium">
            High Risk
          </span>
        );
      case "medium":
        return (
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
            Medium Risk
          </span>
        );
      case "low":
        return (
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
            Low Risk
          </span>
        );
      case "none":
        return (
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
            No Risk
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
            Unknown
          </span>
        );
    }
  };


  return (
    <Layout>
      <div className="page-container py-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between animate-fade-in">
          <div>
            <Link
              to="/admin/reports"
              className="inline-flex items-center text-primary hover:underline mb-2"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to Reports
            </Link>
            <h1 className="page-header mb-2">{result.name}</h1>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-muted-foreground">ID: {result.employee_id}</p>
              {getRiskBadge()}
            </div>
          </div>

          <div className="mt-4 md:mt-0 flex items-center">
            <button className="px-4 py-2 bg-primary dark:text-white text-black rounded-lg hover:bg-primary/90 transition-colors button-hover">
              Schedule Check-in
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div
            className="neo-glass rounded-xl p-6 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <h2 className="text-xl font-medium mb-6">Employee Information</h2>

            <div className="flex flex-col items-center mb-6">
              {employee.avatar ? (
                <img
                  src={employee.avatar}
                  alt={result.name}
                  className="h-20 w-20 rounded-full object-cover border border-border mb-3"
                />
              ) : (
                <div className="h-20 w-20 bg-secondary rounded-full flex items-center justify-center mb-3">
                  <span className="text-2xl font-medium text-secondary-foreground">
                    {result.name.charAt(0)}
                  </span>
                </div>
              )}
              <h3 className="text-lg font-medium">{result.name}</h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-secondary rounded-lg">
                  <User size={18} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Employee ID</p>
                  <p className="text-sm">{result.employee_id}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 bg-secondary rounded-lg">
                  <Mail size={18} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-sm">{result.email}</p>
                </div>
              </div>
              </div>
          </div>

          <div
            className="md:col-span-2 neo-glass rounded-xl p-6 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <h2 className="text-xl font-medium mb-6">Current Status</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Current Vibe
                </div>
                {latestVibe ? (
                  <div className="flex items-center space-x-2">
                    <VibeStatusBadge vibe={latestVibe} size="lg" />
                    <span className="text-sm">
                      {employeeVibes.length > 0
                        ? new Date(
                            employeeVibes[employeeVibes.length - 1].date,
                          ).toLocaleDateString()
                        : ""}
                    </span>
                  </div>
                ) : (
                  <div className="text-sm">No vibe data available</div>
                )}
              </div>

               <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Activity Level
                </div>
                <div>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      activityLevel === "high"
                        ? "bg-yellow-100 text-yellow-800"
                        : activityLevel === "low"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {activityLevel.charAt(0).toUpperCase() +
                      activityLevel.slice(1)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Risk Assessment
                </div>
                <div>{getRiskBadge()}</div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Last Check-in
                </div>
                <div className="text-sm">
                  {employeeChatSessions.length > 0
                    ? new Date(
                        employeeChatSessions[0].startTime,
                      ).toLocaleDateString()
                    : "Never"}
                </div>
              </div>
            </div>

            {employeePerformance && (
              <div className="mt-6 pt-6 border-t border-border">
                <div className="text-sm text-muted-foreground mb-2">
                  Performance Rating
                </div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-medium">
                    {employeePerformance.performanceRating.toFixed(1)}
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">
                    /5.0
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {result &&
      <>
      <Emotion  result={result} />
      <IntentReport result={result} />
      <InteractionReports  result={result} />
      <Performance token={token} employeeId={employeeId} result={result} />
      <LeaveAnalysis result={result} />
      <Experience  result={result} />
      </>
}
    </Layout>
  );
};
export default AdminEmployeeDetail;
