import React, { useState } from 'react'
import { useNavigate } from 'react-router';
function EmployeeList() {
    // Dummy data for employees
    const employees = [
        { id: 1, name: 'John Doe', position: 'Software Engineer' },
        { id: 2, name: 'Jane Smith', position: 'Product Manager' },
        { id: 3, name: 'Bob Johnson', position: 'UX Designer' },
        { id: 4, name: 'Alice Brown', position: 'Frontend Developer' },
        { id: 5, name: 'Charlie Davis', position: 'Backend Developer' },
      ];

    const [searchquery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const handleEmployeeClick = (id) => {
        navigate(`/HR/employee/${id}`);
      }
  return (
    <div  className='min-h-screen bg-gray-100 text-gray-900 overflow-x-hidden'>
      <input type="text"
      placeholder='Search by employee name/ID....'
      value={searchquery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className='w-full p-4 border h-12 border-gray-300 rounded-md m-4' />

        
       <ul className="w-full m-4 bg-white shadow-md rounded-lg">
       {employees.map((employee) => (
         <li key={employee.id} className="p-2 border-b border-gray-300 hover:bg-green-100 cursor-pointer"
         onClick={() => handleEmployeeClick(employee.id)}>
           <h2 className="text-lg font-semibold">{employee.name}</h2>
           <p className="text-sm text-gray-600">{employee.position}</p>
         </li>
       ))}
     </ul>
     
    </div>
  )
}

export default EmployeeList
