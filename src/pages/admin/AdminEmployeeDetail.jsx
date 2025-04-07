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
import { useReport } from "../../contexts/ReportContext";

const AdminEmployeeDetail = () => {
  const { employeeId } = useParams();
  const { token } = useAuth();
  const VITE_REACT_APP_URL = import.meta.env.VITE_REACT_APP_URL;
  const [employee, setEmployee] = useState(null);
  const [result, setResult] = useState(null);
  const [employeeVibes, setEmployeeVibes] = useState([]);
  const [employeeLeaves, setEmployeeLeaves] = useState([]);
  const [employeeActivities, setEmployeeActivities] = useState([]);
  const [employeeRecognitions, setEmployeeRecognitions] = useState([]);
  const [employeePerformance, setEmployeePerformance] = useState(null);
  const [employeeOnboarding, setEmployeeOnboarding] = useState(null);
  const [employeeChatSessions, setEmployeeChatSessions] = useState([]);
  const { resultSummary, setResultSummary } = useReport()
  const employeeData = async () => {
    try {
      const response = await fetch(`${VITE_REACT_APP_URL}/admin/${employeeId}/summary`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const resultData = await response.json();
      setResult(resultData);
      setResultSummary(resultData)

      if (resultData?.employee_info?.employee_id) {
        setEmployee(resultData?.employee_info?.employee_id);
        if (resultData.mental_states) {
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

        if (resultData.communication_activity) {
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

        if (resultData.rewards) {
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
    } catch (error) {
      console.error("unable to fetch user data", error);
    }
  };

  useEffect(() => {
    employeeData()
  }, [employeeId, token]);

  if (!employee) {
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


  let getVibe = (vibeScore) => {
    if (vibeScore === 1) {
      return "Frustrated";
    }
    else if (vibeScore === 2) {
      return "Sad";
    }
    else if (vibeScore === 3) {
      return "Okay";
    }
    else if (vibeScore === 4) {
      return "Happy";
    }
    else {
      return "Excited";
    }
  }

  let getRisk = (riskScore) => {
    if (riskScore === 1) {
      return "Very Low";
    }
    else if (riskScore === 2) {
      return "Low";
    }
    else if (riskScore === 3) {
      return "Moderate";
    }
    else if (riskScore === 4) {
      return "High";
    }
    else {
      return "Urgent";
    }
  }


  return (
    <Layout>
      <div className="page-container  py-8 bg-white dark:bg-gray-800 rounded-lg w-full shadow-2xl">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between animate-fade-in">
          <div>
            <div className="flex flex-col mb-2 justify-between">
              <Link
                to="/admin/reports"
                className="inline-flex items-center text-primary hover:underline mb-2"
              >
                <ArrowLeft size={16} className="mr-1" />
                Back to Reports
              </Link>
              <Link
                to={`/admin/exportReport/${employeeId}`}
                className="inline-flex items-center text-primary hover:underline mb-2 text-none"
              >
                <span className="p-2 bg-green-700 text-white rounded-xl text-none px-4 no-underline">Export</span>
              </Link>
            </div>
            <h1 className="page-header mb-2">{result?.employee_info?.name}</h1>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-muted-foreground">ID: {result?.employee_info?.employee_id}</p>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          result?.current_state?.risk_assessment === 1
                            ? "bg-blue-500"
                            : result?.current_state?.risk_assessment === 2
                            ? "bg-green-400"
                            : result?.current_state?.risk_assessment === 3
                            ? "bg-yellow-400"
                            : result?.current_state?.risk_assessment === 4
                            ? "bg-orange-400"
                            : result?.current_state?.risk_assessment === 5
                            ? "bg-red-500"
                            : "bg-gray-400"
                        }`}>{getRisk(result?.current_state?.risk_assessment)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div
            className="neo-glass rounded-xl p-6 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <h2 className="text-xl font-medium mb-6">Employee Information</h2>

            <div className="flex flex-col items-center mb-6">
              {result?.employee_info?.name.avatar ? (
                <img
                  src={employee.avatar}
                  alt={result.name}
                  className="h-20 w-20 rounded-full object-cover border border-border mb-3"
                />
              ) : (
                <div className="h-20 w-20 bg-secondary rounded-full flex items-center justify-center mb-3">
                  <span className="text-2xl font-medium text-secondary-foreground">
                    {result?.employee_info?.name.charAt(0)}
                  </span>
                </div>
              )}
              <h3 className="text-lg font-medium">{result?.employee_info?.name}</h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-secondary rounded-lg">
                  <User size={18} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Employee ID</p>
                  <p className="text-sm">{result?.employee_info?.employee_id}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 bg-secondary rounded-lg">
                  <Mail size={18} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-sm">{result?.employee_info?.email}</p>
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
                {result?.current_state?.vibe_score ? (
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          result?.current_state?.vibe_score === 5
                            ? "bg-blue-500"
                            : result?.current_state?.vibe_score === 4
                            ? "bg-green-400"
                            : result?.current_state?.vibe_score === 3
                            ? "bg-yellow-400"
                            : result?.current_state?.vibe_score === 2
                            ? "bg-orange-400"
                            : result?.current_state?.vibe_score === 1
                            ? "bg-red-500"
                            : "bg-gray-400"
                        }`}>
                      {getVibe(result?.current_state?.vibe_score)}
                    </span>
                  </div>
                ) : (
                  <div className="text-sm">No vibe data available</div>
                )}
              </div>


              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Risk Assessment
                </div>
                <div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          result?.current_state?.risk_assessment === 1
                            ? "bg-blue-500"
                            : result?.current_state?.risk_assessment === 2
                            ? "bg-green-400"
                            : result?.current_state?.risk_assessment === 3
                            ? "bg-yellow-400"
                            : result?.current_state?.risk_assessment === 4
                            ? "bg-orange-400"
                            : result?.current_state?.risk_assessment === 5
                            ? "bg-red-500"
                            : "bg-gray-400"
                        }`}>{getRisk(result?.current_state?.risk_assessment)}</span></div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Last Check-in
                </div>
                <div className="text-sm">
                  {result?.current_state?.last_check_in
                    ? new Date(result.current_state.last_check_in).toLocaleDateString()
                    : "Never"}
                </div>
              </div>
            </div>

            {result?.performance?.current?.rating && (
              <div className="mt-6 pt-6 border-t border-border">
                <div className="text-sm text-muted-foreground mb-2">
                  Performance Rating
                </div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-medium">
                    {result?.performance?.current?.rating.toFixed(1)}
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
          <Emotion result={result} />
          <IntentReport result={result} />
          <InteractionReports result={result} />
          <Performance result={result} />
          <LeaveAnalysis result={result} />
          <Experience result={result} />
        </>
      }
    </Layout>
  );
};
export default AdminEmployeeDetail;
