import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";
import VibeChart from "../components/VibeChart";
import VibeStatusBadge from "../components/VibeStatusBadge";
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

const EmployeeReports = () => {
  const { user } = useAuth();
  const { vibes, leaves, activities, recognitions, performances } = useData();

  const [userVibes, setUserVibes] = useState([]);
  const [userLeaves, setUserLeaves] = useState([]);
  const [userActivities, setUserActivities] = useState([]);
  const [userRecognitions, setUserRecognitions] = useState([]);
  const [userPerformance, setUserPerformance] = useState(null);

  useEffect(() => {
    if (user) {
      const filteredVibes = vibes.filter(
        (v) => v.employeeId === user.employeeId,
      );
      const filteredLeaves = leaves.filter(
        (l) => l.employeeId === user.employeeId,
      );
      const filteredActivities = activities.filter(
        (a) => a.employeeId === user.employeeId,
      );
      const filteredRecognitions = recognitions.filter(
        (r) => r.employeeId === user.employeeId,
      );
      const filteredPerformance = performances.find(
        (p) => p.employeeId === user.employeeId,
      );

      const formattedVibes = filteredVibes
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map((v) => ({
          ...v,
          date: new Date(v.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
        }));

      const formattedActivities = filteredActivities
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map((a) => ({
          ...a,
          date: new Date(a.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          total: a.teamsMessages + a.emails + a.meetings,
        }));

      setUserVibes(formattedVibes);
      setUserLeaves(filteredLeaves);
      setUserActivities(formattedActivities);
      setUserRecognitions(filteredRecognitions);
      setUserPerformance(filteredPerformance);
    }
  }, [user, vibes, leaves, activities, recognitions, performances]);

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
        <div className="mb-8 animate-fade-in">
          <h1 className="page-header mb-2">My Reports</h1>
          <p className="text-muted-foreground">
            View detailed information about your well-being and performance
          </p>
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
        </div>
      </div>
    </Layout>
  );
};

export default EmployeeReports;
