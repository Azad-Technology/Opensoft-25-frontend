import React, { useState, useEffect, useCallback } from "react";
import Layout from "../../components/employeeCompo/Layout";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import {
  User,
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  AlertCircle,
  ChevronDown,
  X,
} from "lucide-react";
import debounce from "lodash/debounce";

const AdminReports = () => {
  const VITE_REACT_APP_URL = import.meta.env.VITE_REACT_APP_URL;
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [vibeFilter, setVibeFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const { token } = useAuth();

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${VITE_REACT_APP_URL}/admin/employees/all`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const data = await response.json();
        setEmployees(data.users);
        setFilteredEmployees(data.users);
      } catch (error) {
        console.error("Error fetching employee list:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, [token, VITE_REACT_APP_URL]);

  const getVibe = (vibeScore) => {
    const vibes = {
      1: { name: "Frustrated", color: "bg-red-500" },
      2: { name: "Sad", color: "bg-orange-400" },
      3: { name: "Okay", color: "bg-yellow-400" },
      4: { name: "Happy", color: "bg-green-400" },
      5: { name: "Excited", color: "bg-blue-500" },
    };
    return vibes[vibeScore] || { name: "Unknown", color: "bg-gray-400" };
  };

  const getRisk = (riskScore) => {
    const risks = {
      1: { name: "Very Low", color: "bg-blue-500" },
      2: { name: "Low", color: "bg-green-400" },
      3: { name: "Medium", color: "bg-yellow-400" },
      4: { name: "High", color: "bg-orange-400" },
      5: { name: "Urgent", color: "bg-red-500" },
    };
    return risks[riskScore] || { name: "Unknown", color: "bg-gray-400" };
  };

  const debouncedSearch = useCallback(
    debounce((term) => {
      setSearchTerm(term);
    }, 300),
    [],
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    e.target.value = value;
    debouncedSearch(value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    const searchInput = document.getElementById("employee-search");
    if (searchInput) {
      searchInput.value = "";
    }
  };

  useEffect(() => {
    const filtered = employees?.filter((employee) => {
      const matchesSearch =
        searchTerm === "" ||
        (employee.name &&
          employee.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (employee.employee_id &&
          employee.employee_id
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (employee.department &&
          employee.department.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesVibe =
        vibeFilter === "all" ||
        (employee.current_vibe &&
          getVibe(employee.current_vibe.score).name === vibeFilter);

      const matchesRisk =
        riskFilter === "all" ||
        getRisk(employee.risk_assessment).name === riskFilter;

      return matchesSearch && matchesVibe && matchesRisk;
    });

    setFilteredEmployees(filtered || []);
    setCurrentPage(1);
  }, [searchTerm, vibeFilter, riskFilter, employees]);

  useEffect(() => {
    if (
      currentPage >
        Math.ceil((filteredEmployees?.length || 0) / postsPerPage) &&
      filteredEmployees?.length > 0
    ) {
      setCurrentPage(1);
    }
  }, [filteredEmployees?.length, currentPage, postsPerPage]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts =
    filteredEmployees?.slice(indexOfFirstPost, indexOfLastPost) || [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (
      currentPage < Math.ceil((filteredEmployees?.length || 0) / postsPerPage)
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
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
          className="neo-glass rounded-xl p-6 mb-8 animate-fade-in shadow-sm"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-grow">
              <div className="relative flex items-center">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <Search className="h-4 w-4" />
                </div>
                <input
                  id="employee-search"
                  type="text"
                  placeholder="Search by name or employee ID..."
                  className="pl-10 pr-10 py-2 w-full border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 transition-all bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                  onChange={handleSearchChange}
                  defaultValue={searchTerm}
                />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <select
                  value={vibeFilter}
                  onChange={(e) => setVibeFilter(e.target.value)}
                  className="pl-3 pr-8 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 transition-all appearance-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                >
                  <option value="all">All Vibes</option>
                  <option value="Frustrated">Frustrated</option>
                  <option value="Sad">Sad</option>
                  <option value="Okay">Okay</option>
                  <option value="Happy">Happy</option>
                  <option value="Excited">Excited</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </div>
              </div>

              <div className="relative">
                <select
                  value={riskFilter}
                  onChange={(e) => setRiskFilter(e.target.value)}
                  className="pl-3 pr-8 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 transition-all appearance-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                >
                  <option value="all">All Risk</option>
                  <option value="Very Low">Very Low</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="neo-glass rounded-xl overflow-hidden animate-fade-in shadow-sm"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left bg-secondary">
                  <th className="p-4 font-medium rounded-tl-lg">Employee</th>
                  <th className="p-4 font-medium">Current Vibe</th>
                  <th className="p-4 font-medium">Risk Level</th>
                  <th className="p-4 font-medium">Performance Rating</th>
                  <th className="p-4 font-medium">Last Check-in</th>
                  <th className="p-4 font-medium rounded-tr-lg">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center">
                      <div className="animate-pulse flex justify-center">
                        <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      </div>
                    </td>
                  </tr>
                ) : currentPosts.length > 0 ? (
                  currentPosts.map((employee, index) => (
                    <tr
                      key={`${employee.employee_id}-${index}`}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
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
                              <User
                                size={16}
                                className="text-muted-foreground"
                              />
                            </div>
                          )}
                          <div>
                            <div className="font-medium">{employee?.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {employee?.employee_id} ·{" "}
                              {employee?.department || "No Department"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        {employee.current_vibe &&
                        employee.current_vibe.score ? (
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getVibe(employee.current_vibe.score).color}`}
                          >
                            {getVibe(employee.current_vibe.score).name}
                          </span>
                        ) : (
                          <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 py-1 px-2 rounded-full">
                            No data
                          </span>
                        )}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        {employee.risk_assessment ? (
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium  text-white ${getRisk(employee.risk_assessment).color}
                          }`}
                          >
                            {getRisk(employee.risk_assessment).name}
                          </span>
                        ) : (
                          <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 py-1 px-2 rounded-full">
                            Not Available
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        <span className="bg-secondary text-gray-700 dark:text-gray-300 py-1 px-2 rounded text-xs">
                          {employee?.performance?.rating || 0} / 5
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-sm">
                          {formatDate(employee?.current_vibe?.last_check_in)}
                        </span>
                      </td>
                      <td className="p-4">
                        <Link
                          to={`/admin/reports/${employee?.employee_id}`}
                          className="text-primary hover:bg-primary/10 hover:underline flex items-center px-3 py-1 rounded-lg"
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
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 py-4 bg-secondary">
              <div className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-medium">{indexOfFirstPost + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastPost, filteredEmployees.length)}
                </span>{" "}
                of{" "}
                <span className="font-medium">{filteredEmployees.length}</span>{" "}
                employees
              </div>

              <div className="flex items-center">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`flex items-center justify-center w-8 h-8 rounded-md ${
                    currentPage === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <ChevronLeft size={16} />
                </button>

                <div className="flex space-x-1 mx-1">
                  {(() => {
                    const totalPages = Math.ceil(
                      (filteredEmployees?.length || 0) / postsPerPage,
                    );
                    const pageNumbers = [];

                    if (totalPages > 0) {
                      if (currentPage > 3) {
                        pageNumbers.push(
                          <button
                            key={1}
                            onClick={() => paginate(1)}
                            className="w-8 h-8 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                          >
                            1
                          </button>,
                        );

                        if (currentPage > 4) {
                          pageNumbers.push(
                            <span
                              key="ellipsis1"
                              className="flex items-center justify-center w-8 h-8"
                            >
                              ...
                            </span>,
                          );
                        }
                      }
                    }

                    for (
                      let i = Math.max(1, currentPage - 1);
                      i <= Math.min(totalPages, currentPage + 1);
                      i++
                    ) {
                      pageNumbers.push(
                        <button
                          key={i}
                          onClick={() => paginate(i)}
                          className={`w-8 h-8 rounded-md ${
                            currentPage === i
                              ? "bg-green-500 text-white"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                          }`}
                        >
                          {i}
                        </button>,
                      );
                    }

                    if (totalPages > 0) {
                      if (currentPage < totalPages - 2) {
                        if (currentPage < totalPages - 3) {
                          pageNumbers.push(
                            <span
                              key="ellipsis2"
                              className="flex items-center justify-center w-8 h-8"
                            >
                              ...
                            </span>,
                          );
                        }

                        pageNumbers.push(
                          <button
                            key={totalPages}
                            onClick={() => paginate(totalPages)}
                            className="w-8 h-8 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                          >
                            {totalPages}
                          </button>,
                        );
                      }
                    }

                    return pageNumbers;
                  })()}
                </div>

                <button
                  onClick={nextPage}
                  disabled={
                    currentPage ===
                    Math.ceil((filteredEmployees?.length || 0) / postsPerPage)
                  }
                  className={`flex items-center justify-center w-8 h-8 rounded-md ${
                    currentPage ===
                    Math.ceil((filteredEmployees?.length || 0) / postsPerPage)
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <ChevronRight size={16} />
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
