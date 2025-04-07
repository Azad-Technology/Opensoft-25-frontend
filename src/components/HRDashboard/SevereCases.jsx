

import React, { useState, useEffect } from "react";
import {
  User,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Search
} from "lucide-react";
import { Link } from "react-router-dom";

const SevereCases = ({ criticalCases }) => {
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVibe, setSelectedVibe] = useState("");
  const [selectedRisk, setSelectedRisk] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  useEffect(() => {
    setLoading(true);
    try {
      setFilteredEmployees(criticalCases || []);
    } catch (error) {
      console.log("Error processing critical cases:", error);
    } finally {
      setLoading(false);
    }
  }, [criticalCases]);

  const getVibe = (vibeScore) => {
    const vibes = {
      1: { name: "Frustrated", color: "bg-red-500" },
      2: { name: "Sad", color: "bg-orange-400" },
      3: { name: "Okay", color: "bg-yellow-400" },
      4: { name: "Happy", color: "bg-green-400" },
      5: { name: "Excited", color: "bg-blue-500" }
    };
    return vibes[vibeScore] || { name: "Unknown", color: "bg-gray-400" };
  };

  const getRisk = (riskScore) => {
    if (riskScore === 1) return "Very Low";
    if (riskScore === 2) return "Low";
    if (riskScore === 3) return "Medium";
    if (riskScore === 4) return "High";
    return "Urgent";
  };

  useEffect(() => {
    if (
      currentPage > Math.ceil((filteredEmployees?.length || 0) / postsPerPage) &&
      filteredEmployees?.length > 0
    ) {
      setCurrentPage(1);
    }
  }, [filteredEmployees?.length, currentPage, postsPerPage]);

  const handleSearchFilter = () => {
    let filtered = criticalCases || [];

    if (searchTerm) {
      filtered = filtered.filter(
        (emp) =>
          emp.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.employee_id?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedVibe) {
      filtered = filtered.filter(
        (emp) => getVibe(emp?.current_vibe?.score).name === selectedVibe
      );
    }

    if (selectedRisk) {
      filtered = filtered.filter(
        (emp) => getRisk(emp?.risk_assessment) === selectedRisk
      );
    }

    return filtered;
  };

  const searchedEmployees = handleSearchFilter();
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = searchedEmployees?.slice(indexOfFirstPost, indexOfLastPost) || [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < Math.ceil((searchedEmployees?.length || 0) / postsPerPage)) {
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
      year: "numeric"
    }).format(date);
  };

  return (
    <div className="page-container py-8">
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
        <div className="relative col-span-1 sm:col-span-2">
          <input
            type="text"
            placeholder="Search by ID or Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg pr-10 dark:text-gray-100 dark:bg-gray-800"
          />
          <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />
        </div>
        <select
          className="px-3 py-2 border border-border rounded-lg dark:text-gray-100 dark:bg-gray-800"
          value={selectedVibe}
          onChange={(e) => setSelectedVibe(e.target.value)}
        >
          <option value="">All Vibes</option>
          <option value="Frustrated">Frustrated</option>
          <option value="Sad">Sad</option>
          <option value="Okay">Okay</option>
          <option value="Happy">Happy</option>
          <option value="Excited">Excited</option>
        </select>
        <select
          className="px-3 py-2 border border-border rounded-lg dark:text-gray-100 dark:bg-gray-800"
          value={selectedRisk}
          onChange={(e) => setSelectedRisk(e.target.value)}
        >
          <option value="">All Risk Levels</option>
          <option value="Very Low">Very Low</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Urgent">Urgent</option>
        </select>
      </div>

      <div className="neo-glass rounded-xl overflow-hidden animate-fade-in shadow-sm" style={{ animationDelay: "0.2s" }}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left bg-secondary">
                <th className="p-4 font-medium rounded-tl-lg">Employee</th>
                <th className="p-4 font-medium">Current Vibe</th>
                <th className="p-4 font-medium">Risk Level</th>
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
                            <User size={16} className="text-muted-foreground" />
                          </div>
                        )}
                        <div>
                          <div className="font-medium">{employee?.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {employee?.employee_id} · {employee?.department || "No Department"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      {employee.current_vibe?.score ? (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getVibe(employee.current_vibe.score).color}`}>
                          {getVibe(employee.current_vibe.score).name}
                        </span>
                      ) : (
                        <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 py-1 px-2 rounded-full">
                          No data
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      {employee.risk_assessment ? (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          employee.risk_assessment === 1
                            ? "bg-blue-500"
                            : employee.risk_assessment === 2
                            ? "bg-green-400"
                            : employee.risk_assessment === 3
                            ? "bg-yellow-400"
                            : employee.risk_assessment === 4
                            ? "bg-orange-400"
                            : employee.risk_assessment === 5
                            ? "bg-red-500"
                            : "bg-gray-400"
                        }`}>
                          {getRisk(employee?.risk_assessment)}
                        </span>
                      ) : (
                        <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 py-1 px-2 rounded-full">
                          Not Available
                        </span>
                      )}
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
                  <td colSpan={6} className="p-8 text-center text-muted-foreground">
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {searchedEmployees?.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 py-4 bg-secondary">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{indexOfFirstPost + 1}</span> to{" "}
              <span className="font-medium">{Math.min(indexOfLastPost, searchedEmployees.length)}</span> of{" "}
              <span className="font-medium">{searchedEmployees.length}</span> employees
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
                  const totalPages = Math.ceil((searchedEmployees?.length || 0) / postsPerPage);
                  const pageNumbers = [];

                  if (totalPages > 0) {
                    if (currentPage > 3) {
                      pageNumbers.push(
                        <button key={1} onClick={() => paginate(1)} className="w-8 h-8 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                          1
                        </button>
                      );
                      if (currentPage > 4) {
                        pageNumbers.push(<span key="ellipsis1" className="w-8 h-8 flex items-center justify-center">...</span>);
                      }
                    }
                  }

                  for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
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
                      </button>
                    );
                  }

                  if (totalPages > 0 && currentPage < totalPages - 2) {
                    if (currentPage < totalPages - 3) {
                      pageNumbers.push(<span key="ellipsis2" className="w-8 h-8 flex items-center justify-center">...</span>);
                    }
                    pageNumbers.push(
                      <button
                        key={totalPages}
                        onClick={() => paginate(totalPages)}
                        className="w-8 h-8 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        {totalPages}
                      </button>
                    );
                  }

                  return pageNumbers;
                })()}
              </div>

              <button
                onClick={nextPage}
                disabled={currentPage === Math.ceil((searchedEmployees?.length || 0) / postsPerPage)}
                className={`flex items-center justify-center w-8 h-8 rounded-md ${
                  currentPage === Math.ceil((searchedEmployees?.length || 0) / postsPerPage)
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
  );
};

export default SevereCases;
