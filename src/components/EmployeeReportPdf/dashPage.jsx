import React from "react"
import Layout from "../employeeCompo/Layout"
import EmployeeReportGenerator from "./Report"
import { useReport } from "../../contexts/ReportContext"

const EmployeeReportPage = () => {
  const {resultSummary, setResultSummary} = useReport();
  return (
    <Layout>
      <div className="page-container py-8">
        <div className="mb-8">
          <h1 className="page-header mb-2 text-black dark:text-white">Employee Performance Report</h1>
          <p className="text-muted-foreground">
            Generate and download a comprehensive PDF report of employee performance
          </p>
        </div>

        <EmployeeReportGenerator employeeData={resultSummary} />
      </div>
    </Layout>
  )
}

export default EmployeeReportPage


