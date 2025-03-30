import React, { createContext, useContext, useState, useEffect } from "react";
import {
  vibeEntries,
  leaves,
  activities,
  recognitions,
  performances,
  onboardings,
  chatSessions,
  chatMessages,
  users,
} from "../data/mockData";

const DataContext = createContext(undefined);

export const DataProvider = ({ children }) => {
  const [vibes, setVibes] = useState(vibeEntries);
  const [userLeaves, setLeaves] = useState(leaves);
  const [userActivities, setActivities] = useState(activities);
  const [userRecognitions, setRecognitions] = useState(recognitions);
  const [userPerformances, setPerformances] = useState(performances);
  const [userOnboardings, setOnboardings] = useState(onboardings);
  const [userChatSessions, setChatSessions] = useState(chatSessions);
  const [userChatMessages, setChatMessages] = useState(chatMessages);

  const getEmployeeStats = (employeeId) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const currentMonthLeaves = userLeaves.filter((leave) => {
      const leaveDate = new Date(leave.startDate);
      return (
        leaveDate.getMonth() === currentMonth &&
        leaveDate.getFullYear() === currentYear &&
        leave.employeeId === employeeId
      );
    }).length;

    const totalLeaves = userLeaves.filter(
      (leave) => leave.employeeId === employeeId,
    ).length;

    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

    const recentVibes = vibes
      .filter(
        (v) => v.employeeId === employeeId && new Date(v.date) >= twoWeeksAgo,
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const vibeValues = {
      frustrated: 1,
      sad: 2,
      okay: 3,
      happy: 4,
      excited: 5,
    };

    let averageVibe = "okay";
    if (recentVibes.length > 0) {
      const total = recentVibes.reduce((sum, v) => sum + vibeValues[v.vibe], 0);
      const avg = total / recentVibes.length;

      if (avg <= 1.5) averageVibe = "frustrated";
      else if (avg <= 2.5) averageVibe = "sad";
      else if (avg <= 3.5) averageVibe = "okay";
      else if (avg <= 4.5) averageVibe = "happy";
      else averageVibe = "excited";
    }

    const recentActivities = userActivities.filter(
      (act) =>
        act.employeeId === employeeId && new Date(act.date) >= twoWeeksAgo,
    );

    let activityLevel = "normal";
    if (recentActivities.length > 0) {
      const totalMessages = recentActivities.reduce(
        (sum, act) => sum + act.teamsMessages,
        0,
      );
      const totalEmails = recentActivities.reduce(
        (sum, act) => sum + act.emails,
        0,
      );
      const totalMeetings = recentActivities.reduce(
        (sum, act) => sum + act.meetings,
        0,
      );

      const activityScore =
        (totalMessages + totalEmails + totalMeetings) / recentActivities.length;

      if (activityScore < 10) activityLevel = "low";
      else if (activityScore > 30) activityLevel = "high";
    }

    const recognitionCount = userRecognitions.filter(
      (r) => r.employeeId === employeeId,
    ).length;

    const latestPerformance = userPerformances
      .filter((p) => p.employeeId === employeeId)
      .sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      )[0];

    const currentMonthStart = new Date(currentYear, currentMonth, 1);
    const completedMonthlyChatbot = userChatSessions.some(
      (session) =>
        session.employeeId === employeeId &&
        session.completed &&
        new Date(session.startTime) >= currentMonthStart,
    );

    return {
      totalLeaves,
      currentMonthLeaves,
      averageVibe,
      recentVibes,
      activityLevel,
      recognitionCount,
      performanceRating: latestPerformance?.rating,
      completedMonthlyChatbot,
    };
  };

  const submitNewVibe = (employeeId, vibe, comment) => {
    const newVibe = {
      id: `vibe_${Date.now()}`,
      employeeId,
      date: new Date().toISOString(),
      vibe,
      comment,
    };
    setVibes((prev) => [newVibe, ...prev]);
  };

  const getRecentMessages = (sessionId, limit = 50) => {
    return userChatMessages
      .filter((msg) => msg.sessionId === sessionId)
      .sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
      )
      .slice(-limit);
  };

  const startNewChatSession = (employeeId) => {
    const newSession = {
      id: `session_${Date.now()}`,
      employeeId,
      startTime: new Date().toISOString(),
      title: `Chat ${new Date().toLocaleDateString()}`,
      completed: false,
    };

    setChatSessions((prev) => [...prev, newSession]);

    const initialMessage = {
      id: `msg_${Date.now()}`,
      sessionId: newSession.id,
      sender: "bot",
      content:
        "Hello! How are you feeling today? I'm here to chat about your experience and see how I can help.",
      timestamp: new Date().toISOString(),
    };

    setChatMessages((prev) => [...prev, initialMessage]);

    return newSession;
  };

  const sendChatMessage = (sessionId, content, sender, attachments) => {
    const newMessage = {
      id: `msg_${Date.now()}`,
      sessionId,
      sender,
      content,
      timestamp: new Date().toISOString(),
      attachments,
    };

    setChatMessages((prev) => [...prev, newMessage]);

    if (sender === "user") {
      setTimeout(() => {
        let botResponse = "Thank you for sharing that with me.";
        const lowerContent = content.toLowerCase();

        if (
          lowerContent.includes("frustrated") ||
          lowerContent.includes("angry")
        ) {
          botResponse =
            "I'm sorry to hear you're feeling frustrated. Can you tell me more about what's causing this feeling?";
        } else if (
          lowerContent.includes("sad") ||
          lowerContent.includes("unhappy")
        ) {
          botResponse =
            "I understand that feeling sad can be difficult. Is there anything specific that's contributing to this feeling?";
        } else if (
          lowerContent.includes("happy") ||
          lowerContent.includes("good")
        ) {
          botResponse =
            "I'm glad to hear you're feeling positive! What's been going well for you recently?";
        } else if (
          lowerContent.includes("excited") ||
          lowerContent.includes("great")
        ) {
          botResponse =
            "That's wonderful to hear! What are you most excited about right now?";
        } else if (
          lowerContent.includes("leave") ||
          lowerContent.includes("vacation")
        ) {
          botResponse =
            "Are you planning to take some time off? Remember that taking breaks is important for your wellbeing.";
        } else if (
          lowerContent.includes("work") ||
          lowerContent.includes("project")
        ) {
          botResponse =
            "How are you feeling about your current workload? Is there anything I can help with?";
        } else if (
          lowerContent.includes("team") ||
          lowerContent.includes("colleague")
        ) {
          botResponse =
            "How's your relationship with your team members? Good collaboration is key to a positive work environment.";
        }

        const botMessage = {
          id: `msg_${Date.now()}`,
          sessionId,
          sender: "bot",
          content: botResponse,
          timestamp: new Date().toISOString(),
        };

        setChatMessages((prev) => [...prev, botMessage]);
      }, 1000);
    }

    const sessionMessages = userChatMessages.filter(
      (msg) => msg.sessionId === sessionId,
    );
    if (sessionMessages.length >= 3) {
      setChatSessions((prev) =>
        prev.map((session) =>
          session.id === sessionId
            ? { ...session, completed: true, endTime: new Date().toISOString() }
            : session,
        ),
      );
    }
  };

  const getAtRiskEmployees = () => {
    const atRiskIds = new Set();
    const employeeVibes = {};

    vibes.forEach((vibe) => {
      if (!employeeVibes[vibe.employeeId]) {
        employeeVibes[vibe.employeeId] = [];
      }
      employeeVibes[vibe.employeeId].push(vibe);
    });

    Object.entries(employeeVibes).forEach(([employeeId, entries]) => {
      const sortedEntries = [...entries].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );

      const recentEntries = sortedEntries.slice(0, 3);
      const negativeCount = recentEntries.filter(
        (entry) => entry.vibe === "frustrated" || entry.vibe === "sad",
      ).length;

      if (negativeCount >= 2) {
        atRiskIds.add(employeeId);
      }
    });

    return users.filter(
      (user) => atRiskIds.has(user.employeeId) && user.role_type === "employee",
    );
  };

  const getMonthlyComplianceRate = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const uniqueEmployeeIds = new Set(
      userChatSessions.map((session) => session.employeeId),
    );
    const totalEmployees = uniqueEmployeeIds.size;

    if (totalEmployees === 0) return 0;

    const currentMonthStart = new Date(currentYear, currentMonth, 1);
    const completedEmployeeIds = new Set(
      userChatSessions
        .filter(
          (session) =>
            session.completed &&
            new Date(session.startTime) >= currentMonthStart,
        )
        .map((session) => session.employeeId),
    );

    return (completedEmployeeIds.size / totalEmployees) * 100;
  };

  return (
    <DataContext.Provider
      value={{
        vibes,
        leaves: userLeaves,
        activities: userActivities,
        recognitions: userRecognitions,
        performances: userPerformances,
        onboardings: userOnboardings,
        chatSessions: userChatSessions,
        chatMessages: userChatMessages,

        getEmployeeStats,
        submitNewVibe,
        getRecentMessages,
        startNewChatSession,
        sendChatMessage,

        getAtRiskEmployees,
        getMonthlyComplianceRate,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
