import React from "react"
import Layout from "../employeeCompo/Layout"
import EmployeeReportGenerator from "./Report"

const EmployeeReportPage = () => {
  // Sample data - in a real app, you would fetch this from your API or context
  const employeeData = {
    user: {
      name: "John Doe",
      position: "Senior Software Engineer",
      employeeId: "EMP-2023-001",
      department: "Engineering",
      email: "john.doe@company.com",
    },
    userVibes: [
      { id: 1, date: "2024-03-25", vibe: "happy" },
      { id: 2, date: "2024-03-26", vibe: "sad" },
      { id: 3, date: "2024-03-27", vibe: "frustrated" },
      { id: 4, date: "2024-03-28", vibe: "excited" },
      { id: 5, date: "2024-03-29", vibe: "okay" },
      { id: 6, date: "2024-03-30", vibe: "happy" },
      { id: 7, date: "2024-03-31", vibe: "happy" },
      { id: 8, date: "2024-04-1", vibe: "frustrated" },
      { id: 9, date: "2024-04-2", vibe: "excited" },
      { id: 10, date: "2024-04-3", vibe: "sad" },
      { id: 11, date: "2024-04-4", vibe: "okay" },
    ],
    userActivities: [
      {
        date: "2024-03-25",
        teamsMessages: 15,
        emails: 8,
        meetings: 2,
      },
      {
        date: "2024-03-26",
        teamsMessages: 20,
        emails: 5,
        meetings: 3,
      },
      {
        date: "2024-03-27",
        teamsMessages: 12,
        emails: 10,
        meetings: 1,
      },
      {
        date: "2024-03-28",
        teamsMessages: 18,
        emails: 6,
        meetings: 4,
      },
      {
        date: "2024-03-29",
        teamsMessages: 25,
        emails: 12,
        meetings: 5,
      },
    ],
    userLeaves: [
      {
        id: 1,
        startDate: "2024-03-10",
        endDate: "2024-03-12",
        reason: "Medical leave due to illness",
        status: "approved",
      },
      {
        id: 2,
        startDate: "2024-03-20",
        endDate: "2024-03-22",
        reason: "Family function",
        status: "pending",
      },
      {
        id: 3,
        startDate: "2024-04-05",
        endDate: "2024-04-06",
        reason: "Personal work",
        status: "rejected",
      },
      {
        id: 4,
        startDate: "2024-04-15",
        endDate: "2024-04-18",
        reason: "Vacation",
        status: "approved",
      },
      {
        id: 5,
        startDate: "2024-05-01",
        endDate: "2024-05-02",
        reason: "Emergency leave",
        status: "pending",
      },
    ],
    userPerformance: {
      rating: 4.3,
      managerFeedback: "Great work on project execution and team collaboration.",
      strengths: ["Leadership", "Problem-Solving", "Time Management"],
      improvements: ["Communication", "Technical Documentation"],
    },
    userRecognitions: [
      {
        id: 1,
        type: "Employee of the Month",
        date: "2024-03-15",
        description: "Recognized for outstanding performance and dedication.",
        givenBy: "HR Department",
      },
      {
        id: 2,
        type: "Best Team Player",
        date: "2024-02-10",
        description: "Acknowledged for exceptional teamwork and collaboration.",
        givenBy: "Project Manager",
      },
    ],
    projectData: [
      {
        id: "1",
        name: "Website Redesign",
        priority: "high",
        status: "in-progress",
        startDate: "2024-03-01",
        endDate: "2024-04-15",
        progress: 65,
        assignees: ["Sarah J.", "Michael C."],
      },
      {
        id: "2",
        name: "Mobile App Development",
        priority: "medium",
        status: "not-started",
        startDate: "2024-04-01",
        endDate: "2024-06-30",
        progress: 0,
        assignees: ["Emily D.", "John S."],
      },
      {
        id: "3",
        name: "Data Migration",
        priority: "low",
        status: "completed",
        startDate: "2024-02-15",
        endDate: "2024-03-15",
        progress: 100,
        assignees: ["Robert K.", "Lisa M."],
      },
    ],
  }

  return (
    <Layout>
      <div className="page-container py-8">
        <div className="mb-8">
          <h1 className="page-header mb-2 text-black dark:text-white">Employee Performance Report</h1>
          <p className="text-muted-foreground">
            Generate and download a comprehensive PDF report of employee performance
          </p>
        </div>

        <EmployeeReportGenerator employeeData={employeeData} />
      </div>
    </Layout>
  )
}

export default EmployeeReportPage

