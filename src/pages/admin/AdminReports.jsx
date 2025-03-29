import React, { useState, useEffect } from "react";
import Layout from "../../components/employeeCompo/Layout";
import { useData } from "../../contexts/DataContext";
import VibeStatusBadge from "../../components/employeeCompo/VibeStatusBadge";
import { users } from "../../data/mockData";
import { Link } from "react-router-dom";
import {
  User,
  Search,
  ChevronDown,
  ChevronUp,
  Filter,
  ArrowRight,
} from "lucide-react";

const AdminReports = () => {
  const { vibes, leaves, activities, chatSessions } = useData();

  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [vibeFilter, setVibeFilter] = useState("all");
  const [complianceFilter, setComplianceFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });

  const departments = Array.from(
    new Set(
      users
        .filter((u) => u.role === "employee" && u.department)
        .map((u) => u.department),
    ),
  );

  useEffect(() => {
    const employeeUsers = users.filter((u) => u.role === "employee");

    const processedEmployees = employeeUsers.map((employee) => {
      const employeeVibes = vibes
        .filter((v) => v.employeeId === employee.employeeId)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      const latestVibe =
        employeeVibes.length > 0 ? employeeVibes[0].vibe : null;

      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      const monthlyLeaves = leaves.filter((l) => {
        const leaveDate = new Date(l.startDate);
        return (
          l.employeeId === employee.employeeId &&
          leaveDate.getMonth() === currentMonth &&
          leaveDate.getFullYear() === currentYear
        );
      }).length;

      const completedMonthlyChat = chatSessions.some((session) => {
        const sessionDate = new Date(session.startTime);
        return (
          session.employeeId === employee.employeeId &&
          session.completed &&
          sessionDate.getMonth() === currentMonth &&
          sessionDate.getFullYear() === currentYear
        );
      });

      const employeeActivities = activities.filter(
        (a) => a.employeeId === employee.employeeId,
      );
      let activityLevel = "normal";
      if (employeeActivities.length > 0) {
        const avgActivity =
          employeeActivities.reduce(
            (sum, a) => sum + a.teamsMessages + a.emails + a.meetings,
            0,
          ) / employeeActivities.length;

        activityLevel =
          avgActivity < 10 ? "low" : avgActivity > 30 ? "high" : "normal";
      }

      const lastCheckIn = chatSessions
        .filter((session) => session.employeeId === employee.employeeId)
        .sort(
          (a, b) => new Date(b.startTime) - new Date(a.startTime),
        )[0]?.startTime;

      return {
        ...employee,
        latestVibe,
        monthlyLeaves,
        completedMonthlyChat,
        activityLevel,
        lastCheckIn,
      };
    });

    setEmployees(processedEmployees);
  }, [users, vibes, leaves, activities, chatSessions]);

  const sortedEmployees = [...employees].sort((a, b) => {
    if (sortConfig.key === "latestVibe") {
      const vibeValues = {
        frustrated: 1,
        sad: 2,
        okay: 3,
        happy: 4,
        excited: 5,
        null: 6,
      };
      return sortConfig.direction === "asc"
        ? vibeValues[a.latestVibe || "null"] -
            vibeValues[b.latestVibe || "null"]
        : vibeValues[b.latestVibe || "null"] -
            vibeValues[a.latestVibe || "null"];
    }

    if (sortConfig.key === "lastCheckIn") {
      const dateA = a.lastCheckIn ? new Date(a.lastCheckIn).getTime() : 0;
      const dateB = b.lastCheckIn ? new Date(b.lastCheckIn).getTime() : 0;
      return sortConfig.direction === "asc" ? dateA - dateB : dateB - dateA;
    }

    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const filteredEmployees = sortedEmployees.filter((employee) => {
    const matchesSearch =
      searchTerm === "" ||
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (employee.department &&
        employee.department.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDepartment =
      departmentFilter === "all" || employee.department === departmentFilter;
    const matchesVibe =
      vibeFilter === "all" || employee.latestVibe === vibeFilter;
    const matchesCompliance =
      complianceFilter === "all" ||
      (complianceFilter === "compliant" && employee.completedMonthlyChat) ||
      (complianceFilter === "non-compliant" && !employee.completedMonthlyChat);

    return (
      matchesSearch && matchesDepartment && matchesVibe && matchesCompliance
    );
  });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <ChevronUp size={16} />
    ) : (
      <ChevronDown size={16} />
    );
  };

  return (
    <Layout>
      <div className="page-container py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="page-header mb-2">Employee Reports</h1>
          <p className="text-muted-foreground">
            View and analyze detailed reports for all employees
          </p>
        </div>

        {/* Filters */}
        <div
          className="neo-glass rounded-xl p-6 mb-8 animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={18}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, ID, or department..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center">
                <Filter size={18} className="mr-2 text-muted-foreground" />
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none bg-white"
                >
                  <option value="all">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <select
                value={vibeFilter}
                onChange={(e) => setVibeFilter(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none bg-white"
              >
                <option value="all">All Vibes</option>
                <option value="frustrated">Frustrated</option>
                <option value="sad">Sad</option>
                <option value="okay">Okay</option>
                <option value="happy">Happy</option>
                <option value="excited">Excited</option>
              </select>

              <select
                value={complianceFilter}
                onChange={(e) => setComplianceFilter(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none bg-white"
              >
                <option value="all">All Compliance</option>
                <option value="compliant">Compliant</option>
                <option value="non-compliant">Non-Compliant</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div
          className="neo-glass rounded-xl p-1 overflow-hidden animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left bg-secondary">
                  <th className="p-4 font-medium rounded-tl-lg">
                    <button
                      onClick={() => handleSort("name")}
                      className="flex items-center focus:outline-none"
                    >
                      Employee {getSortIcon("name")}
                    </button>
                  </th>
                  <th className="p-4 font-medium">Department</th>
                  <th className="p-4 font-medium">
                    <button
                      onClick={() => handleSort("latestVibe")}
                      className="flex items-center focus:outline-none"
                    >
                      Current Vibe {getSortIcon("latestVibe")}
                    </button>
                  </th>
                  <th className="p-4 font-medium">
                    <button
                      onClick={() => handleSort("activityLevel")}
                      className="flex items-center focus:outline-none"
                    >
                      Activity {getSortIcon("activityLevel")}
                    </button>
                  </th>
                  <th className="p-4 font-medium">
                    <button
                      onClick={() => handleSort("monthlyLeaves")}
                      className="flex items-center focus:outline-none"
                    >
                      Leaves {getSortIcon("monthlyLeaves")}
                    </button>
                  </th>
                  <th className="p-4 font-medium">
                    <button
                      onClick={() => handleSort("lastCheckIn")}
                      className="flex items-center focus:outline-none"
                    >
                      Last Check-in {getSortIcon("lastCheckIn")}
                    </button>
                  </th>
                  <th className="p-4 font-medium">Compliance</th>
                  <th className="p-4 font-medium rounded-tr-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="border-b border-border">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        {employee.avatar ? (
                          <img
                            src={employee.avatar}
                            alt={employee.name}
                            className="h-10 w-10 rounded-full object-cover border border-border"
                          />
                        ) : (
                          <div className="h-10 w-10 bg-secondary rounded-full flex items-center justify-center">
                            <User size={16} className="text-muted-foreground" />
                          </div>
                        )}
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {employee.employeeId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">{employee.department || "N/A"}</td>
                    <td className="p-4">
                      {employee.latestVibe ? (
                        <VibeStatusBadge vibe={employee.latestVibe} />
                      ) : (
                        <span className="text-muted-foreground text-sm">
                          No data
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          employee.activityLevel === "high"
                            ? "bg-yellow-100 text-yellow-800"
                            : employee.activityLevel === "low"
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {employee.activityLevel.charAt(0).toUpperCase() +
                          employee.activityLevel.slice(1)}
                      </span>
                    </td>
                    <td className="p-4">{employee.monthlyLeaves}</td>
                    <td className="p-4">
                      {employee.lastCheckIn
                        ? new Date(employee.lastCheckIn).toLocaleDateString()
                        : "Never"}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          employee.completedMonthlyChat
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {employee.completedMonthlyChat
                          ? "Compliant"
                          : "Non-compliant"}
                      </span>
                    </td>
                    <td className="p-4">
                      <Link
                        to={`/admin/reports/${employee.employeeId}`}
                        className="text-primary hover:underline flex items-center"
                      >
                        View details <ArrowRight size={16} className="ml-1" />
                      </Link>
                    </td>
                  </tr>
                ))}
                {filteredEmployees.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="p-8 text-center text-muted-foreground"
                    >
                      No employees found matching your filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminReports;
