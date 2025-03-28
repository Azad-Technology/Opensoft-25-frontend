import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useData } from "../contexts/DataContext";
import StatCard from "../components/StatCard";
import VibeStatusBadge from "../components/VibeStatusBadge";
import { users } from "../data/mockData";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  AlertTriangle,
  Users,
  ArrowRight,
  UserCheck,
  Award,
} from "lucide-react";

const AdminDashboard = () => {
  const { vibes, getAtRiskEmployees, getMonthlyComplianceRate } = useData();

  const [vibeSummary, setVibeSummary] = useState([]);
  const [atRiskEmployees, setAtRiskEmployees] = useState([]);
  const [complianceRate, setComplianceRate] = useState(0);

  useEffect(() => {
    const counts = {
      frustrated: 0,
      sad: 0,
      okay: 0,
      happy: 0,
      excited: 0,
    };

    const employeeLatestVibes = new Map();

    vibes.forEach((v) => {
      const existingVibe = employeeLatestVibes.get(v.employeeId);
      if (!existingVibe || new Date(v.date) > new Date(existingVibe.date)) {
        employeeLatestVibes.set(v.employeeId, { vibe: v.vibe, date: v.date });
      }
    });

    employeeLatestVibes.forEach(({ vibe }) => {
      counts[vibe]++;
    });

    const data = Object.keys(counts).map((vibe) => ({
      name: vibe,
      value: counts[vibe],
    }));

    setVibeSummary(data);
    setAtRiskEmployees(getAtRiskEmployees());
    setComplianceRate(getMonthlyComplianceRate());
  }, [vibes, getAtRiskEmployees, getMonthlyComplianceRate]);

  const COLORS = ["#F87171", "#93C5FD", "#FCD34D", "#A3E635", "#8B5CF6"];

  const nonCompliantEmployees = users.filter(
    (user) => user.role === "employee" && Math.random() < 0.3,
  );

  const performanceData = [
    { rating: "1-2", count: 2 },
    { rating: "2-3", count: 5 },
    { rating: "3-4", count: 15 },
    { rating: "4-5", count: 8 },
  ];

  return (
    <Layout>
      <div className="page-container py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="page-header mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor employee well-being and engagement across the organization
          </p>
        </div>

        {/* Stats overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Employees"
            value={users.filter((u) => u.role === "employee").length}
            description="Active employees in the system"
            icon={<Users size={24} />}
            className="animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          />

          <StatCard
            title="Compliance Rate"
            value={`${Math.round(complianceRate)}%`}
            description="Employees who completed monthly chat"
            icon={<UserCheck size={24} />}
            trend={complianceRate > 75 ? "up" : "down"}
            trendValue={complianceRate > 75 ? "+5%" : "-3%"}
            className="animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          />

          <StatCard
            title="At-Risk Employees"
            value={atRiskEmployees.length}
            description="Employees showing signs of distress"
            icon={<AlertTriangle size={24} />}
            className="animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          />

          <StatCard
            title="Recognition Count"
            value="24"
            description="Recognitions given this month"
            icon={<Award size={24} />}
            trend="up"
            trendValue="+8"
            className="animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Vibe distribution */}
            <div
              className="neo-glass rounded-xl p-6 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <h2 className="text-xl font-medium mb-6">
                Emotional Status Distribution
              </h2>

              <div className="flex flex-col md:flex-row items-center justify-center h-72">
                <div className="w-full md:w-1/2 h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={vibeSummary}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                        labelLine={false}
                      >
                        {vibeSummary.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value} employees`, "Count"]}
                        contentStyle={{
                          borderRadius: "8px",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="w-full md:w-1/2 grid grid-cols-1 gap-3 mt-4 md:mt-0">
                  {COLORS.map((color, index) => {
                    const vibe = Object.keys(vibeSummary)[index];
                    if (!vibe || !vibeSummary[index]) return null;

                    return (
                      <div key={index} className="flex items-center space-x-2">
                        <VibeStatusBadge vibe={vibe} />
                        <span className="text-sm">
                          {vibeSummary[index]?.value || 0} employees
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Performance distribution */}
            <div
              className="neo-glass rounded-xl p-6 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium">
                  Performance Distribution
                </h2>
                <Link
                  to="/admin/reports"
                  className="text-sm text-primary hover:underline flex items-center"
                >
                  View detailed reports
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>

              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={performanceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="rating" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} width={40} />
                    <Tooltip
                      formatter={(value) => [`${value} employees`, "Count"]}
                      contentStyle={{
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                      }}
                    />
                    <Bar dataKey="count" name="Employees" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* At-risk employees */}
            <div
              className="neo-glass rounded-xl p-6 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium">At-Risk Employees</h2>
                {atRiskEmployees.length > 0 && (
                  <Link
                    to="/admin/reports"
                    className="text-sm text-primary hover:underline flex items-center"
                  >
                    View all
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                )}
              </div>

              {atRiskEmployees.length > 0 ? (
                <div className="space-y-4">
                  {atRiskEmployees.slice(0, 3).map((employee) => (
                    <div
                      key={employee.id}
                      className="flex items-center space-x-3 p-3 rounded-lg border border-border"
                    >
                      {employee.avatar ? (
                        <img
                          src={employee.avatar}
                          alt={employee.name}
                          className="h-10 w-10 rounded-full object-cover border border-border"
                        />
                      ) : (
                        <div className="h-10 w-10 bg-secondary rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-secondary-foreground">
                            {employee.name.charAt(0)}
                          </span>
                        </div>
                      )}

                      <div className="flex-1">
                        <div className="font-medium text-sm">
                          {employee.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {employee.department}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <VibeStatusBadge vibe="frustrated" size="sm" />
                        <Link
                          to={`/admin/reports/${employee.employeeId}`}
                          className="text-primary hover:underline text-sm"
                        >
                          <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No at-risk employees detected
                </div>
              )}
            </div>

            {/* Non-compliant employees */}
            <div
              className="neo-glass rounded-xl p-6 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium">Compliance Alerts</h2>
                {nonCompliantEmployees.length > 0 && (
                  <Link
                    to="/admin/reports"
                    className="text-sm text-primary hover:underline flex items-center"
                  >
                    View all
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                )}
              </div>

              {nonCompliantEmployees.length > 0 ? (
                <div className="space-y-4">
                  {nonCompliantEmployees.slice(0, 4).map((employee) => (
                    <div
                      key={employee.id}
                      className="flex items-center space-x-3 p-3 rounded-lg border border-border"
                    >
                      {employee.avatar ? (
                        <img
                          src={employee.avatar}
                          alt={employee.name}
                          className="h-10 w-10 rounded-full object-cover border border-border"
                        />
                      ) : (
                        <div className="h-10 w-10 bg-secondary rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-secondary-foreground">
                            {employee.name.charAt(0)}
                          </span>
                        </div>
                      )}

                      <div className="flex-1">
                        <div className="font-medium text-sm">
                          {employee.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Missing monthly check-in
                        </div>
                      </div>

                      <Link
                        to={`/admin/reports/${employee.employeeId}`}
                        className="text-primary hover:underline text-sm"
                      >
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  All employees are compliant
                </div>
              )}
            </div>

            {/* Quick actions */}
            <div
              className="neo-glass rounded-xl p-6 animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              <h2 className="text-xl font-medium mb-6">Quick Actions</h2>

              <div className="space-y-3">
                <button className="w-full text-left flex items-center justify-between px-4 py-3 rounded-lg hover:bg-secondary transition-colors">
                  <span className="text-sm">Generate Monthly Report</span>
                  <ArrowRight size={16} />
                </button>

                <button className="w-full text-left flex items-center justify-between px-4 py-3 rounded-lg hover:bg-secondary transition-colors">
                  <span className="text-sm">Schedule Team Check-in</span>
                  <ArrowRight size={16} />
                </button>

                <button className="w-full text-left flex items-center justify-between px-4 py-3 rounded-lg hover:bg-secondary transition-colors">
                  <span className="text-sm">Review Pending Leaves</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
