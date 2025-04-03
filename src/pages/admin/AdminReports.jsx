import React, { useState, useEffect } from "react";
import Layout from "../../components/employeeCompo/Layout";
import { useData } from "../../contexts/DataContext";
import VibeStatusBadge from "../../components/employeeCompo/VibeStatusBadge";
// import { users } from "../../data/mockData";
import { Link } from "react-router-dom";
import {
  User,
  Search,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Filter,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const AdminReports = () => {
  // const { vibes, leaves, activities, chatSessions } = useData();

  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [vibeFilter, setVibeFilter] = useState("all");
  // const [departmentFilter, setDepartmentFilter] = useState("all");
  // const [vibeFilter, setVibeFilter] = useState("all");
  // const [complianceFilter, setComplianceFilter] = useState("all");
  const [posts , setPosts] = useState([]);
  const [loading , setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const { token } = useAuth();

  // const [sortConfig, setSortConfig] = useState({
  //   key: "name",
  //   direction: "asc",
  // });

  // const departments = Array.from(
  //   new Set(
  //     users
  //       .filter((u) => u.role === "employee" && u.department)
  //       .map((u) => u.department),
  //   ),
  // );

  // useEffect(() => {
  //   const employeeUsers = users.filter((u) => u.role === "employee");

  //   const processedEmployees = employeeUsers.map((employee) => {
  //     const employeeVibes = vibes
  //       .filter((v) => v.employeeId === employee.employeeId)
  //       .sort((a, b) => new Date(b.date) - new Date(a.date));

  //     const latestVibe =
  //       employeeVibes.length > 0 ? employeeVibes[0].vibe : null;

  //     const now = new Date();
  //     const currentMonth = now.getMonth();
  //     const currentYear = now.getFullYear();

  //     const monthlyLeaves = leaves.filter((l) => {
  //       const leaveDate = new Date(l.startDate);
  //       return (
  //         l.employeeId === employee.employeeId &&
  //         leaveDate.getMonth() === currentMonth &&
  //         leaveDate.getFullYear() === currentYear
  //       );
  //     }).length;

  //     const completedMonthlyChat = chatSessions.some((session) => {
  //       const sessionDate = new Date(session.startTime);
  //       return (
  //         session.employeeId === employee.employeeId &&
  //         session.completed &&
  //         sessionDate.getMonth() === currentMonth &&
  //         sessionDate.getFullYear() === currentYear
  //       );
  //     });

  //     const employeeActivities = activities.filter(
  //       (a) => a.employeeId === employee.employeeId,
  //     );
  //     let activityLevel = "normal";
  //     if (employeeActivities.length > 0) {
  //       const avgActivity =
  //         employeeActivities.reduce(
  //           (sum, a) => sum + a.teamsMessages + a.emails + a.meetings,
  //           0,
  //         ) / employeeActivities.length;

  //       activityLevel =
  //         avgActivity < 10 ? "low" : avgActivity > 30 ? "high" : "normal";
  //     }

  //     const lastCheckIn = chatSessions
  //       .filter((session) => session.employeeId === employee.employeeId)
  //       .sort(
  //         (a, b) => new Date(b.startTime) - new Date(a.startTime),
  //       )[0]?.startTime;

  //     return {
  //       ...employee,
  //       latestVibe,
  //       monthlyLeaves,
  //       completedMonthlyChat,
  //       activityLevel,
  //       lastCheckIn,
  //     };
  //   });

  //   setEmployees(processedEmployees);
  // }, [users, vibes, leaves, activities, chatSessions]);

  // const sortedEmployees = [...employees].sort((a, b) => {
  //   if (sortConfig.key === "latestVibe") {
  //     const vibeValues = {
  //       frustrated: 1,
  //       sad: 2,
  //       okay: 3,
  //       happy: 4,
  //       excited: 5,
  //       null: 6,
  //     };
  //     return sortConfig.direction === "asc"
  //       ? vibeValues[a.latestVibe || "null"] -
  //           vibeValues[b.latestVibe || "null"]
  //       : vibeValues[b.latestVibe || "null"] -
  //           vibeValues[a.latestVibe || "null"];
  //   }

  //   if (sortConfig.key === "lastCheckIn") {
  //     const dateA = a.lastCheckIn ? new Date(a.lastCheckIn).getTime() : 0;
  //     const dateB = b.lastCheckIn ? new Date(b.lastCheckIn).getTime() : 0;
  //     return sortConfig.direction === "asc" ? dateA - dateB : dateB - dateA;
  //   }

  //   if (a[sortConfig.key] < b[sortConfig.key]) {
  //     return sortConfig.direction === "asc" ? -1 : 1;
  //   }
  //   if (a[sortConfig.key] > b[sortConfig.key]) {
  //     return sortConfig.direction === "asc" ? 1 : -1;
  //   }
  //   return 0;
  // });

  // const filteredEmployees = sortedEmployees.filter((employee) => {
  //   const matchesSearch =
  //     searchTerm === "" ||
  //     employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     (employee.department &&
  //       employee.department.toLowerCase().includes(searchTerm.toLowerCase()));

  //   const matchesDepartment =
  //     departmentFilter === "all" || employee.department === departmentFilter;
  //   const matchesVibe =
  //     vibeFilter === "all" || employee.latestVibe === vibeFilter;
  //   const matchesCompliance =
  //     complianceFilter === "all" ||
  //     (complianceFilter === "compliant" && employee.completedMonthlyChat) ||
  //     (complianceFilter === "non-compliant" && !employee.completedMonthlyChat);

  //   return (
  //     matchesSearch && matchesDepartment && matchesVibe && matchesCompliance
  //   );
  // });

  // const handleSort = (key) => {
  //   let direction = "asc";
  //   if (sortConfig.key === key && sortConfig.direction === "asc") {
  //     direction = "desc";
  //   }
  //   setSortConfig({ key, direction });
  // };

  // const getSortIcon = (key) => {
  //   if (sortConfig.key !== key) return null;
  //   return sortConfig.direction === "asc" ? (
  //     <ChevronUp size={16} />
  //   ) : (
  //     <ChevronDown size={16} />
  //   );
  // };

  useEffect (() => {
    const fetchPosts = async () => {
        setLoading (true);
        try {
            const response = await fetch("https://opensoft-25-backend.onrender.com/admin/employees/all" , 
              {
                headers: { Authorization: `Bearer ${token}` },
              },
            );
            const data = await response.json();
            // console.log("response" , data);
            setEmployees(data.users);
            // console.log("employee list" , data.users);
            setFilteredEmployees(data.users);
        } catch (error) {
            console.log("error in fetching employee list" , error);
        }finally {
          setLoading(false);
        }
    };
    fetchPosts();
}, [token]);

useEffect(() => {
  const filtered = employees?.filter((employee) => {
    const matchesSearch =
      searchTerm === "" ||
      (employee.name && employee.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (employee.employee_id && employee.employee_id.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (employee.department &&
        employee.department.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesVibe =
      vibeFilter === "all" || (employee.latestVibe === vibeFilter);

    return matchesSearch && matchesVibe;
  });

  // console.log("filtered" , filtered);
  setFilteredEmployees(filtered);
  setCurrentPage(1);
}, [searchTerm, vibeFilter, employees?.length]);

useEffect(() => {
  if (currentPage > Math.ceil(filteredEmployees?.length / postsPerPage)) {
    setCurrentPage(1);
  }
}, [filteredEmployees?.length]);


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredEmployees.slice(indexOfFirstPost, indexOfLastPost);

  // console.log("Current Posts" , currentPosts);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredEmployees?.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Layout>
      {/* <div className="page-container py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="page-header mb-2">Employee Reports</h1>
          <p className="text-muted-foreground">
            View and analyze detailed reports for all employees
          </p>
        </div>

        {/* Filters */}
        {/* <div
          className="neo-glass rounded-xl p-6 mb-8 animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                size={18}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, ID, or department..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 transition-all bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div> */}


            {/* <div className="flex flex-wrap gap-3">
              <div className="flex items-center">
                <Filter size={18} className="mr-2 text-muted-foreground dark:text-gray-500" /> */}
                {/* <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 transition-all appearance-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                >
                  <option value="all">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select> */}
              {/* </div> */}

              {/* <select
                value={vibeFilter}
                onChange={(e) => setVibeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 transition-all appearance-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              >
                <option value="all">All Vibes</option>
                <option value="frustrated">Frustrated</option>
                <option value="sad">Sad</option>
                <option value="okay">Okay</option>
                <option value="happy">Happy</option>
                <option value="excited">Excited</option>
              </select> */}

              {/* <select
                value={complianceFilter}
                onChange={(e) => setComplianceFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 transition-all appearance-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              >
                <option value="all">All Compliance</option>
                <option value="compliant">Compliant</option>
                <option value="non-compliant">Non-Compliant</option>
              </select> */}
            {/* </div> */}

          {/* </div>
        </div> */}

        {/* Table */}
        {/* <div
          className="neo-glass rounded-xl p-1 overflow-hidden animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left bg-secondary">
                  <th className="p-4 font-medium rounded-tl-lg"> */}
                    {/* <button
                      onClick={() => handleSort("name")}
                      className="flex items-center focus:outline-none"
                    >
                      Employee {getSortIcon("name")}
                    </button> */}
                    {/* Employee
                  </th> */}
                  {/* <th className="p-4 font-medium">Department</th> */}
                  {/* <th className="p-4 font-medium"> */}
                    {/* <button
                      onClick={() => handleSort("latestVibe")}
                      className="flex items-center focus:outline-none"
                    >
                      Current Vibe {getSortIcon("latestVibe")}
                    </button> */}
                    {/* Current Vibe */}
                  {/* </th> */}
                  {/* <th className="p-4 font-medium"> */}
                    {/* <button
                      onClick={() => handleSort("activityLevel")}
                      className="flex items-center focus:outline-none"
                    >
                      Activity {getSortIcon("activityLevel")}
                    </button> */}
                    {/* Activity */}
                  {/* </th>
                  <th className="p-4 font-medium"> */}
                    {/* <button
                      onClick={() => handleSort("monthlyLeaves")}
                      className="flex items-center focus:outline-none"
                    >
                      Leaves {getSortIcon("monthlyLeaves")}
                    </button> */}
                    {/* Leaves */}
                  {/* </th>
                  <th className="p-4 font-medium"> */}
                    {/* <button
                      onClick={() => handleSort("lastCheckIn")}
                      className="flex items-center focus:outline-none"
                    >
                      Last Check-in {getSortIcon("lastCheckIn")}
                    </button> */}
                    {/* Last Check-in
                  </th> */}
                  {/* <th className="p-4 font-medium">Compliance</th> */}
                  {/* <th className="p-4 font-medium rounded-tr-lg">Actions</th>
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
                    </td> */}
                    {/* <td className="p-4">{employee.department || "N/A"}</td> */}
                    {/* <td className="p-4">
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
                    </td> */}
                    {/* <td className="p-4">
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
                    </td> */}
                    {/* <td className="p-4">
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
        </div> */}
      {/* </div> */}

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
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                size={18}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, ID, or department..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 transition-all bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center">
                <Filter size={18} className="mr-2 text-muted-foreground dark:text-gray-500" />
                {/* Your existing department filter select */}
              </div>

              <select
                value={vibeFilter}
                onChange={(e) => setVibeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 transition-all appearance-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              >
                <option value="all">All Vibes</option>
                <option value="frustrated">Frustrated</option>
                <option value="sad">Sad</option>
                <option value="okay">Okay</option>
                <option value="happy">Happy</option>
                <option value="excited">Excited</option>
              </select>

              {/* Your existing compliance filter select */}
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
                    Employee
                  </th>
                  <th className="p-4 font-medium">
                    Current Vibe
                  </th>
                  <th className="p-4 font-medium">
                    Activity
                  </th>
                  <th className="p-4 font-medium">
                    Leaves
                  </th>
                  <th className="p-4 font-medium">
                    Last Check-in
                  </th>
                  <th className="p-4 font-medium rounded-tr-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center">
                      <div className="animate-pulse">Loading employees...</div>
                    </td>
                  </tr>
                ) : currentPosts.length > 0 ? (
                  currentPosts.map((employee) => (
                    <tr key={Date.now()} className="border-b border-border">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          {employee?.avatar ? (
                            <img
                              src={employee?.avatar}
                              alt={employee?.name}
                              className="h-10 w-10 rounded-full object-cover border border-border"
                            />
                          ) : (
                            <div className="h-10 w-10 bg-secondary rounded-full flex items-center justify-center">
                              <User size={16} className="text-muted-foreground" />
                            </div>
                          )}
                          <div>
                            <div className="font-medium">{employee?.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {employee?.employee_id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        {employee?.latestVibe ? (
                          <VibeStatusBadge vibe={employee?.latestVibe} />
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
                          {employee?.activityLevel
                            ? employee.activityLevel.charAt(0).toUpperCase() +
                              employee.activityLevel.slice(1)
                            : "Normal"}
                        </span>
                      </td>
                      <td className="p-4">{employee?.monthlyLeaves || 0}</td>
                      <td className="p-4">
                        {employee?.lastCheckIn
                          ? new Date(employee.lastCheckIn).toLocaleDateString()
                          : "Never"}
                      </td>
                      <td className="p-4">
                        <Link
                          to={`/admin/reports/${employee?.employee_id}`}
                          className="text-primary hover:underline flex items-center"
                        >
                          View details <ArrowRight size={16} className="ml-1" />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-8 text-center text-muted-foreground"
                    >
                      No employees found matching your filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {filteredEmployees?.length > 0 && (
            <div className="flex justify-between items-center px-4 py-3 bg-secondary rounded-b-lg">
              <div className="text-sm text-muted-foreground">
                Showing {indexOfFirstPost + 1} to {Math.min(indexOfLastPost, filteredEmployees.length)} of {filteredEmployees.length} employees
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-md ${
                    currentPage === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <ChevronLeft size={18} />
                </button>
                {[...Array(Math.ceil(filteredEmployees?.length / postsPerPage))].slice(
                  Math.max(0, currentPage - 3),
                  Math.min(Math.ceil(filteredEmployees?.length / postsPerPage), currentPage + 2)
                ).map((_, index) => {
                  const pageNumber = Math.max(1, currentPage - 2) + index;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => paginate(pageNumber)}
                      className={`w-8 h-8 rounded-md ${
                        currentPage === pageNumber
                          ? "bg-primary text-white"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                <button
                  onClick={nextPage}
                  disabled={currentPage === Math.ceil(filteredEmployees?.length / postsPerPage)}
                  className={`p-2 rounded-md ${
                    currentPage === Math.ceil(filteredEmployees?.length / postsPerPage)
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

    </Layout>
  );
};

export default AdminReports;
