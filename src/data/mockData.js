// Sample users (employees and admins)
export const users = [
  {
    id: "user_1",
    employeeId: "EMP001",
    name: "John Doe",
    email: "john.doe@company.com",
    role: "employee",
    department: "Engineering",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "user_2",
    employeeId: "EMP002",
    name: "Jane Smith",
    email: "jane.smith@company.com",
    role: "employee",
    department: "Marketing",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: "user_3",
    employeeId: "EMP003",
    name: "Alex Johnson",
    email: "alex.johnson@company.com",
    role: "employee",
    department: "Design",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: "user_4",
    employeeId: "HR001",
    name: "Sarah Williams",
    email: "sarah.williams@company.com",
    role: "admin",
    department: "Human Resources",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: "user_5",
    employeeId: "EMP004",
    name: "Michael Brown",
    email: "michael.brown@company.com",
    role: "employee",
    department: "Finance",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
  },
];

// Demo user for easy login
export const demoEmployee = {
  email: "john.doe@company.com",
  password: "password123",
};

export const demoAdmin = {
  email: "sarah.williams@company.com",
  password: "password123",
};

// Generate dates within the last month
const getRandomDateInLastMonth = () => {
  const now = new Date();
  const pastDate = new Date();
  pastDate.setDate(now.getDate() - Math.floor(Math.random() * 30)); // Random day in the last month
  return pastDate.toISOString();
};

// Vibemeter entries
export const vibeEntries = [
  // John Doe's vibe entries (showing a pattern of frustration recently)
  {
    id: "vibe_1",
    employeeId: "EMP001",
    date: getRandomDateInLastMonth(),
    vibe: "okay",
    comment: "Average day, nothing special",
  },
  {
    id: "vibe_2",
    employeeId: "EMP001",
    date: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
    vibe: "frustrated",
    comment: "Too many meetings today",
  },
  {
    id: "vibe_3",
    employeeId: "EMP001",
    date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
    vibe: "frustrated",
    comment: "Project deadline stress",
  },
  {
    id: "vibe_4",
    employeeId: "EMP001",
    date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    vibe: "sad",
    comment: "Feeling overwhelmed with work",
  },

  // Jane Smith's vibe entries (generally positive)
  {
    id: "vibe_5",
    employeeId: "EMP002",
    date: getRandomDateInLastMonth(),
    vibe: "happy",
    comment: "Great team collaboration today",
  },
  {
    id: "vibe_6",
    employeeId: "EMP002",
    date: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString(),
    vibe: "excited",
    comment: "Just got my project approved!",
  },
  {
    id: "vibe_7",
    employeeId: "EMP002",
    date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    vibe: "okay",
    comment: "Normal workday",
  },
  {
    id: "vibe_8",
    employeeId: "EMP002",
    date: new Date().toISOString(),
    vibe: "happy",
    comment: "Finished a major milestone",
  },

  // Alex Johnson's vibe entries (mixed but trending down)
  {
    id: "vibe_9",
    employeeId: "EMP003",
    date: getRandomDateInLastMonth(),
    vibe: "happy",
    comment: "Learning new skills",
  },
  {
    id: "vibe_10",
    employeeId: "EMP003",
    date: new Date(new Date().setDate(new Date().getDate() - 6)).toISOString(),
    vibe: "okay",
    comment: "Busy day",
  },
  {
    id: "vibe_11",
    employeeId: "EMP003",
    date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
    vibe: "sad",
    comment: "Communication issues with team",
  },
  {
    id: "vibe_12",
    employeeId: "EMP003",
    date: new Date().toISOString(),
    vibe: "frustrated",
    comment: "Technical issues slowing down progress",
  },

  // Michael Brown's vibe entries (stable)
  {
    id: "vibe_13",
    employeeId: "EMP004",
    date: getRandomDateInLastMonth(),
    vibe: "okay",
    comment: "Regular day at work",
  },
  {
    id: "vibe_14",
    employeeId: "EMP004",
    date: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
    vibe: "okay",
    comment: "Nothing special to report",
  },
  {
    id: "vibe_15",
    employeeId: "EMP004",
    date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    vibe: "okay",
    comment: "Standard workday",
  },
];

// Leave data
export const leaves = [
  {
    id: "leave_1",
    employeeId: "EMP001",
    startDate: new Date(
      new Date().setDate(new Date().getDate() - 10),
    ).toISOString(),
    endDate: new Date(
      new Date().setDate(new Date().getDate() - 8),
    ).toISOString(),
    reason: "Medical appointment",
    status: "approved",
  },
  {
    id: "leave_2",
    employeeId: "EMP001",
    startDate: new Date(
      new Date().setDate(new Date().getDate() + 5),
    ).toISOString(),
    endDate: new Date(
      new Date().setDate(new Date().getDate() + 7),
    ).toISOString(),
    reason: "Family event",
    status: "pending",
  },
  {
    id: "leave_3",
    employeeId: "EMP002",
    startDate: new Date(
      new Date().setDate(new Date().getDate() - 20),
    ).toISOString(),
    endDate: new Date(
      new Date().setDate(new Date().getDate() - 16),
    ).toISOString(),
    reason: "Vacation",
    status: "approved",
  },
  {
    id: "leave_4",
    employeeId: "EMP003",
    startDate: new Date(
      new Date().setDate(new Date().getDate() - 5),
    ).toISOString(),
    endDate: new Date(
      new Date().setDate(new Date().getDate() - 3),
    ).toISOString(),
    reason: "Personal reasons",
    status: "approved",
  },
];

// Activity tracking data
export const activities = [
  // John Doe (high activity)
  {
    id: "activity_1",
    employeeId: "EMP001",
    date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
    teamsMessages: 45,
    emails: 23,
    meetings: 6,
  },
  {
    id: "activity_2",
    employeeId: "EMP001",
    date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    teamsMessages: 52,
    emails: 19,
    meetings: 7,
  },
  {
    id: "activity_3",
    employeeId: "EMP001",
    date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    teamsMessages: 38,
    emails: 27,
    meetings: 5,
  },

  // Jane Smith (moderate activity)
  {
    id: "activity_4",
    employeeId: "EMP002",
    date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
    teamsMessages: 22,
    emails: 14,
    meetings: 3,
  },
  {
    id: "activity_5",
    employeeId: "EMP002",
    date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    teamsMessages: 18,
    emails: 11,
    meetings: 2,
  },
  {
    id: "activity_6",
    employeeId: "EMP002",
    date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    teamsMessages: 25,
    emails: 16,
    meetings: 4,
  },

  // Alex Johnson (low activity)
  {
    id: "activity_7",
    employeeId: "EMP003",
    date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
    teamsMessages: 8,
    emails: 5,
    meetings: 1,
  },
  {
    id: "activity_8",
    employeeId: "EMP003",
    date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    teamsMessages: 6,
    emails: 3,
    meetings: 1,
  },
  {
    id: "activity_9",
    employeeId: "EMP003",
    date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    teamsMessages: 4,
    emails: 7,
    meetings: 0,
  },
];

// Recognition data
export const recognitions = [
  {
    id: "recognition_1",
    employeeId: "EMP001",
    date: new Date(new Date().setDate(new Date().getDate() - 15)).toISOString(),
    type: "Peer Recognition",
    givenBy: "Jane Smith",
    description: "Great collaboration on the project launch",
  },
  {
    id: "recognition_2",
    employeeId: "EMP002",
    date: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString(),
    type: "Manager Appreciation",
    givenBy: "Team Lead",
    description: "Excellent presentation to the client",
  },
  {
    id: "recognition_3",
    employeeId: "EMP002",
    date: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
    type: "Achievement Award",
    givenBy: "Department Head",
    description: "Meeting all quarterly targets",
  },
  {
    id: "recognition_4",
    employeeId: "EMP003",
    date: new Date(new Date().setDate(new Date().getDate() - 20)).toISOString(),
    type: "Peer Recognition",
    givenBy: "John Doe",
    description: "Helping with technical challenges",
  },
];

// Performance data
export const performances = [
  {
    id: "performance_1",
    employeeId: "EMP001",
    date: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString(),
    rating: 4.2,
    managerFeedback:
      "John consistently delivers high-quality work but could improve on meeting deadlines.",
    strengths: ["Technical expertise", "Problem-solving", "Team collaboration"],
    improvements: ["Time management", "Documentation"],
  },
  {
    id: "performance_2",
    employeeId: "EMP002",
    date: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString(),
    rating: 4.8,
    managerFeedback:
      "Jane is an exceptional performer who consistently exceeds expectations.",
    strengths: ["Communication", "Leadership", "Initiative", "Quality of work"],
    improvements: ["Work-life balance"],
  },
  {
    id: "performance_3",
    employeeId: "EMP003",
    date: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString(),
    rating: 3.5,
    managerFeedback:
      "Alex has potential but needs to focus on consistency and communication.",
    strengths: ["Creativity", "Technical skills"],
    improvements: ["Communication", "Consistency", "Teamwork"],
  },
  {
    id: "performance_4",
    employeeId: "EMP004",
    date: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString(),
    rating: 4.0,
    managerFeedback:
      "Michael is a solid performer with good attention to detail.",
    strengths: ["Analytical skills", "Attention to detail", "Reliability"],
    improvements: ["Innovation", "Proactive communication"],
  },
];

// Onboarding data for newer employees
export const onboardings = [
  {
    id: "onboarding_1",
    employeeId: "EMP003",
    startDate: new Date(
      new Date().setDate(new Date().getDate() - 60),
    ).toISOString(),
    mentorAssigned: true,
    trainingCompleted: true,
    feedback: "The onboarding process was comprehensive and welcoming.",
    satisfaction: 4,
  },
  {
    id: "onboarding_2",
    employeeId: "EMP004",
    startDate: new Date(
      new Date().setDate(new Date().getDate() - 45),
    ).toISOString(),
    mentorAssigned: true,
    trainingCompleted: false,
    feedback:
      "Training materials were useful, but I would have liked more hands-on sessions.",
    satisfaction: 3,
  },
];

// Chat sessions
export const chatSessions = [
  {
    id: "session_1",
    employeeId: "EMP001",
    startTime: new Date(
      new Date().setDate(new Date().getDate() - 15),
    ).toISOString(),
    endTime: new Date(
      new Date().setDate(new Date().getDate() - 15),
    ).toISOString(),
    title: "Monthly Check-in (Previous)",
    completed: true,
  },
  {
    id: "session_2",
    employeeId: "EMP001",
    startTime: new Date(
      new Date().setDate(new Date().getDate() - 2),
    ).toISOString(),
    title: "Well-being Check-in",
    completed: false,
  },
  {
    id: "session_3",
    employeeId: "EMP002",
    startTime: new Date(
      new Date().setDate(new Date().getDate() - 10),
    ).toISOString(),
    endTime: new Date(
      new Date().setDate(new Date().getDate() - 10),
    ).toISOString(),
    title: "Monthly Check-in",
    completed: true,
  },
  {
    id: "session_4",
    employeeId: "EMP003",
    startTime: new Date(
      new Date().setDate(new Date().getDate() - 5),
    ).toISOString(),
    endTime: new Date(
      new Date().setDate(new Date().getDate() - 5),
    ).toISOString(),
    title: "Weekly Followup",
    completed: true,
  },
];

// Chat messages
export const chatMessages = [
  // John's first completed session
  {
    id: "msg_1",
    sessionId: "session_1",
    sender: "bot",
    content: "Hello John! How are you feeling today?",
    timestamp: new Date(
      new Date().setDate(new Date().getDate() - 15),
    ).toISOString(),
  },
  {
    id: "msg_2",
    sessionId: "session_1",
    sender: "user",
    content: "I'm feeling okay, thanks for asking.",
    timestamp: new Date(
      new Date().setDate(new Date().getDate() - 15),
    ).toISOString(),
  },
  {
    id: "msg_3",
    sessionId: "session_1",
    sender: "bot",
    content:
      "That's good to hear. Is there anything specific about work that's on your mind?",
    timestamp: new Date(
      new Date().setDate(new Date().getDate() - 15),
    ).toISOString(),
  },
  {
    id: "msg_4",
    sessionId: "session_1",
    sender: "user",
    content:
      "I'm a bit concerned about the upcoming project deadline, but otherwise things are fine.",
    timestamp: new Date(
      new Date().setDate(new Date().getDate() - 15),
    ).toISOString(),
  },
  {
    id: "msg_5",
    sessionId: "session_1",
    sender: "bot",
    content:
      "I understand deadlines can be stressful. Have you discussed this with your team lead? Sometimes adjusting priorities or getting additional resources can help.",
    timestamp: new Date(
      new Date().setDate(new Date().getDate() - 15),
    ).toISOString(),
  },
  {
    id: "msg_6",
    sessionId: "session_1",
    sender: "user",
    content: "That's a good suggestion. I'll talk to them tomorrow. Thanks!",
    timestamp: new Date(
      new Date().setDate(new Date().getDate() - 15),
    ).toISOString(),
  },
  {
    id: "msg_7",
    sessionId: "session_1",
    sender: "bot",
    content:
      "You're welcome! Is there anything else you'd like to discuss today?",
    timestamp: new Date(
      new Date().setDate(new Date().getDate() - 15),
    ).toISOString(),
  },
  {
    id: "msg_8",
    sessionId: "session_1",
    sender: "user",
    content: "No, that's all for now. Thanks for checking in.",
    timestamp: new Date(
      new Date().setDate(new Date().getDate() - 15),
    ).toISOString(),
  },
  {
    id: "msg_9",
    sessionId: "session_1",
    sender: "bot",
    content:
      "Great! Remember, I'm here anytime you need to talk. Have a wonderful day!",
    timestamp: new Date(
      new Date().setDate(new Date().getDate() - 15),
    ).toISOString(),
  },

  // John's current session (in progress)
  {
    id: "msg_10",
    sessionId: "session_2",
    sender: "bot",
    content:
      "Hi John, it looks like you've been feeling frustrated lately. I wanted to check in and see how you're doing.",
    timestamp: new Date(
      new Date().setDate(new Date().getDate() - 2),
    ).toISOString(),
  },
  {
    id: "msg_11",
    sessionId: "session_2",
    sender: "user",
    content:
      "It's been a challenging week. I have a lot on my plate right now.",
    timestamp: new Date(
      new Date().setDate(new Date().getDate() - 2),
    ).toISOString(),
  },
  {
    id: "msg_12",
    sessionId: "session_2",
    sender: "bot",
    content:
      "I'm sorry to hear that. Can you tell me more about what's making this week particularly challenging?",
    timestamp: new Date(
      new Date().setDate(new Date().getDate() - 2),
    ).toISOString(),
  },

  // Jane's completed session
  {
    id: "msg_13",
    sessionId: "session_3",
    sender: "bot",
    content: "Hello Jane! How has your month been going?",
    timestamp: new Date(
      new Date().setDate(new Date().getDate() - 10),
    ).toISOString(),
  },
  {
    id: "msg_14",
    sessionId: "session_3",
    sender: "user",
    content:
      "It's been really great! I'm excited about the progress on our current project.",
    timestamp: new Date(
      new Date().setDate(new Date().getDate() - 10),
    ).toISOString(),
  },
  {
    id: "msg_15",
    sessionId: "session_3",
    sender: "bot",
    content:
      "That's wonderful to hear! What aspects of the project are you most excited about?",
    timestamp: new Date(
      new Date().setDate(new Date().getDate() - 10),
    ).toISOString(),
  },
  {
    id: "msg_16",
    sessionId: "session_3",
    sender: "user",
    content:
      "I'm really enjoying the creative freedom I have, and the team collaboration has been excellent.",
    timestamp: new Date(
      new Date().setDate(new Date().getDate() - 10),
    ).toISOString(),
  },
  {
    id: "msg_17",
    sessionId: "session_3",
    sender: "bot",
    content:
      "That sounds fantastic! It's great when you have both creative autonomy and strong team support. Is there anything that could make your experience even better?",
    timestamp: new Date(
      new Date().setDate(new Date().getDate() - 10),
    ).toISOString(),
  },
  {
    id: "msg_18",
    sessionId: "session_3",
    sender: "user",
    content:
      "Not really, everything is going well. Maybe just more opportunities like this in the future!",
    timestamp: new Date(
      new Date().setDate(new Date().getDate() - 10),
    ).toISOString(),
  },
  {
    id: "msg_19",
    sessionId: "session_3",
    sender: "bot",
    content:
      "I'll make a note of that! It's important that you continue to have fulfilling projects. Thank you for sharing your positive experience.",
    timestamp: new Date(
      new Date().setDate(new Date().getDate() - 10),
    ).toISOString(),
  },

  // Alex's completed session
  {
    id: "msg_20",
    sessionId: "session_4",
    sender: "bot",
    content:
      "Hi Alex, I noticed your recent feedback indicated some challenges. How are you feeling today?",
    timestamp: new Date(
      new Date().setDate(new Date().getDate() - 5),
    ).toISOString(),
  },
  {
    id: "msg_21",
    sessionId: "session_4",
    sender: "user",
    content:
      "I've been feeling a bit frustrated with some technical issues we're facing.",
    timestamp: new Date(
      new Date().setDate(new Date().getDate() - 5),
    ).toISOString(),
  },
  {
    id: "msg_22",
    sessionId: "session_4",
    sender: "bot",
    content:
      "I'm sorry to hear that. Technical challenges can certainly be stressful. Have you been able to get the support you need to resolve these issues?",
    timestamp: new Date(
      new Date().setDate(new Date().getDate() - 5),
    ).toISOString(),
  },
  {
    id: "msg_23",
    sessionId: "session_4",
    sender: "user",
    content:
      "Not really. I feel like I'm spending too much time troubleshooting instead of making progress.",
    timestamp: new Date(
      new Date().setDate(new Date().getDate() - 5),
    ).toISOString(),
  },
  {
    id: "msg_24",
    sessionId: "session_4",
    sender: "bot",
    content:
      "That sounds frustrating. Would it help if I arranged a discussion with the technical support team or your manager to address these blockers?",
    timestamp: new Date(
      new Date().setDate(new Date().getDate() - 5),
    ).toISOString(),
  },
  {
    id: "msg_25",
    sessionId: "session_4",
    sender: "user",
    content: "Yes, that would be very helpful. Thank you.",
    timestamp: new Date(
      new Date().setDate(new Date().getDate() - 5),
    ).toISOString(),
  },
  {
    id: "msg_26",
    sessionId: "session_4",
    sender: "bot",
    content:
      "I'll make that happen. In the meantime, is there anything else that would help improve your work experience?",
    timestamp: new Date(
      new Date().setDate(new Date().getDate() - 5),
    ).toISOString(),
  },
  {
    id: "msg_27",
    sessionId: "session_4",
    sender: "user",
    content:
      "Maybe some additional training on the new systems we're using would be beneficial.",
    timestamp: new Date(
      new Date().setDate(new Date().getDate() - 5),
    ).toISOString(),
  },
  {
    id: "msg_28",
    sessionId: "session_4",
    sender: "bot",
    content:
      "That's a great suggestion. I'll look into available training resources and follow up with you. Thank you for your feedback.",
    timestamp: new Date(
      new Date().setDate(new Date().getDate() - 5),
    ).toISOString(),
  },
];
