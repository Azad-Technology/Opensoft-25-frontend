import React from "react";
import EmployeeReport from "../components/EmployeeReport";

const EmployeeReportPage = () => {
  // Sample data - in a real application, this would come from your API
  const sampleData = {
    leave: {
      score: 4.2,
      comment: "Good leave management with proper planning",
      leaveDensity: 1.5,
      reasons: [
        "Planned vacation with family",
        "Medical appointment",
        "Personal development workshop",
      ],
    },
    interaction: {
      teamMessages: 245,
      meetingsAttended: 15,
      emails: 89,
    },
    experience: {
      onboardingFeedback:
        "Very positive experience with comprehensive training",
      mentorAssigned: true,
      initialTraining: true,
    },
    performance: {
      rating: 4.5,
      workingHours: 8.2,
      awards: 2,
      managerFeedback:
        "Consistently delivers high-quality work and demonstrates strong initiative in team projects.",
    },
    emotion: {
      state: "Happy",
      inferences: [
        "Shows high engagement in team activities",
        "Maintains positive relationships with colleagues",
        "Demonstrates resilience in challenging situations",
        "Actively contributes to team morale",
      ],
    },
  };

  return (
    <div className="page-container py-8">
      <EmployeeReport month="March" year={2024} data={sampleData} />
    </div>
  );
};

export default EmployeeReportPage;
