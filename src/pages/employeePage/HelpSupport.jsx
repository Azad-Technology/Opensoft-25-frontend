import React, { useState, useEffect } from "react";
import Layout from "../../components/employeeCompo/Layout";
import { toast } from "sonner";

const HelpAndSupportPage = () => {
  const [formData, setFormData] = useState({
    topic: "",
    description: "",
  });

  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch tickets from the API
  const fetchTickets = async () => {
    setLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem("auth"))?.access_token;

      if (!token) {
        toast.error("Authentication token not found");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_URL}/employee/get_employee_tickets`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Transform API data to match our inquiries format
      const formattedInquiries = data.tickets.map((ticket) => ({
        id: ticket.ticket_id,
        topic: ticket.title,
        name: ticket.employee_name,
        date: new Date(ticket.date).toISOString().split("T")[0],
        status: ticket.is_resolved ? "resolved" : "pending",
      }));

      // Sort inquiries to show pending tickets before resolved ones
      const sortedInquiries = formattedInquiries.sort((a, b) => {
        // Sort by status first (pending before resolved)
        if (a.status === "pending" && b.status === "resolved") return -1;
        if (a.status === "resolved" && b.status === "pending") return 1;
        // If status is the same, sort by date (newest first)
        return new Date(b.date) - new Date(a.date);
      });

      setInquiries(sortedInquiries);
      // toast.success("Tickets fetched successfully");
    } catch (error) {
      console.error("Error fetching tickets:", error);
      toast.error("Failed to fetch tickets");
    } finally {
      setLoading(false);
    }
  };

  // Fetch tickets when component mounts
  useEffect(() => {
    fetchTickets();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = JSON.parse(localStorage.getItem("auth"))?.access_token;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_URL}/employee/add_ticket`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: formData.topic,
            description: formData.description,
          }),
        },
      );

      const res = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      toast.success(res.message);

      // Fetch updated tickets after successful submission
      fetchTickets();
    } catch (error) {
      toast.error("Failed to submit inquiry");
      console.error("inquiry error", error);
    }

    // Reset form
    setFormData({
      topic: "",
      description: "",
    });
  };

  return (
    <Layout>
      <div className="page-container py-6">
        <div className="flex flex-col bg-gray-50 dark:bg-gray-900 min-h-screen border border-gray-100 dark:border-gray-700 rounded-lg">
          <header className="bg-green-500 text-white p-3 rounded-t-lg">
            <h1 className="text-xl font-bold">Help & Support</h1>
          </header>

          <div className="flex flex-col md:flex-row flex-grow p-3 gap-4">
            {/* Contact Form Section (65%) - Made smaller */}
            <div className="w-full md:w-7/12 bg-white dark:bg-gray-800 dark:text-white border border-gray-100 dark:border-gray-700 rounded-lg shadow p-4 h-[650px] my-10">
              <h2 className="text-lg font-semibold mb-4 mt-5">Contact Us</h2>
              <p className="mb-3 text-md text-gray-600 dark:text-gray-400 mt-5">
                For inquiries or requests that require a more personal response,
                we will make every attempt to respond in a timely manner. Or, if
                you prefer to contact us by phone, please use our global
                directory to find an office near you.
              </p>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Fields marked with an asterisk (*) are required.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label
                    className="block text-gray-700 mb-1 dark:text-gray-400 text-md"
                    htmlFor="topic"
                  >
                    Topic*
                  </label>
                  <select
                    id="topic"
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 dark:text-gray-600 mt-2 mb-5"
                    required
                  >
                    <option value="" className="dark:text-gray-400">
                      Select topic
                    </option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Billing">Billing</option>
                    <option value="Feature Request">Feature Request</option>
                    <option value="Account Issues">Account Issues</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 mb-1 dark:text-gray-400 text-md"
                    htmlFor="description"
                  >
                    Describe your issue*
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 dark:text-gray-600 mt-2"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-md "
                >
                  Submit
                </button>
              </form>
            </div>

            {/* Inquiry List Section (35%) - Made smaller */}
            <div className="w-full md:w-5/12 bg-white dark:bg-gray-800 rounded-lg shadow p-4 h-[650px] my-10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold dark:text-white">
                  Recent Inquiries
                </h2>
                <button
                  onClick={fetchTickets}
                  className="text-xs text-green-600 hover:text-green-700 dark:text-green-400 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Reload{" "}
                </button>
              </div>

              {loading ? (
                <div className="flex justify-center py-6">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-green-500"></div>
                </div>
              ) : inquiries.length > 0 ? (
                <div className="space-y-3 h-[550px] overflow-y-scroll">
                  {inquiries.map((inquiry) => (
                    <div
                      key={inquiry.id}
                      className={`p-3 rounded-lg border dark:text-gray-600 ${inquiry.status === "resolved" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-medium text-sm">{inquiry.topic}</h3>
                        <span
                          className={`text-xs px-1.5 py-0.5 rounded ${
                            inquiry.status === "resolved"
                              ? "bg-green-500 text-white"
                              : "bg-red-500 text-white"
                          }`}
                        >
                          {inquiry.status === "resolved"
                            ? "Resolved"
                            : "Pending"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mb-0.5">
                        Submitted by: {inquiry.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Date: {inquiry.date}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-6 text-sm">
                  No inquiries submitted yet
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HelpAndSupportPage;
