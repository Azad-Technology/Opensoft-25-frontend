"use client";
import React from "react";
import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar,
  Check,
  Settings,
  Search,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useData } from "../../contexts/DataContext";
import Layout from "../../components/employeeCompo/Layout";
import { cn } from "../../lib/utils";
import { useTheme } from "../../contexts/ThemeContext";

// Dummy data for events (holidays and religious celebrations)
const dummyEvents = [
  {
    id: 1,
    date: new Date(2025, 3, 1),
    title: "Chaitra Sukhladi",
    note: "Hindu new year celebrated in many parts of India.",
  },
  {
    id: 2,
    date: new Date(2025, 3, 1),
    title: "Gudi Padwa",
    note: "Traditional new year celebration in Maharashtra.",
  },
  {
    id: 3,
    date: new Date(2025, 3, 1),
    title: "Ugadi",
    note: "New Year's Day for people in Karnataka and Andhra Pradesh.",
  },
  {
    id: 4,
    date: new Date(2025, 3, 1),
    title: "Ramzan Id",
    note: "Marks the end of Ramadan, the Islamic holy month of fasting.",
  },
  {
    id: 5,
    date: new Date(2025, 3, 1),
    title: "Ramzan Id/Eid-ul-Fitar (tentative)",
    note: "Date may vary based on moon sighting.",
  },
  {
    id: 6,
    date: new Date(2025, 3, 6),
    title: "Rama Navami",
    note: "Celebrates the birth of Lord Rama.",
  },
  {
    id: 7,
    date: new Date(2025, 3, 10),
    title: "Mahavir Jayanti",
    note: "Celebrates the birth of Lord Mahavira.",
  },
  {
    id: 8,
    date: new Date(2025, 3, 13),
    title: "Vaisakhi",
    note: "Sikh New Year festival and spring harvest celebration.",
  },
  {
    id: 9,
    date: new Date(2025, 3, 14),
    title: "Ambedkar Jayanti",
    note: "Birth anniversary of Dr. B.R. Ambedkar.",
  },
  {
    id: 10,
    date: new Date(2025, 3, 14),
    title: "Mesadi",
    note: "Traditional new year celebrated in Assam.",
  },
  {
    id: 11,
    date: new Date(2025, 3, 15),
    title: "Bahag Bihu/Vaisakhadi",
    note: "Assamese New Year celebration.",
  },
  {
    id: 12,
    date: new Date(2025, 3, 18),
    title: "Good Friday",
    note: "Christian observance commemorating the crucifixion of Jesus Christ.",
  },
  {
    id: 13,
    date: new Date(2025, 3, 20),
    title: "Easter Day",
    note: "Christian celebration of the resurrection of Jesus Christ.",
  },
];

export default function EmployeeSchedule() {
  const { user } = useAuth();
  const { schedules = [] } = useData() || {};
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  // Use dummy data if no schedules are provided from context
  const [events, setEvents] = useState(
    schedules.length > 0 ? schedules : dummyEvents,
  );

  // State for current date and selected day
  const [currentDate, setCurrentDate] = useState(new Date(2025, 3, 1)); // April 2025
  const [selectedDay, setSelectedDay] = useState(null);

  // State for new event form
  const [newEvent, setNewEvent] = useState({ title: "", note: "" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // State for event details popup
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false);

  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get day of week for first day of month (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  // Handle add event button click
  const handleAddEventClick = (day, e) => {
    e.stopPropagation();
    const selectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );
    setSelectedDay(selectedDate);
    setIsDialogOpen(true);
  };

  // Handle event click to show details
  const handleEventClick = (event, e) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setIsEventDetailsOpen(true);
  };

  // Add new event
  const handleAddEvent = () => {
    if (selectedDay && newEvent.title) {
      const newEventObj = {
        id: events.length + 1,
        date: selectedDay,
        title: newEvent.title,
        note: newEvent.note || "",
      };

      setEvents([...events, newEventObj]);
      setNewEvent({ title: "", note: "" });
      setIsDialogOpen(false);
    }
  };

  // Get events for a specific day
  const getEventsForDay = (day) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  // Format month and year for display
  const formatMonthYear = (date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  // Check if a day is today
  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  // Get the previous month's days that appear in this month's view
  const getPreviousMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    if (firstDayOfMonth === 0) return []; // Sunday is first day, no previous month days needed

    const previousMonth = month === 0 ? 11 : month - 1;
    const previousMonthYear = month === 0 ? year - 1 : year;
    const daysInPreviousMonth = getDaysInMonth(
      previousMonthYear,
      previousMonth,
    );

    const days = [];
    for (
      let i = daysInPreviousMonth - firstDayOfMonth + 1;
      i <= daysInPreviousMonth;
      i++
    ) {
      days.push({
        day: i,
        month: previousMonth,
        year: previousMonthYear,
        isOtherMonth: true,
      });
    }

    return days;
  };

  // Get the next month's days that appear in this month's view
  const getNextMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    const totalCells = 42; // 6 rows × 7 days
    const daysFromCurrentMonth = daysInMonth;
    const daysFromPreviousMonth = firstDayOfMonth;
    const daysNeededFromNextMonth =
      totalCells - daysFromCurrentMonth - daysFromPreviousMonth;

    if (daysNeededFromNextMonth <= 0) return [];

    const nextMonth = month === 11 ? 0 : month + 1;
    const nextMonthYear = month === 11 ? year + 1 : year;

    const days = [];
    for (let i = 1; i <= daysNeededFromNextMonth; i++) {
      days.push({
        day: i,
        month: nextMonth,
        year: nextMonthYear,
        isOtherMonth: true,
      });
    }

    return days;
  };

  // Render calendar
  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);

    // Get days from previous, current, and next month
    const previousMonthDays = getPreviousMonthDays();
    const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      month,
      year,
      isOtherMonth: false,
    }));
    const nextMonthDays = getNextMonthDays();

    // Combine all days
    const allDays = [
      ...previousMonthDays,
      ...currentMonthDays,
      ...nextMonthDays,
    ];

    return allDays.map((dayInfo, index) => {
      const { day, month, year, isOtherMonth } = dayInfo;
      const dayEvents = isOtherMonth ? [] : getEventsForDay(day);
      const isCurrentMonth =
        month === currentDate.getMonth() && year === currentDate.getFullYear();
      const isTodayCell = isToday(day) && isCurrentMonth;

      let displayMonth;
      if (month === 0) displayMonth = "Jan";
      else if (month === 1) displayMonth = "Feb";
      else if (month === 2) displayMonth = "Mar";
      else if (month === 3) displayMonth = "Apr";
      else if (month === 4) displayMonth = "May";
      else if (month === 11) displayMonth = "Dec";

      return (
        <div
          key={`day-${index}`}
          className={cn(
            "min-h-[100px] relative border-t-0 border-l-0 border-r border-b border-green-900 transition-colors",
            isDarkMode
              ? "bg-[#111827] hover:bg-[#1a2435]"
              : "bg-white hover:bg-gray-50",
            isOtherMonth && (isDarkMode ? "text-gray-600" : "text-gray-400"),
            !isOtherMonth && (isDarkMode ? "text-white" : "text-black"),
          )}
        >
          {/* Day number and add button */}
          <div className="p-1 flex justify-between items-center">
            <span
              className={cn(
                "inline-block w-7 h-7 text-center leading-7",
                isTodayCell && "rounded-full bg-blue-600 text-white",
                isOtherMonth && "text-gray-500",
              )}
            >
              {isOtherMonth ? `${displayMonth} ${day}` : day}
            </span>

            {/* Add event button */}
            {!isOtherMonth && (
              <button
                onClick={(e) => handleAddEventClick(day, e)}
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-white transition-colors",
                  isDarkMode
                    ? "bg-gray-700 hover:bg-green-600"
                    : "bg-gray-400 hover:bg-green-700",
                )}
              >
                <Plus className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Events */}
          <div className="px-1">
            {dayEvents.map((event) => (
              <div
                key={event.id}
                className={cn(
                  "text-xs p-1 mb-1 rounded-sm truncate cursor-pointer",
                  isDarkMode
                    ? "bg-green-900 hover:bg-green-800"
                    : "bg-green-300 hover:bg-green-400",
                  isDarkMode ? "text-white" : "text-black",
                )}
                onClick={(e) => handleEventClick(event, e)}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>
      );
    });
  };

  if (!user) {
    return (
      <Layout>
        <div className="rounded-xl p-6 animate-fade-in">
          <p>Loading your schedule...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        className={cn(
          "w-full h-full",
          isDarkMode ? "bg-[#111827] text-white" : "bg-white text-gray-900",
        )}
      >
        {/* Header with navigation */}
        <div className="flex items-center p-2 border-b border-gray-700">
          <div className="ml-2 flex items-center space-x-2">
            <button
              onClick={goToPreviousMonth}
              className={cn(
                "p-1 rounded-full",
                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200",
              )}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goToNextMonth}
              className={cn(
                "p-1 rounded-full",
                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200",
              )}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-medium">
              {formatMonthYear(currentDate)}
            </h2>
          </div>
        </div>

        {/* Calendar header - days of week */}
        <div className="grid grid-cols-7 border-b border-gray-700">
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium p-2 text-gray-400"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 border-l border-gray-700">
          {renderCalendar()}
        </div>

        {/* Custom dialog for adding new events */}
        {isDialogOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div
              className={cn(
                "rounded-lg p-6 w-full max-w-md",
                isDarkMode
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-900",
              )}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">
                  Add Event for{" "}
                  {selectedDay?.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </h3>
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="block text-sm font-medium">
                    Event Title
                  </label>
                  <input
                    id="title"
                    placeholder="Enter event title"
                    value={newEvent.title}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, title: e.target.value })
                    }
                    className={cn(
                      "w-full p-2 border rounded-lg",
                      isDarkMode
                        ? "bg-gray-700 text-white border-gray-600"
                        : "bg-white text-black border-gray-300",
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="note" className="block text-sm font-medium">
                    Note (Optional)
                  </label>
                  <textarea
                    id="note"
                    placeholder="Add a note about this event"
                    value={newEvent.note}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, note: e.target.value })
                    }
                    rows={3}
                    className={cn(
                      "w-full p-2 border rounded-lg",
                      isDarkMode
                        ? "bg-gray-700 text-white border-gray-600"
                        : "bg-white text-black border-gray-300",
                    )}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    className={cn(
                      "px-4 py-2 border rounded-lg transition-colors",
                      isDarkMode
                        ? "border-gray-600 hover:bg-gray-700"
                        : "border-gray-300 hover:bg-gray-100",
                    )}
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={handleAddEvent}
                  >
                    Add Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Event details dialog */}
        {isEventDetailsOpen && selectedEvent && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div
              className={cn(
                "rounded-lg p-6 w-full max-w-md",
                isDarkMode
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-900",
              )}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Event Details</h3>
                <button
                  onClick={() => setIsEventDetailsOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Date</p>
                  <p>
                    {new Date(selectedEvent.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Title</p>
                  <p className="text-lg font-medium">{selectedEvent.title}</p>
                </div>
                {selectedEvent.note && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Note</p>
                    <p>{selectedEvent.note}</p>
                  </div>
                )}
                <div className="flex justify-end">
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={() => setIsEventDetailsOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

// Helper component for ChevronDown icon
const ChevronDown = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
};
