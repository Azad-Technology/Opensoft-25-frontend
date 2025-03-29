import React, { useState } from "react";
import {
  Calendar,
  MessageSquare,
  Award,
  Clock,
  Heart,
  UserCheck,
  AlertCircle,
  Smile,
  BadgeCheck,
  BookOpen,
  ChevronRight,
  TrendingUp,
  Users,
  Activity,
} from "lucide-react";

const EmployeeReport = ({
  month,
  year,
  employeeName,
  employeeRole,
  employeeAvatar,
  data,
}) => {
  const [activeTab, setActiveTab] = useState("overview");

  const renderScoreColor = (score) => {
    if (score >= 4) return "text-green-500 dark:text-green-400";
    if (score >= 3) return "text-yellow-500 dark:text-yellow-400";
    return "text-red-500 dark:text-red-400";
  };

  const renderEmotionColor = (state) => {
    const colors = {
      excited: "text-purple-500 dark:text-purple-400",
      happy: "text-green-500 dark:text-green-400",
      okay: "text-yellow-500 dark:text-yellow-400",
      frustrated: "text-red-500 dark:text-red-400",
      sad: "text-blue-500 dark:text-blue-400",
      neutral: "text-gray-500 dark:text-gray-400",
    };
    return colors[state.toLowerCase()] || "text-gray-500 dark:text-gray-400";
  };

  const renderProgressBar = (value, max, color) => (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
      <div
        className={`${color} rounded-full h-2 transition-all duration-500`}
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  );

  const tabs = [
    { id: "overview", label: "Overview", icon: Activity },
    { id: "performance", label: "Performance", icon: TrendingUp },
    { id: "interaction", label: "Interaction", icon: Users },
    { id: "emotion", label: "Emotion", icon: Heart },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="neo-glass p-6 rounded-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              {employeeAvatar ? (
                <img
                  src={employeeAvatar}
                  alt={employeeName}
                  className="h-16 w-16 rounded-full object-cover border-2 border-green-500"
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/60 flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {employeeName.charAt(0)}
                  </span>
                </div>
              )}
              <div
                className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center ${renderEmotionColor(data.emotion.state)} bg-opacity-20 dark:bg-opacity-40`}
              >
                <Smile
                  className={`h-3 w-3 ${renderEmotionColor(data.emotion.state)}`}
                />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {employeeName}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {employeeRole} • Report for {month} {year}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Performance Score
              </p>
              <p
                className={`text-2xl font-bold ${renderScoreColor(data.performance.rating)}`}
              >
                {data.performance.rating.toFixed(1)}
              </p>
            </div>
            <Calendar className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/30">
            <div className="flex items-center justify-between">
              <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span className="text-xs text-green-600 dark:text-green-400">
                Hours/Day
              </span>
            </div>
            <p className="mt-2 text-2xl font-bold text-green-700 dark:text-green-300">
              {data.performance.workingHours.toFixed(1)}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30">
            <div className="flex items-center justify-between">
              <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span className="text-xs text-blue-600 dark:text-blue-400">
                Messages
              </span>
            </div>
            <p className="mt-2 text-2xl font-bold text-blue-700 dark:text-blue-300">
              {data.interaction.teamMessages}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/30">
            <div className="flex items-center justify-between">
              <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <span className="text-xs text-purple-600 dark:text-purple-400">
                Awards
              </span>
            </div>
            <p className="mt-2 text-2xl font-bold text-purple-700 dark:text-purple-300">
              {data.performance.awards}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30">
            <div className="flex items-center justify-between">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              <span className="text-xs text-red-600 dark:text-red-400">
                Leave Days
              </span>
            </div>
            <p className="mt-2 text-2xl font-bold text-red-700 dark:text-red-300">
              {data.leave.leaveDensity}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === tab.id
                ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {activeTab === "overview" && (
          <>
            <div className="analytics-card">
              <div className="analytics-card-header">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
                  Employee Experience
                </h3>
                <UserCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Onboarding Status
                    </p>
                    <BadgeCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="mt-1 text-gray-800 dark:text-gray-200">
                    {data.experience.onboardingFeedback}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Mentor Assigned
                    </p>
                    {data.experience.mentorAssigned ? (
                      <BadgeCheck className="mt-2 h-5 w-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <AlertCircle className="mt-2 h-5 w-5 text-red-500 dark:text-red-400" />
                    )}
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Initial Training
                    </p>
                    {data.experience.initialTraining ? (
                      <BookOpen className="mt-2 h-5 w-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <AlertCircle className="mt-2 h-5 w-5 text-red-500 dark:text-red-400" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="analytics-card">
              <div className="analytics-card-header">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
                  Leave Analysis
                </h3>
                <AlertCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Leave Score
                    </p>
                    <p
                      className={`text-sm font-medium ${renderScoreColor(data.leave.score)}`}
                    >
                      {data.leave.score.toFixed(1)} / 5.0
                    </p>
                  </div>
                  {renderProgressBar(
                    data.leave.score,
                    5,
                    renderScoreColor(data.leave.score),
                  )}
                  <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                    {data.leave.comment}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Major Reasons
                  </p>
                  <div className="mt-2 space-y-2">
                    {data.leave.reasons.map((reason, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <ChevronRight className="h-4 w-4 text-green-600 dark:text-green-400" />
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {reason}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "performance" && (
          <>
            <div className="analytics-card">
              <div className="analytics-card-header">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
                  Performance Metrics
                </h3>
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Overall Rating
                    </p>
                    <p
                      className={`text-sm font-medium ${renderScoreColor(data.performance.rating)}`}
                    >
                      {data.performance.rating.toFixed(1)} / 5.0
                    </p>
                  </div>
                  {renderProgressBar(
                    data.performance.rating,
                    5,
                    renderScoreColor(data.performance.rating),
                  )}
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Working Hours
                    </p>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {data.performance.workingHours.toFixed(1)} hrs/day
                    </p>
                  </div>
                  {renderProgressBar(
                    data.performance.workingHours,
                    10,
                    "bg-blue-500 dark:bg-blue-400",
                  )}
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Recognition
                    </p>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {data.performance.awards} awards
                    </p>
                  </div>
                  {renderProgressBar(
                    data.performance.awards,
                    5,
                    "bg-purple-500 dark:bg-purple-400",
                  )}
                </div>
              </div>
            </div>

            <div className="analytics-card">
              <div className="analytics-card-header">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
                  Manager Feedback
                </h3>
                <UserCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 italic">
                  "{data.performance.managerFeedback}"
                </p>
              </div>
            </div>
          </>
        )}

        {activeTab === "interaction" && (
          <>
            {/* Interaction Metrics */}
            <div className="analytics-card">
              <div className="analytics-card-header">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
                  Communication Activity
                </h3>
                <MessageSquare className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Team Messages
                      </p>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {data.interaction.teamMessages}
                      </p>
                    </div>
                    {renderProgressBar(
                      data.interaction.teamMessages,
                      300,
                      "bg-blue-500 dark:bg-blue-400",
                    )}
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Meetings Attended
                      </p>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {data.interaction.meetingsAttended}
                      </p>
                    </div>
                    {renderProgressBar(
                      data.interaction.meetingsAttended,
                      20,
                      "bg-purple-500 dark:bg-purple-400",
                    )}
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Emails
                      </p>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {data.interaction.emails}
                      </p>
                    </div>
                    {renderProgressBar(
                      data.interaction.emails,
                      100,
                      "bg-green-500 dark:bg-green-400",
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="analytics-card">
              <div className="analytics-card-header">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
                  Activity Distribution
                </h3>
                <Activity className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="relative h-[200px] mt-4">
                <div className="absolute inset-0 flex items-end justify-around">
                  <div className="w-1/3 px-2">
                    <div
                      className="bg-blue-500 dark:bg-blue-400 rounded-t-lg transition-all duration-500"
                      style={{
                        height: `${(data.interaction.teamMessages / 300) * 100}%`,
                      }}
                    />
                    <p className="text-xs text-center mt-2 text-gray-600 dark:text-gray-400">
                      Messages
                    </p>
                  </div>
                  <div className="w-1/3 px-2">
                    <div
                      className="bg-purple-500 dark:bg-purple-400 rounded-t-lg transition-all duration-500"
                      style={{
                        height: `${(data.interaction.meetingsAttended / 20) * 100}%`,
                      }}
                    />
                    <p className="text-xs text-center mt-2 text-gray-600 dark:text-gray-400">
                      Meetings
                    </p>
                  </div>
                  <div className="w-1/3 px-2">
                    <div
                      className="bg-green-500 dark:bg-green-400 rounded-t-lg transition-all duration-500"
                      style={{
                        height: `${(data.interaction.emails / 100) * 100}%`,
                      }}
                    />
                    <p className="text-xs text-center mt-2 text-gray-600 dark:text-gray-400">
                      Emails
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "emotion" && (
          <>
            {/* Emotional State */}
            <div className="analytics-card">
              <div className="analytics-card-header">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
                  Emotional Wellbeing
                </h3>
                <Heart className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex items-center justify-center py-8">
                <div
                  className={`p-8 rounded-full ${renderEmotionColor(data.emotion.state)} bg-opacity-20 dark:bg-opacity-40`}
                >
                  <Smile
                    className={`h-16 w-16 ${renderEmotionColor(data.emotion.state)}`}
                  />
                </div>
              </div>
              <div className="text-center">
                <p
                  className={`text-2xl font-bold ${renderEmotionColor(data.emotion.state)}`}
                >
                  {data.emotion.state}
                </p>
              </div>
            </div>

            {/* Key Inferences */}
            <div className="analytics-card">
              <div className="analytics-card-header">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
                  Key Inferences
                </h3>
                <Activity className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="space-y-3">
                {data.emotion.inferences.map((inference, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 flex items-start space-x-3"
                  >
                    <ChevronRight className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {inference}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmployeeReport;
