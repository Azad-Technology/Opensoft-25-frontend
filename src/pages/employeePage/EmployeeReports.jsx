import React, { useEffect, useState } from "react";
import Layout from "../../components/employeeCompo/Layout";
import { useAuth } from "../../contexts/AuthContext";
import { useData } from "../../contexts/DataContext";
import VibeChart from "../../components/employeeCompo/VibeChart";
import VibeStatusBadge from "../../components/employeeCompo/VibeStatusBadge";
import { AchievementsSection } from '../../components/employeeCompo/AchievementsSection';
import ProjectCard from "../../components/employeeCompo/ProjectCard";
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
} from "recharts";
import { useNavigate } from "react-router-dom";

const EmployeeReports = () => {
  const { user } = useAuth();
  const { vibes, leaves, activities, recognitions, performances } = useData();
  const navigate=useNavigate();

  // const [userVibes, setUserVibes] = useState([]);
  // const [userLeaves, setUserLeaves] = useState([]);
  // const [userActivities, setUserActivities] = useState([]);
  // const [userRecognitions, setUserRecognitions] = useState([]);
  // const [userPerformance, setUserPerformance] = useState(null);

  const userPerformance = {
    rating: 4.3,
    managerFeedback: "Great work on project execution and team collaboration.",
    strengths: ["Leadership", "Problem-Solving", "Time Management"],
    improvements: ["Communication", "Technical Documentation"],
  };

  //Hard coded data
  const projectData = [
    {
      id: '1',
      name: 'Website Redesign',
      priority: 'high',
      status: 'in-progress',
      startDate: '2024-03-01',
      endDate: '2024-04-15',
      progress: 65,
      assignees: ['Sarah J.', 'Michael C.'],
    },
    {
      id: '2',
      name: 'Mobile App Development',
      priority: 'medium',
      status: 'not-started',
      startDate: '2024-04-01',
      endDate: '2024-06-30',
      progress: 0,
      assignees: ['Emily D.', 'John S.'],
    },
    {
      id: '3',
      name: 'Data Migration',
      priority: 'low',
      status: 'completed',
      startDate: '2024-02-15',
      endDate: '2024-03-15',
      progress: 100,
      assignees: ['Robert K.', 'Lisa M.'],
    },
  ];

  const userVibes = [
    { id: 1, date: "2024-03-25", vibe: "happy" },
    { id: 2, date: "2024-03-26", vibe: "sad" },
    { id: 3, date: "2024-03-27", vibe: "frustrated" },
    { id: 4, date: "2024-03-28", vibe: "excited" },
    { id: 5, date: "2024-03-29", vibe: "okay" },
    { id: 6, date: "2024-03-30", vibe: "happy" },
    { id: 7, date: "2024-03-31", vibe: "happy" },
    { id: 8, date: "2024-04-1", vibe: "frustrated" },
    { id: 9, date: "2024-04-2", vibe: "excited" },
    { id: 10, date: "2024-04-3", vibe: "sad" },
    { id: 11, date: "2024-04-4", vibe: "okay" },
  ];

  const userRecognitions = [
    {
      id: 1,
      type: "Employee of the Month",
      date: "2024-03-15",
      description: "Recognized for outstanding performance and dedication.",
      givenBy: "HR Department",
    },
    {
      id: 2,
      type: "Best Team Player",
      date: "2024-02-10",
      description: "Acknowledged for exceptional teamwork and collaboration.",
      givenBy: "Project Manager",
    },
  ];

  const userActivities = [
    {
      date: "2024-03-25",
      teamsMessages: 15,
      emails: 8,
      meetings: 2,
    },
    {
      date: "2024-03-26",
      teamsMessages: 20,
      emails: 5,
      meetings: 3,
    },
    {
      date: "2024-03-27",
      teamsMessages: 12,
      emails: 10,
      meetings: 1,
    },
    {
      date: "2024-03-28",
      teamsMessages: 18,
      emails: 6,
      meetings: 4,
    },
    {
      date: "2024-03-29",
      teamsMessages: 25,
      emails: 12,
      meetings: 5,
    },
  ];

  const userLeaves = [
    {
      id: 1,
      startDate: "2024-03-10",
      endDate: "2024-03-12",
      reason: "Medical leave due to illness",
      status: "approved",
    },
    {
      id: 2,
      startDate: "2024-03-20",
      endDate: "2024-03-22",
      reason: "Family function",
      status: "pending",
    },
    {
      id: 3,
      startDate: "2024-04-05",
      endDate: "2024-04-06",
      reason: "Personal work",
      status: "rejected",
    },
    {
      id: 4,
      startDate: "2024-04-15",
      endDate: "2024-04-18",
      reason: "Vacation",
      status: "approved",
    },
    {
      id: 5,
      startDate: "2024-05-01",
      endDate: "2024-05-02",
      reason: "Emergency leave",
      status: "pending",
    },
  ];
  

  // useEffect(() => {
  //   if (user) {
  //     const filteredVibes = vibes.filter(
  //       (v) => v.employeeId === user.employeeId,
  //     );
  //     const filteredLeaves = leaves.filter(
  //       (l) => l.employeeId === user.employeeId,
  //     );
  //     const filteredActivities = activities.filter(
  //       (a) => a.employeeId === user.employeeId,
  //     );
  //     const filteredRecognitions = recognitions.filter(
  //       (r) => r.employeeId === user.employeeId,
  //     );
  //     const filteredPerformance = performances.find(
  //       (p) => p.employeeId === user.employeeId,
  //     );

  //     const formattedVibes = filteredVibes
  //       .sort((a, b) => new Date(a.date) - new Date(b.date))
  //       .map((v) => ({
  //         ...v,
  //         date: new Date(v.date).toLocaleDateString("en-US", {
  //           month: "short",
  //           day: "numeric",
  //         }),
  //       }));

  //     const formattedActivities = filteredActivities
  //       .sort((a, b) => new Date(a.date) - new Date(b.date))
  //       .map((a) => ({
  //         ...a,
  //         date: new Date(a.date).toLocaleDateString("en-US", {
  //           month: "short",
  //           day: "numeric",
  //         }),
  //         total: a.teamsMessages + a.emails + a.meetings,
  //       }));

  //     setUserVibes(formattedVibes);
  //     setUserLeaves(filteredLeaves);
  //     setUserActivities(formattedActivities);
  //     setUserRecognitions(filteredRecognitions);
  //     setUserPerformance(filteredPerformance);
  //   }
  // }, [user, vibes, leaves, activities, recognitions, performances]);

  const handleExport=()=>{
    navigate("/employee/exportReport");
  }

  if (!user) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-80">
          <div className="animate-pulse-slow">Loading your reports...</div>
        </div>
      </Layout>
    );
  }

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
          <div>
            <button className="bg-green-800 p-2 rounded-xl text-white" onClick={handleExport}>
              Export
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {/* Vibe trend */}
          <div
            className="neo-glass rounded-xl p-6 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <h2 className="text-xl font-medium mb-6">Vibe Trend</h2>

            {userVibes.length > 0 ? (
              <div className="space-y-6">
                <VibeChart vibes={userVibes} height={200} />

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {["frustrated", "sad", "okay", "happy", "excited"].map(
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
                  Based on {userVibes.length} entries
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
            <AchievementsSection />
          </div>




          {/* Activity levels */}
          <div
            className="neo-glass rounded-xl p-6 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <h2 className="text-xl font-medium mb-6">Activity Levels</h2>

            {userActivities.length > 0 ? (
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={userActivities}
                    margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 12 }}
                      interval="preserveStartEnd"
                    />
                    <YAxis tick={{ fontSize: 12 }} width={40} />
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
              <div className="text-center py-8 text-muted-foreground">
                No activity data available yet
              </div>
            )}
          </div>

          {/* Leave history */}
          <div
            className="neo-glass rounded-xl p-6 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <h2 className="text-xl font-medium mb-6">Leave History</h2>

            {userLeaves.length > 0 ? (
              <div className="overflow-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="text-left border-b border-border">
                      <th className="py-3 px-4 font-medium">Date Range</th>
                      <th className="py-3 px-4 font-medium">Reason</th>
                      <th className="py-3 px-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userLeaves.map((leave) => (
                      <tr key={leave.id} className="border-b border-border">
                        <td className="py-3 px-4">
                          {new Date(leave.startDate).toLocaleDateString()} -{" "}
                          {new Date(leave.endDate).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">{leave.reason}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${leave.status === "approved"
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

          {/* Performance and Recognition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Performance */}
            <div
              className="neo-glass rounded-xl p-6 animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              <h2 className="text-xl font-medium mb-6">Performance</h2>

              {userPerformance ? (
                <div className="space-y-4">
                  <div className="flex items-baseline justify-between">
                    <div className="text-sm font-medium">Rating</div>
                    <div className="flex items-center text-2xl font-medium">
                      {userPerformance.rating.toFixed(1)}
                      <span className="text-sm text-muted-foreground ml-1">
                        /5.0
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Manager Feedback</div>
                    <div className="text-sm p-3 bg-secondary rounded-lg">
                      {userPerformance.managerFeedback ||
                        "No feedback provided"}
                    </div>
                  </div>

                  {userPerformance.strengths &&
                    userPerformance.strengths.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Strengths</div>
                        <div className="flex flex-wrap gap-2">
                          {userPerformance.strengths.map((strength, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs"
                            >
                              {strength}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  {userPerformance.improvements &&
                    userPerformance.improvements.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-sm font-medium">
                          Areas for Improvement
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {userPerformance.improvements.map(
                            (improvement, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs"
                              >
                                {improvement}
                              </span>
                            ),
                          )}
                        </div>
                      </div>
                    )}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No performance data available yet
                </div>
              )}
            </div>

            {/* Recognition */}
            <div
              className="neo-glass rounded-xl p-6 animate-fade-in"
              style={{ animationDelay: "0.5s" }}
            >
              <h2 className="text-xl font-medium mb-6">Recognition</h2>

              {userRecognitions.length > 0 ? (
                <div className="space-y-4">
                  {userRecognitions.map((recognition) => (
                    <div
                      key={recognition.id}
                      className="p-4 border border-border rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-sm font-medium">
                          {recognition.type}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(recognition.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-sm">{recognition.description}</div>
                      <div className="text-xs text-muted-foreground mt-2">
                        Given by: {recognition.givenBy}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No recognition data available yet
                </div>
              )}
            </div>
          </div>

          <div className="neo-glass rounded-xl p-6 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <h2 className="text-xl font-medium mb-6">Assigned Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {projectData.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default EmployeeReports;