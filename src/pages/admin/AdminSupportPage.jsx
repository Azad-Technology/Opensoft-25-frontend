import React, { useState, useEffect } from "react";
import Layout from "../../components/employeeCompo/Layout";
import { toast } from "sonner";

const AdminSupportPage = () => {
  const [activeTab, setActiveTab] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    page_size: 10,
    total_tickets: 0,
    total_pages: 1,
    has_next: false,
    has_previous: false,
  });

  
  const fetchTickets = async (page = 1, status = null) => {
    setLoading(true);
    setError(null);
    const token = JSON.parse(localStorage.getItem("auth"))?.access_token;
    try {
      
      let url = `${import.meta.env.VITE_REACT_APP_URL}/admin/get_all_tickets?page=${page}&page_size=${pageSize}`;

      
      if (status && status !== "recent") {
        url += `&status=${status === "resolved" ? "true" : "false"}`;
      }

      
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

     
      const transformedInquiries = data.data.map((ticket) => ({
        id: ticket.ticket_id,
        topic: ticket.description.split(" ")[0] || "Technical Issue", 
        name: ticket.employee_name,
        date: ticket.date,
        status: ticket.is_resolved ? "resolved" : "pending",
        description: ticket.description,
        employee_id: ticket.employee_id,
      }));

      setInquiries(transformedInquiries);
      setPagination(data.pagination);
    
    } catch (err) {
      console.error("Error fetching tickets:", err);
      setError("Failed to load tickets. Please try again later.");
      toast.error("Failed to load tickets. Please try again later.");
    } finally {
      setLoading(false);
    }
  };


  const updateTicketStatus = async (ticketId, status) => {
    const token = JSON.parse(localStorage.getItem("auth"))?.access_token;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_URL}/admin/set_ticket_status?ticket_id=${ticketId}&status_update=true`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ticket_id: ticketId,
            status_update: status === "resolved", 
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const result = await response.json();
      console.log("Status update result:", result);

    
      const updatedInquiries = inquiries.map((inquiry) =>
        inquiry.id === ticketId ? { ...inquiry, status } : inquiry,
      );

      setInquiries(updatedInquiries);

      if (selectedInquiry && selectedInquiry.id === ticketId) {
        setSelectedInquiry({ ...selectedInquiry, status });
      }

      
      fetchTickets(currentPage, activeTab !== "recent" ? activeTab : null);
    } catch (err) {
      console.error("Error updating ticket status:", err);
      toast.error("Failed to update ticket status. Please try again later.");
    }
  };

 
  const handleStatusChange = (status) => {
    if (!selectedInquiry) return;
    updateTicketStatus(selectedInquiry.id, status);
  };


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  
  useEffect(() => {
    const status = activeTab !== "recent" ? activeTab : null;
    fetchTickets(currentPage, status);
  }, [currentPage, activeTab, pageSize]);

  const getFilteredInquiries = () => {
    if (activeTab === "recent") return inquiries;
    return inquiries.filter((inquiry) => inquiry.status === activeTab);
  };

 
  const filteredInquiries = getFilteredInquiries();

  
  const totalPages = pagination.total_pages;

  
  const openInquiryModal = (inquiry) => {
    setSelectedInquiry(inquiry);
    setIsModalOpen(true);
  };

 
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInquiry(null);
  };

  return (
    <Layout>
      <div className="page-container py-8">
        <div className="flex flex-col bg-gray-50 min-h-screen dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-lg">
          <header className="bg-green-600 text-white p-4 rounded-t-lg">
            <h1 className="text-2xl font-bold">Help & Support</h1>
            <p className="text-sm">Admin Panel</p>
          </header>

          <div className="p-6 dark:bg-gray-800">
            <div className="bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Tabs */}
              <div className="flex border-b dark:border-gray-700">
                <button
                  className={`py-3 px-3 sm:px-6 text-sm sm:text-base font-medium ${activeTab === "recent" ? "text-green-600 border-b-2 border-green-600" : "text-gray-600 dark:text-white"}`}
                  onClick={() => {
                    setActiveTab("recent");
                    setCurrentPage(1);
                  }}
                >
                  Recent Inquiries
                </button>
                <button
                  className={`py-3 px-3 sm:px-6 text-sm sm:text-base font-medium ${activeTab === "pending" ? "text-green-600 border-b-2 border-green-600" : "text-gray-600 dark:text-white"}`}
                  onClick={() => {
                    setActiveTab("pending");
                    setCurrentPage(1);
                  }}
                >
                  Pending
                </button>
                <button
                  className={`py-3 px-3 sm:px-6 text-sm sm:text-base font-medium ${activeTab === "resolved" ? "text-green-600 border-b-2 border-green-600" : "text-gray-600 dark:text-white"}`}
                  onClick={() => {
                    setActiveTab("resolved");
                    setCurrentPage(1);
                  }}
                >
                  Resolved
                </button>
              </div>

              {loading && (
                <div className="text-center py-4">
                  <p className="text-gray-600 dark:text-gray-300">
                    Loading inquiries...
                  </p>
                </div>
              )}

              {error && (
                <div className="text-center py-4">
                  <p className="text-red-600 dark:text-red-400">{error}</p>
                  <button
                    className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    onClick={() =>
                      fetchTickets(
                        currentPage,
                        activeTab !== "recent" ? activeTab : null,
                      )
                    }
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* Table */}
              {!loading && !error && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b dark:bg-gray-300">
                      <tr>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-black">
                          ID
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-black">
                          Topic
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-black">
                          Submitted By
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-black">
                          Date
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-black">
                          Status
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-black">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredInquiries.length > 0 ? (
                        filteredInquiries.map((inquiry) => (
                          <tr key={inquiry.id} className="hover:bg-gray-300">
                            <td className="py-3 px-4 whitespace-nowrap dark:text-white dark:bg-gray-800">
                              {inquiry.id}
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap dark:text-white dark:bg-gray-800">
                              {inquiry.topic}
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap dark:text-white dark:bg-gray-800">
                              {inquiry.name}
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap dark:text-white dark:bg-gray-800">
                              {inquiry.date}
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap dark:text-white dark:bg-gray-800">
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${
                                  inquiry.status === "resolved"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {inquiry.status === "resolved"
                                  ? "Resolved"
                                  : "Pending"}
                              </span>
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap dark:text-white dark:bg-gray-800">
                              <button
                                className="text-green-600 hover:text-green-800"
                                onClick={() => openInquiryModal(inquiry)}
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="6"
                            className="py-4 text-center text-gray-500"
                          >
                            No inquiries found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && !loading && !error && (
                <div className="flex items-center justify-between px-4 py-3 border-t">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing{" "}
                      <span className="font-medium">
                        {(currentPage - 1) * pageSize + 1}
                      </span>{" "}
                      to{" "}
                      <span className="font-medium">
                        {currentPage * pageSize > pagination.total_tickets
                          ? pagination.total_tickets
                          : currentPage * pageSize}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium">
                        {pagination.total_tickets}
                      </span>{" "}
                      results
                    </p>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      className={`px-3 py-1 rounded ${
                        currentPage === 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                      onClick={() =>
                        currentPage > 1 && handlePageChange(currentPage - 1)
                      }
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>

                    {[...Array(totalPages).keys()].map((number) => (
                      <button
                        key={number + 1}
                        className={`px-3 py-1 rounded ${
                          currentPage === number + 1
                            ? "bg-green-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                        onClick={() => handlePageChange(number + 1)}
                      >
                        {number + 1}
                      </button>
                    ))}

                    <button
                      className={`px-3 py-1 rounded ${
                        currentPage === totalPages
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                      onClick={() =>
                        currentPage < totalPages &&
                        handlePageChange(currentPage + 1)
                      }
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Modal */}
          {isModalOpen && selectedInquiry && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 dark:bg-opacity-50 dark:bg-gray-900">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl dark:bg-gray-800">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold dark:text-white">
                      Inquiry Details
                    </h2>
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      onClick={closeModal}
                    >
                      &times;
                    </button>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm text-gray-500 mb-1 dark:text-gray-200">
                      Inquiry ID: {selectedInquiry.id}
                    </p>
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium dark:text-white">
                        {selectedInquiry.topic}
                      </h3>
                      <span
                        className={`px-3 py-1 text-sm rounded-full ${
                          selectedInquiry.status === "resolved"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {selectedInquiry.status === "resolved"
                          ? "Resolved"
                          : "Pending"}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded mb-6 dark:bg-gray-700 dark:text-white">
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Submitted by
                      </p>
                      <p>{selectedInquiry.name}</p>
                    </div>
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Date
                      </p>
                      <p>{selectedInquiry.date}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Description
                      </p>
                      <p className="mt-1">{selectedInquiry.description}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-sm font-medium text-gray-500 mb-2 dark:text-gray-300">
                      Update Status
                    </p>
                    <div className="flex space-x-3">
                      <button
                        className={`px-4 py-2 rounded ${
                          selectedInquiry.status === "pending"
                            ? "bg-red-600 text-white"
                            : "bg-red-100 text-red-800 hover:bg-red-200"
                        }`}
                        onClick={() => handleStatusChange("pending")}
                      >
                        Mark as Pending
                      </button>
                      <button
                        className={`px-4 py-2 rounded ${
                          selectedInquiry.status === "resolved"
                            ? "bg-green-600 text-white"
                            : "bg-green-100 text-green-800 hover:bg-green-200"
                        }`}
                        onClick={() => handleStatusChange("resolved")}
                      >
                        Mark as Resolved
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-b-lg flex justify-end dark:bg-gray-700">
                  <button
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminSupportPage;
