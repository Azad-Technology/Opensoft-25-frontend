import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "../../components/Sidebar";
import Layout from "../../components/employeeCompo/Layout";
import ChangePasswordModal from "../../components/employeeCompo/ChangePAsswordModal";

import {
  User,
  Mail,
  Phone,
  Building2,
  Calendar,
  Award,
  BookOpen,
  Briefcase,
  GraduationCap,
  Clock,
  FileText,
  Shield,
  Settings,
  Edit,
  Key,
  CalendarRange,
  FileSpreadsheet,
  MapPin,
  UserCheck,
  Star,
  CheckCircle2,
  FileCheck,
  BookCheck,
  Moon,
  Sun,
} from "lucide-react";
import { useUserData } from "../../contexts/UserContext";
import { useAuth } from "../../contexts/AuthContext";
import { div } from "framer-motion/client";

function Profile() {
  const [activeTab, setActiveTab] = useState("basic");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { profileData, fetchProfileData } = useUserData();
  const { token } = useAuth()

  useEffect(() => {
    fetchProfileData();
  }, [token]);

  // Toggle dark mode

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleDownload = (docName) => {
    alert(`Downloading ${docName}...`);
  };

  const handleLeaveRequest = () => {
    alert("Opening leave request form...");
  };

  const handlePayslip = () => {
    alert("Opening latest payslip...");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "basic":
        return (<div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={tabVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <User className="w-5 h-5 text-deloitte-green" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Full Name
                  </p>
                  <p className="font-medium dark:text-white">
                    {profileData?.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Building2 className="w-5 h-5 text-deloitte-green" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Department
                  </p>
                  <p className="font-medium dark:text-white">
                    {profileData?.department}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="w-5 h-5 text-deloitte-green" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Location
                  </p>
                  <p className="font-medium dark:text-white">
                    {profileData?.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <UserCheck className="w-5 h-5 text-deloitte-green" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Reporting Manager
                  </p>
                  <p className="font-medium dark:text-white">
                    {profileData?.manager}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-deloitte-green" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Email
                  </p>
                  <p className="font-medium dark:text-white">
                    {profileData?.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-deloitte-green" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Phone
                  </p>
                  <p className="font-medium dark:text-white">
                    {profileData?.phone}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Calendar className="w-5 h-5 text-deloitte-green" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Date of Joining
                  </p>
                  <p className="font-medium dark:text-white">
                    {profileData?.doj}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        );
      case "background":
        return (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={tabVariants}
            className="space-y-6"
          >
            <div className="border-l-4 border-deloitte-green pl-4">
              <h3 className="font-semibold flex items-center gap-2 dark:text-white">
                <Briefcase className="w-5 h-5" />
                Current Role
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Lead technology consultant specializing in digital
                transformation projects. Responsible for client engagement,
                solution architecture, and team leadership.
              </p>
            </div>
            <div className="border-l-4 border-deloitte-green pl-4">
              <h3 className="font-semibold flex items-center gap-2 dark:text-white">
                <Award className="w-5 h-5" />
                Skills & Certifications
              </h3>
              <div className="mt-2 space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Skills
                  </h4>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {profileData?.backgroundDetails.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-deloitte-green/10 dark:bg-deloitte-green/20 text-deloitte-green dark:text-green-300 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Certifications
                  </h4>
                  <ul className="mt-1 space-y-1">
                    {profileData?.backgroundDetails.certifications.map(
                      (cert) => (
                        <li
                          key={cert}
                          className="flex items-center gap-2 dark:text-gray-200"
                        >
                          <CheckCircle2 className="w-4 h-4 text-deloitte-green" />
                          {cert}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div className="border-l-4 border-deloitte-green pl-4">
              <h3 className="font-semibold flex items-center gap-2 dark:text-white">
                <BookOpen className="w-5 h-5" />
                Education
              </h3>
              <div className="mt-2 space-y-2">
                {profileData?.backgroundDetails.education.map((edu) => (
                  <div
                    key={edu.degree}
                    className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg"
                  >
                    <p className="font-medium dark:text-white">{edu.degree}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {edu.institution}, {edu.year}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      // case "performance":
      //   return (
      //     <motion.div
      //       initial="hidden"
      //       animate="visible"
      //       variants={tabVariants}
      //       className="space-y-6"
      //     >
      //       <div className="bg-deloitte-green/5 dark:bg-deloitte-green/10 p-4 rounded-lg">
      //         <div className="flex items-center gap-4">
      //           <Star className="w-8 h-8 text-deloitte-green" />
      //           <div>
      //             <p className="text-sm text-gray-500 dark:text-gray-400">
      //               Current Performance Rating
      //             </p>
      //             <p className="text-2xl font-bold dark:text-white">
      //               {profileData.performance.currentRating}/5.0
      //             </p>
      //           </div>
      //         </div>
      //       </div>
      //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      //         <div>
      //           <h3 className="font-semibold mb-3 dark:text-white">
      //             Ongoing Projects
      //           </h3>
      //           {profileData.performance.ongoingProjects.map((project) => (
      //             <div
      //               key={project.name}
      //               className="mb-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"
      //             >
      //               <p className="font-medium dark:text-white">
      //                 {project.name}
      //               </p>
      //               <p className="text-sm text-gray-500 dark:text-gray-400">
      //                 {project.role}
      //               </p>
      //               <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
      //                 <div
      //                   className="h-full bg-deloitte-green rounded-full"
      //                   style={{ width: `${project.completion}%` }}
      //                 />
      //               </div>
      //               <p className="text-sm text-right mt-1 dark:text-gray-300">
      //                 {project.completion}% Complete
      //               </p>
      //             </div>
      //           ))}
      //         </div>
      //         <div>
      //           <h3 className="font-semibold mb-3 dark:text-white">
      //             Recent Achievements
      //           </h3>
      //           <ul className="space-y-2">
      //             {profileData.performance.achievements.map((achievement) => (
      //               <li
      //                 key={achievement}
      //                 className="flex items-start gap-2 dark:text-gray-200"
      //               >
      //                 <Award className="w-5 h-5 text-deloitte-green flex-shrink-0 mt-1" />
      //                 <span>{achievement}</span>
      //               </li>
      //             ))}
      //           </ul>
      //         </div>
      //       </div>
      //     // </motion.div>
      //   );
      case "documents":
        return (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={tabVariants}
            className="space-y-6"
          >
            <div>
              <h3 className="font-semibold mb-3 dark:text-white">
                Compliance Documents
              </h3>
              <div className="space-y-3">
                {profileData?.documents.compliance.map((doc) => (
                  <div
                    key={doc.name}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex justify-between items-center"
                  >
                    <div className="flex items-center gap-3">
                      <FileCheck className="w-5 h-5 text-deloitte-green" />
                      <div>
                        <p className="font-medium dark:text-white">
                          {doc.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Due: {doc.date}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${doc.status === "Completed"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        }`}
                    >
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3 dark:text-white">
                HR Documents
              </h3>
              <div className="space-y-3">
                {profileData?.documents.hrDocs.map((doc) => (
                  <div
                    key={doc.name}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex justify-between items-center"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-deloitte-green" />
                      <div>
                        <p className="font-medium dark:text-white">
                          {doc.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Uploaded: {doc.uploadDate}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownload(doc.name)}
                      className="px-3 py-1 text-sm border border-deloitte-green text-deloitte-green dark:text-green-300 rounded-lg hover:bg-deloitte-green/10 dark:hover:bg-deloitte-green/20 transition-colors"
                    >
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div
        className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors `}
      >
        {/* Header */}

        {/* Profile Content */}
        <div className="container mx-4 px-4 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-colors ">
            {/* Profile Header */}
            <div className="bg-deloitte-green/10 dark:bg-deloitte-green/5 p-6 transition-colors ">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <motion.img
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  src={profileData?.profilePic}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-700 shadow-lg"
                />
                <div className="flex-1 text-center md:text-left">
                  <motion.h2
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-2xl font-bold text-deloitte-black dark:text-white transition-colors "
                  >
                    {profileData?.name}
                  </motion.h2>
                  <motion.p
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-deloitte-darkGray dark:text-gray-300 transition-colors "
                  >
                    {profileData?.jobTitle}
                  </motion.p>
                  <motion.p
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm text-gray-500 dark:text-gray-400 transition-colors"
                  >
                    Employee ID: {profileData?.employeeId}
                  </motion.p>
                </div>
                <div className="flex gap-2">

                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 border border-green-600 text-green-600 dark:text-green-300 rounded-lg hover:bg-green-600/10 transition-colors"
                  >
                    <Key className="w-4 h-4" />
                    Change Password
                  </button>

                  <ChangePasswordModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b dark:border-gray-700 transition-colors ">
              <nav className="flex gap-4 px-6">
                {["basic", "background", "documents"].map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-2 border-b-2 transition-colors  ${activeTab === tab
                        ? "border-deloitte-green text-deloitte-green dark:text-green-300"
                        : "border-transparent text-gray-500 dark:text-gray-400 hover:text-deloitte-green dark:hover:text-green-300"
                        }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ),
                )}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6 dark:text-white transition-colors ">
              {renderTabContent()}
            </div>
          </div>

          {/* Quick Actions */}
          {/* <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <button
              onClick={handleLeaveRequest}
              className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-md hover:shadow-lg transition-all "
            >
              <CalendarRange className="w-5 h-5 text-deloitte-green" />
              <span>Request Leave</span>
            </button>
            <button
              onClick={handlePayslip}
              className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-md hover:shadow-lg transition-all "
            >
              <FileSpreadsheet className="w-5 h-5 text-deloitte-green" />
              <span>View Payslip</span>
            </button>
            <button
              onClick={() => handleDownload("HR Documents")}
              className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-md hover:shadow-lg transition-all "
            >
              <FileText className="w-5 h-5 text-deloitte-green" />
              <span>HR Documents</span>
            </button>
            <button className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-md hover:shadow-lg transition-all ">
              <Settings className="w-5 h-5 text-deloitte-green" />
              <span>Settings</span>
            </button>
          </motion.div> */}
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
