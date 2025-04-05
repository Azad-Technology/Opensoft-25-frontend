import React, { useState, useEffect } from "react";
import Layout from "../../components/employeeCompo/Layout";
import { useData } from "../../contexts/DataContext";
import VibeStatusBadge from "../../components/employeeCompo/VibeStatusBadge";
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

  const VITE_REACT_APP_URL = import.meta.env.VITE_REACT_APP_URL;
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [vibeFilter, setVibeFilter] = useState("all");
  const [riskFilter , setRiskFilter] = useState("all");
  const [posts , setPosts] = useState([]);
  const [loading , setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const { token } = useAuth();

  useEffect (() => {
    const fetchPosts = async () => {
        setLoading (true);
        try {
            const response = await fetch(`${VITE_REACT_APP_URL}/admin/employees/all` , 
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

let getVibe = (vibeScore) => {
  if(vibeScore === 1){
    return "Frustrated";
  }
  else if(vibeScore === 2){
    return "Sad";
  }
  else if(vibeScore === 3){
    return "Okay";
  }
  else if(vibeScore === 4){
    return "Happy";
  }
  else{
    return "Excited";
  }
}

let getRisk = (riskScore) => {
  if(riskScore === 1){
    return "Very Low";
  }
  else if(riskScore === 2){
    return "Low";
  }
  else if(riskScore === 3){
    return "Moderate";
  }
  else if(riskScore === 4){
    return "High";
  }
  else{
    return "Urgent";
  }
}

useEffect(() => {
  const filtered = employees?.filter((employee) => {
    const matchesSearch =
      searchTerm === "" ||
      (employee.name && employee.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (employee.employee_id && employee.employee_id.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (employee.department &&
        employee.department.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesVibe =
      vibeFilter === "all" || (getVibe(employee.current_vibe.score) === vibeFilter);

      const matchesRisk = 
      riskFilter === "all" || (getRisk(employee.risk_assessment) === riskFilter);

    return matchesSearch && matchesVibe && matchesRisk;
  });

  // console.log("filtered" , filtered);
  setFilteredEmployees(filtered);
  setCurrentPage(1);
}, [searchTerm, vibeFilter, employees , riskFilter]);

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

      <div className="page-container py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="page-header mb-2">Employee Reports</h1>
          <p className="text-muted-foreground">
            View and analyze detailed reports for all employees
          </p>
        </div>

        
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
                placeholder="Search by name or ID..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 transition-all bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                value={vibeFilter}
                onChange={(e) => setVibeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 transition-all appearance-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              >
                <option value="all">All Vibes</option>
                <option value="Frustrated">Frustrated</option>
                <option value="Sad">Sad</option>
                <option value="Okay">Okay</option>
                <option value="Happy">Happy</option>
                <option value="Excited">Excited</option>
              </select>
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 transition-all appearance-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              >
                <option value="all">All Risk</option>
                <option value="Very Low">Very Low</option>
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

          </div>
        </div>

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
                    Risk
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
                        {employee.current_vibe.score ? (
                          getVibe(employee.current_vibe.score)
                        ) : (
                          <span className="text-muted-foreground text-sm">
                            No data
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                          {employee.risk_assessment
                            ? getRisk(employee.risk_assessment)
                            : "Not Available"}
                      </td>
                      <td className="p-4">{employee?.monthlyLeaves || 0}</td>
                      <td className="p-4">
                        {employee.current_vibe.last_check_in
                          ? new Date(employee.current_vibe.last_check_in).toLocaleDateString()
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
                          ? "bg-green-400 text-white"
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
