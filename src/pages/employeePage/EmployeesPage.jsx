import React, { useState } from "react";

import { users } from "../../data/mockData";
import { Search } from "lucide-react";

const EmployeesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  const departments = Array.from(new Set(users.map((user) => user.department)));

  const filteredEmployees = users.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      departmentFilter === "all" || employee.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-4 dark:text-white">
          Employees
        </h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 outline-none transition-colors"
            />
          </div>

          {/* Department Filter */}
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 outline-none transition-colors"
          >
            <option value="all">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Employees Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                Employee ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                Department
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr
                key={employee.id}
                className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">
                  {employee.employeeId}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">
                  {employee.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">
                  {employee.department}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">
                  {employee.email}
                </td>
                <td className="px-6 py-4 text-sm">
                  <button
                    onClick={() => {
                      /* Handle view details */
                    }}
                    className="text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400 font-medium mr-4"
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      /* Handle edit */
                    }}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400 font-medium"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeesPage;
