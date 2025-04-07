import React from "react";
import { useParams } from "react-router-dom";
import EmployeeReport from "../../components/employeeCompo/EmployeeReport";
import Layout from "../../components/employeeCompo/Layout";

const AdminEmployeeReportPage = () => {
  const { month, year } = useParams();

  const sampleData = {
    leave: {
      score: 4.2,
      comment:
        "Excellent leave management with proper planning and communication",
      leaveDensity: 1.5,
      reasons: [
        "Annual family vacation (5 days)",
        "Professional development workshop (2 days)",
        "Medical appointment (1 day)",
      ],
    },
    interaction: {
      teamMessages: 245,
      meetingsAttended: 15,
      emails: 89,
    },
    experience: {
      onboardingFeedback:
        "Demonstrated exceptional adaptability and quick learning during the onboarding process",
      mentorAssigned: true,
      initialTraining: true,
    },
    performance: {
      rating: 4.5,
      workingHours: 8.2,
      awards: 2,
      managerFeedback:
        "Sarah consistently delivers high-quality work and demonstrates strong initiative in team projects. Her collaborative approach and technical expertise have been valuable assets to the team.",
    },
    emotion: {
      state: "Happy",
      inferences: [
        "Shows high engagement in team activities and discussions",
        "Maintains positive relationships with team members",
        "Demonstrates resilience in challenging situations",
        "Actively contributes to improving team morale",
      ],
    },
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <EmployeeReport
            month={month || "March"}
            year={parseInt(year || "2024")}
            employeeName="Sarah Johnson"
            employeeRole="Senior Software Engineer"
            employeeAvatar="/avatars/sarah.jpg"
            data={sampleData}
          />
        </div>
      </div>
    </Layout>
  );
};

export default AdminEmployeeReportPage;
