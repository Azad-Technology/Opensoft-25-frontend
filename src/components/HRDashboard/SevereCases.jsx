// import React, { useState, useEffect } from "react";
// import {
//   User,
//   ChevronLeft,
//   ChevronRight,
//   ArrowRight,
//   AlertCircle
// } from "lucide-react";
// import { Link } from "react-router-dom";

// const SevereCases = ({ criticalCases }) => {
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [postsPerPage, setPostsPerPage] = useState(10);

//   useEffect(() => {
//     // Instead of fetching, use the criticalCases prop directly
//     setLoading(true);
//     try {
//       setFilteredEmployees(criticalCases || []);
//     } catch (error) {
//       console.log("Error processing critical cases:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [criticalCases]);

//   const getVibe = (vibeScore) => {
//     const vibes = {
//       1: { name: "Frustrated", color: "bg-red-500" },
//       2: { name: "Sad", color: "bg-orange-400" },
//       3: { name: "Okay", color: "bg-yellow-400" },
//       4: { name: "Happy", color: "bg-green-400" },
//       5: { name: "Excited", color: "bg-blue-500" }
//     };
//     return vibes[vibeScore] || { name: "Unknown", color: "bg-gray-400" };
//   };

//   const getRisk = (riskScore) => {
//     if(riskScore === 1){
//       return "Very Low";
//     }
//     else if(riskScore === 2){
//       return "Low";
//     }
//     else if(riskScore === 3){
//       return "Medium";
//     }
//     else if(riskScore === 4){
//       return "High";
//     }
//     else{
//       return "Urgent";
//     }
//   };

//   useEffect(() => {
//     if (currentPage > Math.ceil((filteredEmployees?.length || 0) / postsPerPage) && filteredEmployees?.length > 0) {
//       setCurrentPage(1);
//     }
//   }, [filteredEmployees?.length, currentPage, postsPerPage]);

//   const indexOfLastPost = currentPage * postsPerPage;
//   const indexOfFirstPost = indexOfLastPost - postsPerPage;
//   const currentPosts = filteredEmployees?.slice(indexOfFirstPost, indexOfLastPost) || [];

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const nextPage = () => {
//     if (currentPage < Math.ceil((filteredEmployees?.length || 0) / postsPerPage)) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   // Format date function
//   const formatDate = (dateString) => {
//     if (!dateString) return "Never";
//     const date = new Date(dateString);
//     return new Intl.DateTimeFormat('en-US', { 
//       month: 'short', 
//       day: 'numeric', 
//       year: 'numeric' 
//     }).format(date);
//   };

//   return (
//     <div className="page-container py-8">
//       <div
//         className="neo-glass rounded-xl overflow-hidden animate-fade-in shadow-sm"
//         style={{ animationDelay: "0.2s" }}
//       >
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="text-left bg-secondary">
//                 <th className="p-4 font-medium rounded-tl-lg">Employee</th>
//                 <th className="p-4 font-medium">Current Vibe</th>
//                 <th className="p-4 font-medium">Risk Level</th>
//                 <th className="p-4 font-medium">Last Check-in</th>
//                 <th className="p-4 font-medium rounded-tr-lg">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
//               {loading ? (
//                 <tr>
//                   <td colSpan={6} className="p-8 text-center">
//                     <div className="animate-pulse flex justify-center">
//                       <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
//                     </div>
//                   </td>
//                 </tr>
//               ) : currentPosts.length > 0 ? (
//                 currentPosts.map((employee, index) => (
//                   <tr 
//                     key={`${employee.employee_id}-${index}`} 
//                     className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
//                   >
//                     <td className="p-4">
//                       <div className="flex items-center space-x-3">
//                         {employee?.avatar ? (
//                           <img
//                             src={employee?.avatar}
//                             alt={employee?.name}
//                             className="h-10 w-10 rounded-full object-cover border border-border"
//                           />
//                         ) : (
//                           <div className="h-10 w-10 bg-secondary rounded-full flex items-center justify-center">
//                             <User size={16} className="text-muted-foreground" />
//                           </div>
//                         )}
//                         <div>
//                           <div className="font-medium">{employee?.name}</div>
//                           <div className="text-xs text-muted-foreground">
//                             {employee?.employee_id} · {employee?.department || "No Department"}
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="p-4">
//                       {employee.current_vibe && employee.current_vibe.score ? (
//                         <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getVibe(employee.current_vibe.score).color}`}>
//                           {getVibe(employee.current_vibe.score).name}
//                         </span>
//                       ) : (
//                         <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 py-1 px-2 rounded-full">
//                           No data
//                         </span>
//                       )}
//                     </td>
//                     <td className="p-4">
//                       {employee.risk_assessment ? (
//                         <span className={`px-3 py-1 rounded-full text-xs font-medium text-black`}>
//                           {getRisk(employee?.risk_assessment)}
//                         </span>
//                       ) : (
//                         <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 py-1 px-2 rounded-full">
//                           Not Available
//                         </span>
//                       )}
//                     </td>
//                     <td className="p-4">
//                       <span className="text-sm">
//                         {formatDate(employee?.current_vibe?.last_check_in)}
//                       </span>
//                     </td>
//                     <td className="p-4">
//                       <Link
//                         to={`/admin/reports/${employee?.employee_id}`}
//                         className="text-primary hover:bg-primary/10 hover:underline flex items-center px-3 py-1 rounded-lg"
//                       >
//                         View details <ArrowRight size={16} className="ml-1" />
//                       </Link>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan={6}
//                     className="p-8 text-center text-muted-foreground"
//                   >
//                     No employees found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {filteredEmployees?.length > 0 && (
//           <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 py-4 bg-secondary">
//             <div className="text-sm text-muted-foreground">
//               Showing <span className="font-medium">{indexOfFirstPost + 1}</span> to{" "}
//               <span className="font-medium">{Math.min(indexOfLastPost, filteredEmployees.length)}</span> of{" "}
//               <span className="font-medium">{filteredEmployees.length}</span> employees
//             </div>
            
//             <div className="flex items-center">
//               <button
//                 onClick={prevPage}
//                 disabled={currentPage === 1}
//                 className={`flex items-center justify-center w-8 h-8 rounded-md ${
//                   currentPage === 1
//                     ? "text-gray-400 cursor-not-allowed"
//                     : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
//                 }`}
//               >
//                 <ChevronLeft size={16} />
//               </button>
              
//               <div className="flex space-x-1 mx-1">
//                 {(() => {
//                   const totalPages = Math.ceil((filteredEmployees?.length || 0) / postsPerPage);
//                   const pageNumbers = [];
                  
//                   // Always show first page
//                   if (totalPages > 0) {
//                     if (currentPage > 3) {
//                       pageNumbers.push(
//                         <button
//                           key={1}
//                           onClick={() => paginate(1)}
//                           className="w-8 h-8 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
//                         >
//                           1
//                         </button>
//                       );
                      
//                       if (currentPage > 4) {
//                         pageNumbers.push(
//                           <span key="ellipsis1" className="flex items-center justify-center w-8 h-8">
//                             ...
//                           </span>
//                         );
//                       }
//                     }
//                   }
                  
//                   // Current page neighborhood
//                   for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
//                     pageNumbers.push(
//                       <button
//                         key={i}
//                         onClick={() => paginate(i)}
//                         className={`w-8 h-8 rounded-md ${
//                           currentPage === i
//                             ? "bg-green-500 text-white"
//                             : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
//                         }`}
//                       >
//                         {i}
//                       </button>
//                     );
//                   }
                  
                 
//                   if (totalPages > 0) {
//                     if (currentPage < totalPages - 2) {
//                       if (currentPage < totalPages - 3) {
//                         pageNumbers.push(
//                           <span key="ellipsis2" className="flex items-center justify-center w-8 h-8">
//                             ...
//                           </span>
//                         );
//                       }
                      
//                       pageNumbers.push(
//                         <button
//                           key={totalPages}
//                           onClick={() => paginate(totalPages)}
//                           className="w-8 h-8 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
//                         >
//                           {totalPages}
//                         </button>
//                       );
//                     }
//                   }
                  
//                   return pageNumbers;
//                 })()}
//               </div>
              
//               <button
//                 onClick={nextPage}
//                 disabled={currentPage === Math.ceil((filteredEmployees?.length || 0) / postsPerPage)}
//                 className={`flex items-center justify-center w-8 h-8 rounded-md ${
//                   currentPage === Math.ceil((filteredEmployees?.length || 0) / postsPerPage)
//                     ? "text-gray-400 cursor-not-allowed"
//                     : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
//                 }`}
//               >
//                 <ChevronRight size={16} />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SevereCases;

import React, { useState, useEffect } from "react";
import {
  User,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  AlertCircle,
  Search,
  Filter
} from "lucide-react";
import { Link } from "react-router-dom";

const SevereCases = ({ criticalCases }) => {
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [vibeFilter, setVibeFilter] = useState("");
  const [riskFilter, setRiskFilter] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    // Use the criticalCases prop directly
    setLoading(true);
    try {
      setAllEmployees(criticalCases || []);
      setFilteredEmployees(criticalCases || []);
    } catch (error) {
      console.log("Error processing critical cases:", error);
    } finally {
      setLoading(false);
    }
  }, [criticalCases]);

  // Apply filters whenever search term or filters change
  useEffect(() => {
    let result = [...allEmployees];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(employee => 
        employee?.name?.toLowerCase().includes(term) || 
        employee?.employee_id?.toLowerCase().includes(term)
      );
    }
    
    // Apply vibe filter
    if (vibeFilter) {
      result = result.filter(employee => {
        const vibeScore = employee?.current_vibe?.score;
        if (vibeFilter === "1") return vibeScore === 1;
        if (vibeFilter === "2") return vibeScore === 2;
        if (vibeFilter === "3") return vibeScore === 3;
        if (vibeFilter === "4") return vibeScore === 4;
        if (vibeFilter === "5") return vibeScore === 5;
        return true;
      });
    }
    
    // Apply risk filter
    if (riskFilter) {
      result = result.filter(employee => {
        const riskScore = employee?.risk_assessment;
        return riskScore === parseInt(riskFilter);
      });
    }
    
    setFilteredEmployees(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, vibeFilter, riskFilter, allEmployees]);

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
    if(riskScore === 1){
      return "Very Low";
    }
    else if(riskScore === 2){
      return "Low";
    }
    else if(riskScore === 3){
      return "Medium";
    }
    else if(riskScore === 4){
      return "High";
    }
    else{
      return "Urgent";
    }
  };

  useEffect(() => {
    if (currentPage > Math.ceil((filteredEmployees?.length || 0) / postsPerPage) && filteredEmployees?.length > 0) {
      setCurrentPage(1);
    }
  }, [filteredEmployees?.length, currentPage, postsPerPage]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredEmployees?.slice(indexOfFirstPost, indexOfLastPost) || [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < Math.ceil((filteredEmployees?.length || 0) / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setVibeFilter("");
    setRiskFilter("");
    setIsFilterOpen(false);
  };

  return (
    <div className="page-container py-4 md:py-8">
      {/* Search and Filter Bar */}
      <div className="mb-4 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center px-4 py-2 bg-secondary hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
          >
            <Filter size={16} className="mr-2" />
            <span>Filters</span>
          </button>
          
          {(searchTerm || vibeFilter || riskFilter) && (
            <button 
              onClick={clearFilters}
              className="px-4 py-2 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 hover:bg-red-200 dark:hover:bg-red-800 rounded-lg text-sm"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>
      
      {/* Filter Panel */}
      {isFilterOpen && (
        <div className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Vibe Filter</label>
              <select
                value={vibeFilter}
                onChange={(e) => setVibeFilter(e.target.value)}
                className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
              >
                <option value="">All Vibes</option>
                <option value="1">Frustrated</option>
                <option value="2">Sad</option>
                <option value="3">Okay</option>
                <option value="4">Happy</option>
                <option value="5">Excited</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Risk Level</label>
              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
              >
                <option value="">All Risk Levels</option>
                <option value="1">Very Low</option>
                <option value="2">Low</option>
                <option value="3">Medium</option>
                <option value="4">High</option>
                <option value="5">Urgent</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Main Table */}
      <div
        className="neo-glass rounded-xl overflow-hidden animate-fade-in shadow-sm"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left bg-secondary">
                <th className="p-4 font-medium rounded-tl-lg">Employee</th>
                <th className="p-4 font-medium hidden sm:table-cell">Current Vibe</th>
                <th className="p-4 font-medium hidden md:table-cell">Risk Level</th>
                <th className="p-4 font-medium hidden lg:table-cell">Last Check-in</th>
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
                          {/* Mobile-only info */}
                          <div className="flex flex-wrap gap-2 mt-1 sm:hidden">
                            {employee.current_vibe && employee.current_vibe.score && (
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium text-white ${getVibe(employee.current_vibe.score).color}`}>
                                {getVibe(employee.current_vibe.score).name}
                              </span>
                            )}
                            {employee.risk_assessment && (
                              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-200 dark:bg-gray-700">
                                {getRisk(employee?.risk_assessment)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      {employee.current_vibe && employee.current_vibe.score ? (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getVibe(employee.current_vibe.score).color}`}>
                          {getVibe(employee.current_vibe.score).name}
                        </span>
                      ) : (
                        <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 py-1 px-2 rounded-full">
                          No data
                        </span>
                      )}
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      {employee.risk_assessment ? (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium text-black`}>
                          {getRisk(employee?.risk_assessment)}
                        </span>
                      ) : (
                        <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 py-1 px-2 rounded-full">
                          Not Available
                        </span>
                      )}
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <span className="text-sm">
                        {formatDate(employee?.current_vibe?.last_check_in)}
                      </span>
                    </td>
                    <td className="p-4">
                      <Link
                        to={`/admin/reports/${employee?.employee_id}`}
                        className="text-primary hover:bg-primary/10 hover:underline flex items-center px-3 py-1 rounded-lg"
                      >
                        <span className="hidden sm:inline">View details</span>
                        <span className="sm:hidden">Details</span>
                        <ArrowRight size={16} className="ml-1" />
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
                    {searchTerm || vibeFilter || riskFilter ? 
                      "No employees match your filters" : 
                      "No employees found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredEmployees?.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 py-4 bg-secondary">
            <div className="text-sm text-muted-foreground order-2 sm:order-1">
              Showing <span className="font-medium">{indexOfFirstPost + 1}</span> to{" "}
              <span className="font-medium">{Math.min(indexOfLastPost, filteredEmployees.length)}</span> of{" "}
              <span className="font-medium">{filteredEmployees.length}</span> employees
            </div>
            
            <div className="flex items-center order-1 sm:order-2">
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
                  const totalPages = Math.ceil((filteredEmployees?.length || 0) / postsPerPage);
                  const pageNumbers = [];
                  
                  // Always show first page
                  if (totalPages > 0) {
                    if (currentPage > 3) {
                      pageNumbers.push(
                        <button
                          key={1}
                          onClick={() => paginate(1)}
                          className="w-8 h-8 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                          1
                        </button>
                      );
                      
                      if (currentPage > 4) {
                        pageNumbers.push(
                          <span key="ellipsis1" className="flex items-center justify-center w-8 h-8">
                            ...
                          </span>
                        );
                      }
                    }
                  }
                  
                  // Current page neighborhood
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
                  
                  // Always show last page
                  if (totalPages > 0) {
                    if (currentPage < totalPages - 2) {
                      if (currentPage < totalPages - 3) {
                        pageNumbers.push(
                          <span key="ellipsis2" className="flex items-center justify-center w-8 h-8">
                            ...
                          </span>
                        );
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
                  }
                  
                  return pageNumbers;
                })()}
              </div>
              
              <button
                onClick={nextPage}
                disabled={currentPage === Math.ceil((filteredEmployees?.length || 0) / postsPerPage)}
                className={`flex items-center justify-center w-8 h-8 rounded-md ${
                  currentPage === Math.ceil((filteredEmployees?.length || 0) / postsPerPage)
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