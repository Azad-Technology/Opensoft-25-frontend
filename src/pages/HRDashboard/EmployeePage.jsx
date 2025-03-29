import React, {useState} from "react";
import InteractionReports from "./botReport/InteractionReport";
import EmployeeExperience from "./botReport/Experience";
import PerformanceReports from "./botReport/Performance";
import BotReports from "./botReport/LeaveAnalysis";
import BotReportsEmotionalState from "./botReport/Emotion";
import BotNavbar from "./botReport/BotNavbar";

const EmployeePage = () => {
  const [activeTab, setActiveTab] = useState("Leave");
 
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div>
      <BotReports/>
      <EmployeeExperience/>
      </div>
      <div>
      <InteractionReports/>
      <PerformanceReports/>
      </div>
      <div>
      <BotReportsEmotionalState/> 
      </div>  
    </div>
  );
};

export default EmployeePage;
