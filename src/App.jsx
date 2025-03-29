
import React from 'react'
import MainPage from './pages/HRDashboard/MainPage'
import EmployeePage from "./pages/HRDashboard/EmployeePage";
import EmployeeList from "./pages/HRDashboard/EmployeeList";
import { BrowserRouter, Routes, Route } from "react-router";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/HR/employee" element={<EmployeeList />} /> 
      <Route path="/HR/employee/:id" element={<EmployeePage />} />
    </Routes>
  </BrowserRouter>
  )
};

export default App;
