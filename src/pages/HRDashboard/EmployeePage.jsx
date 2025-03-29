import React from "react";
import InteractionReports from "./botReport/InteractionReport";
import EmployeeExperience from "./botReport/Experience";
import PerformanceReports from "./botReport/Performance";
import BotReports from "./botReport/LeaveAnalysis";
import BotReportsEmotionalState from "./botReport/Emotion";

const EmployeePage = () => {
  return (
    <div>
      <BotReports />
      <InteractionReports />
      <EmployeeExperience />
      <PerformanceReports />
      <BotReportsEmotionalState />
    </div>
  );
};

export default EmployeePage;
