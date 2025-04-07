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
import { toast } from "sonner"

export default function Schedule() {
  const { user, token } = useAuth();
  const { schedules = [] } = useData() || {};
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [apiError, setApiError] = useState(null);

  // State for current date and selected day
  // Fixed month index: 3 = April (JavaScript months are 0-indexed)
  const [currentDate, setCurrentDate] = useState(new Date(2025, 3, 1)); // April 2025
  const [selectedDay, setSelectedDay] = useState(new Date(2025, 3, 1)); // Initialize with current date

  // State for new event form
  const [newEvent, setNewEvent] = useState({ title: "", note: "" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddingEvent, setIsAddingEvent] = useState(false);

  // State for delete button visibility on events
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isVisible, setIsVisible] = useState(!!apiError);

  useEffect(() => {
    if (apiError) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000); // Disappear after 5 seconds

      return () => clearTimeout(timer); // Cleanup timeout on component unmount or re-render
    }
  }, [apiError]);

  // Improved token retrieval
  const getToken = () => {
    try {
      // First try to get token from context
      if (token) return token;
      const authData = localStorage.getItem("auth");
      if (!authData) return null;
      return JSON.parse(authData).access_token;
    } catch (error) {
      console.error("Error retrieving auth token:", error);
      setApiError("Authentication error. Please try logging in again.");
      return null;
    }
  };

  // Format date consistently for API calls
  const formatDateForApi = (date) => {
    if (!date) return '';
    return date.toISOString().split("T")[0]; // YYYY-MM-DD format
  };

  async function fetchSchedules() {
    if (!currentDate) return; // Don't fetch if no date is selected

    const token = getToken();
    if (!token) {
      return;
    }

    setLoading(true);
    setApiError(null);
    console.log(currentDate.getMonth())
    try {
      const formattedDate = formatDateForApi(currentDate);
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_URL}/common/get_schedules?date=${currentDate.getFullYear()}-${currentDate.getMonth() + 1 <= 9 ? "0" : ""}${currentDate.getMonth() + 1}-01`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch schedules: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Check if data has the expected structure
      if (!data || !Array.isArray(data.schedules)) {
        console.warn("API returned unexpected data structure:", data);
        setEvents([]); // Set empty array as fallback
      } else {
        setEvents(data.schedules);
      }
    } catch (error) {
      console.error("Error fetching schedules:", error);
      setApiError(`Failed to load schedules: ${error.message}`);
      setEvents([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  }

  // Function to delete an event
  const deleteEvent = async (id) => {
    console.log(id)
    if (!id) return;

    const token = getToken();
    console.log(token)
    if (!token) return;
    setIsEventDetailsOpen(false);
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_URL}/common/delete_schedule/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to delete schedule: ${response.status} ${response.statusText}`);
      }

      // Remove from local state
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));

      // Clear delete button visibility if the deleted event was active
      if (selectedEvent && selectedEvent.id === id) {
        setSelectedEvent(null);
      }

      // Show success message
      toast.success("Event deleted successfully");
      fetchSchedules();
    } catch (error) {
      console.error("Error deleting schedule:", error);
      toast.error(`Failed to delete event: ${error.message}`);
    }
  };

  // Fetch schedules when selected day changes or when month changes
  useEffect(() => {
    fetchSchedules();
  }, [currentDate]); // Fetch when currentDate changes

  // When month changes, update selectedDay to first day of the month
  useEffect(() => {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    setSelectedDay(firstDayOfMonth);
  }, [currentDate]);

  // Get days in month - Fix: Corrected to handle month properly (expects 1-12 format)
  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
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
      day
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
  const handleAddEvent = async () => {
    if (!selectedDay || !newEvent.title) {
      toast.warning("Please enter an event title");
      return;
    }

    setIsAddingEvent(true);
    await addSchedule();
    setNewEvent({ title: "", note: "" });
    setIsDialogOpen(false);
    setIsAddingEvent(false);
  };

  async function addSchedule() {
    const token = getToken();
    if (!token) return;

    try {
      const formattedDate = formatDateForApi(selectedDay);

      const response = await fetch(`${import.meta.env.VITE_REACT_APP_URL}/common/add_schedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          "date": `${selectedDay.getFullYear()}-${selectedDay.getMonth() + 1 <= 9 ? "0" : ""}${selectedDay.getMonth() + 1}-${selectedDay.getDate() <= 9 ? "0" : ""}${selectedDay.getDate()}`,
          "title": newEvent.title,
          "note": newEvent.note || "" // Ensure note is never undefined
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to add schedule: ${response.status} ${response.statusText}. ${errorText}`);
      }

      const result = await response.json();
      console.log('Schedule added successfully:', result);
      toast.success('Schedule added successfully')

      // Refresh the events after adding a new one
      await fetchSchedules();
    } catch (error) {
      console.error('Error adding schedule:', error);
      toast.error('Error adding schedule')
    }
  }

  // Get events for a specific day - FIXED FUNCTION
  const getEventsForDay = (day, month, year) => {
    if (!events || !Array.isArray(events)) return [];

    return events.filter((event) => {
      if (!event.date) return false;

      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === month &&
        eventDate.getFullYear() === year
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
  // Fixed: Properly handle month indexes (0-11) and month values (1-12) for getDaysInMonth
  const getPreviousMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth(); // 0-11
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    if (firstDayOfMonth === 0) return []; // Sunday is first day, no previous month days needed

    // Fixed: correct handling of month index for previous month (handle January wrap to December)
    const previousMonth = month === 0 ? 11 : month - 1;
    const previousMonthYear = month === 0 ? year - 1 : year;
    const daysInPreviousMonth = getDaysInMonth(
      previousMonthYear,
      previousMonth + 1, // Adding 1 because getDaysInMonth expects 1-12 format
    );

    const days = [];
    for (
      let i = daysInPreviousMonth - firstDayOfMonth + 1;
      i <= daysInPreviousMonth;
      i++
    ) {
      days.push({
        day: i,
        month: previousMonth, // This is correct (0-11)
        year: previousMonthYear,
        isOtherMonth: true,
      });
    }

    return days;
  };

  // Get the next month's days that appear in this month's view
  // Fixed: Properly handle month indexes (0-11) and month values (1-12) for getDaysInMonth
  const getNextMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth(); // 0-11
    const daysInMonth = getDaysInMonth(
      year,
      month + 1, // Adding 1 because getDaysInMonth expects 1-12 format
    );
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    const totalCells = 42; // 6 rows × 7 days
    const daysFromCurrentMonth = daysInMonth;
    const daysFromPreviousMonth = firstDayOfMonth;
    const daysNeededFromNextMonth =
      totalCells - daysFromCurrentMonth - daysFromPreviousMonth;

    if (daysNeededFromNextMonth <= 0) return [];

    // Fixed: correct handling of month index for next month (handle December wrap to January)
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextMonthYear = month === 11 ? year + 1 : year;

    const days = [];
    for (let i = 1; i <= daysNeededFromNextMonth; i++) {
      days.push({
        day: i,
        month: nextMonth, // This is correct (0-11)
        year: nextMonthYear,
        isOtherMonth: true,
      });
    }

    return days;
  };

  // Render calendar
  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth(); // 0-11
    // Fixed: Add 1 to month because getDaysInMonth expects 1-12 format
    const daysInMonth = getDaysInMonth(year, month + 1);

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
      // Get events for the specific day, month, and year
      const dayEvents = getEventsForDay(day, month, year);
      const isCurrentMonth =
        month === currentDate.getMonth() && year === currentDate.getFullYear();
      const isTodayCell = isToday(day) && isCurrentMonth;

      // Fixed: Month name mapping should use 0-indexed months
      let displayMonth;
      if (month === 0) displayMonth = "Jan";
      else if (month === 1) displayMonth = "Feb";
      else if (month === 2) displayMonth = "Mar";
      else if (month === 3) displayMonth = "Apr";
      else if (month === 4) displayMonth = "May";
      else if (month === 5) displayMonth = "Jun";
      else if (month === 6) displayMonth = "Jul";
      else if (month === 7) displayMonth = "Aug";
      else if (month === 8) displayMonth = "Sep";
      else if (month === 9) displayMonth = "Oct";
      else if (month === 10) displayMonth = "Nov";
      else if (month === 11) displayMonth = "Dec";

      return (
        <div
          key={`day-${index}`}
          className={cn(
            "min-h-[100px] relative border-t-0 border-l-0 border-r border-b border-gray-500/70 transition-colors",
            isDarkMode
              ? "bg-[#111827] hover:bg-[#1a2435]"
              : "bg-white hover:bg-gray-50",
            isOtherMonth && (isDarkMode ? "text-gray-600" : "text-gray-400"),
            !isOtherMonth && (isDarkMode ? "text-white" : "text-black"),
          )}
          onClick={(e) => handleAddEventClick(day, e)}
        >
          {/* Day number and add button */}
          <div className="p-1 flex justify-center items-center">
            <span
              className={cn(
                "inline-block w-7 h-7 text-center leading-7",
                isTodayCell && "rounded-full bg-green-500 text-white",
                isOtherMonth && "text-gray-500",
              )}
            >
              {isOtherMonth ? `${displayMonth} ${day}` : day}
            </span>
          </div>

          {/* Events */}
          <div className="px-1">
            {dayEvents?.map((event) => (
              <div
                key={event.id}
                className={cn(
                  "text-xs p-1 mb-1 rounded-sm cursor-pointer",
                  isDarkMode
                    ? "bg-green-900 hover:bg-green-800"
                    : "bg-green-300 hover:bg-green-400",
                  isDarkMode ? "text-white" : "text-black",
                )}
              >
                <div className="flex justify-between items-center" onClick={(e) => handleEventClick(event, e)}>
                  <span className="truncate">{event.title}</span>
                </div>
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
          "w-full h-full p-4",
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

        {/* API Error Banner */}
        {isVisible && apiError && (
          <div className="bg-red-500 text-white p-2 text-center">
            {apiError}
            <button
              onClick={() => fetchSchedules()}
              className="ml-2 underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading indicator */}
        {loading && (
          <div className="p-4 text-center">
            <p>Loading schedules...</p>
          </div>
        )}

        {/* Calendar header - days of week */}
        <div className="grid grid-cols-7 border-b-2 border-gray-500/70">
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
        <div className="grid grid-cols-7 border-l-2 border-gray-500/70 ">
          {renderCalendar()}
        </div>

        {/* Custom dialog for adding new events */}
        {isDialogOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div
              className={cn(
                "rounded-xl shadow-2xl w-full max-w-md transition-all duration-200 ease-in-out transform neo-glass",             
              )}
            >
              <div className="flex justify-between items-center p-5 m-3 border-b border-opacity-20 border-current">
                <h3 className="text-lg font-semibold">
                  Add Event for{" "}
                  {selectedDay?.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </h3>
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className={cn(
                    "rounded-full p-2 transition-colors",
                    isDarkMode
                      ? "hover:bg-gray-800"
                      : "hover:bg-gray-100"
                  )}
                  aria-label="Close dialog"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-5 space-y-5">
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
                      "w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all",
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white"
                        : "bg-gray-50 border-gray-200 text-gray-900"
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
                      "w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all",
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white"
                        : "bg-gray-50 border-gray-200 text-gray-900"
                    )}
                  />
                </div>
              </div>

              <div className="p-5 pt-2 flex justify-end gap-3">
                <button
                  className={cn(
                    "px-4 py-2 rounded-lg font-medium transition-all duration-200",
                    isDarkMode
                      ? "text-gray-300 hover:bg-gray-800"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                  onClick={() => setIsDialogOpen(false)}
                  disabled={isAddingEvent}
                >
                  Cancel
                </button>
                <button
                  className={cn(
                    "px-5 py-2 bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white rounded-lg font-medium shadow-sm hover:bg-green-800 transition-all duration-200",
                    isAddingEvent ? "opacity-70 cursor-not-allowed" : "hover:shadow-md"
                  )}
                  onClick={handleAddEvent}
                  disabled={isAddingEvent}
                >
                  {isAddingEvent ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding...
                    </span>
                  ) : (
                    "Add Event"
                  )}
                </button>
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
                <div className="flex justify-end gap-2">
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    onClick={() => deleteEvent(selectedEvent.schedule_id)}
                  >
                    Delete
                  </button>
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
