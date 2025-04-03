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
  // const {
  //   vibes,
  //   leaves,
  //   activities,
  //   recognitions,
  //   performances,
  //   onboardings,
  //   chatSessions,
  //   chatMessages,
  // } = useData();
  console.log("token" , token);
  // const token = getToken.access_token;
  // console.log("token" , token);
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
              // const foundEmployee = users.find((u) => u.employeeId === employeeId);
              // setEmployee(foundEmployee);
               setEmployee(resultData.employee_id);
                // const filteredVibes = vibes.filter((v) => v.employeeId === employeeId);
                // const filteredLeaves = leaves.filter(
                //   (l) => l.employeeId === employeeId,
                // );
                if(resultData.mental_states){
                  const filteredVibes = Object.entries(resultData.mental_states).map(([state, count]) => ({
                    state,
                    count,
                  }));
                  setEmployeeVibes(filteredVibes);
                }
                // const filteredVibes = result.mental_states;
                // const filteredLeaves = result.leaves;
                if (resultData.leaves) {
                  const filteredLeaves = Object.entries(resultData.leaves).map(([reason, count]) => ({
                    reason,
                    count,
                  }));
                  setEmployeeLeaves(filteredLeaves);
                }
                // const filteredActivities = activities.filter(
                //   (a) => a.employeeId === employeeId,
                // );
                // const filteredActivities = result.communication_activity;
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
                // const filteredRecognitions = recognitions.filter(
                //   (r) => r.employeeId === employeeId,
                // );
                // const filteredRecognitions = result.rewards;
                if(resultData.rewards){
                  const formattedRewards = [
                    {
                      total_points: resultData.rewards.total_points,
                      awards: resultData.rewards.awards,
                    },
                  ];
                  setEmployeeRecognitions(formattedRewards);
                }
                // const filteredPerformance = performances.find(
                //   (p) => p.employeeId === employeeId,
                // );
                // const filteredPerformance = result.performance;
                if (resultData.performance) {
                  setEmployeePerformance({
                    employeeId: resultData.performance.Employee_ID,
                    reviewPeriod: resultData.performance.Review_Period,
                    performanceRating: resultData.performance.Performance_Rating,
                    managerFeedback: resultData.performance.Manager_Feedback,
                    promotionConsideration: resultData.performance.Promotion_Consideration,
                  });
                }
                // const filteredOnboarding = onboardings.find(
                //   (o) => o.employeeId === employeeId,
                // );
                // const filteredOnboarding = result.onboarding_data;
                if (resultData.onboarding_data) {
                  setEmployeeOnboarding({
                    feedback: resultData.onboarding_data.feedback,
                    mentorAssigned: resultData.onboarding_data.mentor_assigned,
                    trainingCompleted: resultData.onboarding_data.training_completed,
                  });
                }
                // const filteredChatSessions = chatSessions
                //   .filter((s) => s.employeeId === employeeId)
                //   .sort(
                //     (a, b) =>
                //       new Date(b.startTime).getTime() - new Date(a.startTime).getTime(),
                //   );
        
                // const formattedVibes = filteredVibes
                //   .sort(
                //     (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
                //   )
                //   .map((v) => ({
                //     ...v,
                //     date: new Date(v.date).toLocaleDateString("en-US", {
                //       month: "short",
                //       day: "numeric",
                //     }),
                //   }));
        
                // const formattedActivities = filteredActivities
                //   .sort(
                //     (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
                //   )
                //   .map((a) => ({
                //     ...a,
                //     date: new Date(a.date).toLocaleDateString("en-US", {
                //       month: "short",
                //       day: "numeric",
                //     }),
                //     total: a.teamsMessages + a.emails + a.meetings,
                //   }));
        
                // setEmployeeVibes(formattedVibes);
                // setEmployeeLeaves(filteredLeaves);
                // setEmployeeActivities(formattedActivities);
                // setEmployeeRecognitions(filteredRecognitions);
                // setEmployeePerformance(filteredPerformance);
                // setEmployeeOnboarding(filteredOnboarding);
                // setEmployeeChatSessions(filteredChatSessions);
              }
          // }, [
          //   employeeId,
          //   users,
          //   vibes,
          //   leaves,
          //   activities,
          //   recognitions,
          //   performances,
          //   onboardings,
          //   chatSessions,
          //   chatMessages,
          // ]);
    }catch (error) {
      console.log("unable to fetch user data", error);
    }
  };
  

  useEffect(() =>{
    employeeData()
  } , [employeeId, token]);

  // const [employee, setEmployee] = useState(null);
  // const [employeeVibes, setEmployeeVibes] = useState([]);
  // const [employeeLeaves, setEmployeeLeaves] = useState([]);
  // const [employeeActivities, setEmployeeActivities] = useState([]);
  // const [employeeRecognitions, setEmployeeRecognitions] = useState([]);
  // const [employeePerformance, setEmployeePerformance] = useState(null);
  // const [employeeOnboarding, setEmployeeOnboarding] = useState(null);
  // const [employeeChatSessions, setEmployeeChatSessions] = useState([]);

  // useEffect(() => {
  //   if (employeeId) {
  //     const foundEmployee = users.find((u) => u.employeeId === employeeId);
  //     setEmployee(foundEmployee);

  //     if (foundEmployee) {
  //       const filteredVibes = vibes.filter((v) => v.employeeId === employeeId);
  //       const filteredLeaves = leaves.filter(
  //         (l) => l.employeeId === employeeId,
  //       );
  //       const filteredActivities = activities.filter(
  //         (a) => a.employeeId === employeeId,
  //       );
  //       const filteredRecognitions = recognitions.filter(
  //         (r) => r.employeeId === employeeId,
  //       );
  //       const filteredPerformance = performances.find(
  //         (p) => p.employeeId === employeeId,
  //       );
  //       const filteredOnboarding = onboardings.find(
  //         (o) => o.employeeId === employeeId,
  //       );
  //       const filteredChatSessions = chatSessions
  //         .filter((s) => s.employeeId === employeeId)
  //         .sort(
  //           (a, b) =>
  //             new Date(b.startTime).getTime() - new Date(a.startTime).getTime(),
  //         );

  //       const formattedVibes = filteredVibes
  //         .sort(
  //           (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  //         )
  //         .map((v) => ({
  //           ...v,
  //           date: new Date(v.date).toLocaleDateString("en-US", {
  //             month: "short",
  //             day: "numeric",
  //           }),
  //         }));

  //       const formattedActivities = filteredActivities
  //         .sort(
  //           (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  //         )
  //         .map((a) => ({
  //           ...a,
  //           date: new Date(a.date).toLocaleDateString("en-US", {
  //             month: "short",
  //             day: "numeric",
  //           }),
  //           total: a.teamsMessages + a.emails + a.meetings,
  //         }));

  //       setEmployeeVibes(formattedVibes);
  //       setEmployeeLeaves(filteredLeaves);
  //       setEmployeeActivities(formattedActivities);
  //       setEmployeeRecognitions(filteredRecognitions);
  //       setEmployeePerformance(filteredPerformance);
  //       setEmployeeOnboarding(filteredOnboarding);
  //       setEmployeeChatSessions(filteredChatSessions);
  //     }
  //   }
  // }, [
  //   employeeId,
  //   users,
  //   // vibes,
  //   // leaves,
  //   // activities,
  //   // recognitions,
  //   // performances,
  //   // onboardings,
  //   // chatSessions,
  //   // chatMessages,
  // ]); to be uncommented
 
  // setEmployee(result.employee_id);
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
          <Emotion />
        </div>
      </Layout>
    );
  }

  // Calculate current status
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
      // Check if there are multiple consecutive negative vibes
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
              {/* {employee.department && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <p className="text-muted-foreground">{result.department}</p>
                </>
              )} */}
              {/* <span className="text-muted-foreground">•</span> */}
              {getRiskBadge()}
            </div>
          </div>

          <div className="mt-4 md:mt-0 flex items-center">
            <button className="px-4 py-2 bg-primary dark:text-white text-black rounded-lg hover:bg-primary/90 transition-colors button-hover">
              Schedule Check-in
            </button>
          </div>
        </div>

        {/* Profile and status */}
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
              {/* {employee.department && (
                <p className="text-sm text-muted-foreground">
                  {employee.department}
                </p>
              )} */}
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

              {/* <div className="flex items-start space-x-3"> */}
                {/* <div className="p-2 bg-secondary rounded-lg">
                  <Briefcase size={18} className="text-muted-foreground" />
                </div> */}
                {/* <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="text-sm">Active</p>
                </div> */}
              </div>

              {/* <div className="flex items-start space-x-3">
                <div className="p-2 bg-secondary rounded-lg">
                  <UserCheck size={18} className="text-muted-foreground" />
                </div> */}
                {/* <div>
                  <p className="text-sm text-muted-foreground">
                    Monthly Check-in
                  </p>
                  <p className="text-sm">
                    {currentMonthCheckIn ? "Completed" : "Pending"}
                  </p>
                </div> */}
              {/* </div>
            </div> */}
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

        {/* Vibe trend */}
        {/* <div
          className="neo-glass rounded-xl p-6 mb-8 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <h2 className="text-xl font-medium mb-6">Vibe Trend</h2>

          {employeeVibes.length > 0 ? (
            <VibeChart vibes={employeeVibes} height={200} />
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No vibe data available yet
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Activity levels */}
          {/* <div
            className="neo-glass rounded-xl p-6 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <h2 className="text-xl font-medium mb-6">Activity Levels</h2>

            {employeeActivities.length > 0 ? (
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={employeeActivities}
                    margin={{ top: 20, right: 20, left: 20, bottom: 40 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 12 }}
                      interval="preserveStartEnd"
                    />
                    <YAxis tick={{ fontSize: 12 }} width={30} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                      }}
                    />
                    <Bar
                      dataKey="teamsMessages"
                      name="Teams Messages"
                      stackId="a"
                      fill="#8884d8"
                    />
                    <Bar
                      dataKey="emails"
                      name="Emails"
                      stackId="a"
                      fill="#82ca9d"
                    />
                    <Bar
                      dataKey="meetings"
                      name="Meetings"
                      stackId="a"
                      fill="#ffc658"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No activity data available yet
              </div>
            )}
          </div> */}

          {/* Leave history */}
          {/* <div
            className="neo-glass rounded-xl p-6 animate-fade-in"
            style={{ animationDelay: "0.5s" }}
          >
            <h2 className="text-xl font-medium mb-6">Leave History</h2>

            {employeeLeaves.length > 0 ? (
              <div className="overflow-auto max-h-72">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="text-left border-b border-border">
                      <th className="py-3 px-4 font-medium">Date Range</th>
                      <th className="py-3 px-4 font-medium">Reason</th>
                      <th className="py-3 px-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeLeaves.map((leave) => (
                      <tr key={leave.id} className="border-b border-border">
                        <td className="py-3 px-4">
                          {new Date(leave.startDate).toLocaleDateString()} -{" "}
                          {new Date(leave.endDate).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">{leave.reason}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              leave.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : leave.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {leave.status.charAt(0).toUpperCase() +
                              leave.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No leave data available yet
              </div>
            )}
          </div>
        </div> */}

        {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-8"> */}
          {/* Chat history */}
          {/* <div
            className="lg:col-span-2 neo-glass rounded-xl p-6 animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            <h2 className="text-xl font-medium mb-6">Conversation History</h2>

            {employeeChatSessions.length > 0 ? (
              <div className="space-y-6">
                {employeeChatSessions.slice(0, 3).map((session) => (
                  <div
                    key={session.id}
                    className="border border-border rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-medium">
                          {session.title || "Conversation"}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(session.startTime).toLocaleDateString()} •{" "}
                          {session.completed ? "Completed" : "In Progress"}
                        </div>
                      </div>

                      <button className="text-primary hover:underline text-sm">
                        View transcript
                      </button>
                    </div>

                    <div className="text-sm">
                      <p className="text-muted-foreground">
                        {session.completed
                          ? "This session was completed successfully."
                          : "This session is still in progress."}
                      </p>
                    </div>
                  </div>
                ))} */}

                {/* {employeeChatSessions.length > 3 && (
                  <div className="text-center">
                    <button className="text-primary hover:underline text-sm">
                      View all {employeeChatSessions.length} conversations
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No conversation history available yet
              </div>
            )}
          </div> */}

          {/* Performance and recognition */}
          {/* <div className="space-y-8"> */}
            {/* Performance */}
            {/* <div
              className="neo-glass rounded-xl p-6 animate-fade-in"
              style={{ animationDelay: "0.7s" }}
            >
              <h2 className="text-xl font-medium mb-6">Performance</h2>

              {employeePerformance ? (
                <div className="space-y-4">
                  <div className="flex items-baseline justify-between">
                    <div className="text-sm font-medium">Rating</div>
                    <div className="flex items-center text-2xl font-medium">
                      {employeePerformance.rating.toFixed(1)}
                      <span className="text-sm text-muted-foreground ml-1">
                        /5.0
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Manager Feedback</div>
                    <div className="text-sm p-3 bg-secondary rounded-lg">
                      {employeePerformance.managerFeedback ||
                        "No feedback provided"}
                    </div>
                  </div>

                  {employeePerformance.strengths &&
                    employeePerformance.strengths.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Strengths</div>
                        <div className="flex flex-wrap gap-2">
                          {employeePerformance.strengths.map(
                            (strength, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs"
                              >
                                {strength}
                              </span>
                            ),
                          )}
                        </div>
                      </div>
                    )}
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  No performance data available yet
                </div>
              )}
            </div> */}

            {/* Recognitions */}
            {/* <div
              className="neo-glass rounded-xl p-6 animate-fade-in"
              style={{ animationDelay: "0.8s" }}
            >
              <h2 className="text-xl font-medium mb-6">Recognition</h2>

              {employeeRecognitions.length > 0 ? (
                <div className="space-y-4 max-h-72 overflow-y-auto">
                  {employeeRecognitions.map((recognition) => (
                    <div
                      key={recognition.id}
                      className="p-3 border border-border rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <div className="text-sm font-medium">
                          {recognition.type}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(recognition.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-sm">{recognition.description}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Given by: {recognition.givenBy}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  No recognition data available yet
                </div>
              )}
            </div> */}
          </div>
      <Emotion  result={result} />
      <Experience  result={result} />
      <InteractionReports  result={result} />
      <LeaveAnalysis result={result} />
      <Performance token={token} employeeId={employeeId} result={result} />
    </Layout>
  );
};
export default AdminEmployeeDetail;
