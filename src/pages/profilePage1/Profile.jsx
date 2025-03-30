import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User, Mail, Phone, Building2, Calendar, Award, BookOpen,
  Briefcase, GraduationCap, Clock, FileText, Shield, Settings,
  Edit, Key, CalendarRange, FileSpreadsheet, MapPin, UserCheck,
  Star, CheckCircle2, FileCheck, BookCheck
} from 'lucide-react';

function Profile() {
  const [activeTab, setActiveTab] = useState('basic');
  
  const profileData = {
    name: "John Doe",
    profilePic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    employeeId: "DEL123456",
    jobTitle: "Senior Consultant",
    department: "Technology Consulting",
    doj: "2022-01-15",
    location: "New York",
    manager: "Jane Smith",
    email: "john.doe@deloitte.com",
    phone: "+1 (555) 123-4567",
    extension: "4567",
    backgroundDetails: {
      employmentType: "Full-time",
      skills: [
        "Cloud Architecture",
        "Digital Transformation",
        "Project Management",
        "Solution Design"
      ],
      certifications: [
        "AWS Certified Solutions Architect",
        "Certified Scrum Master",
        "ITIL Foundation",
        "PMP"
      ],
      experience: [
        {
          company: "Previous Tech Corp",
          role: "Technology Consultant",
          duration: "2019-2022"
        },
        {
          company: "Start-up Solutions",
          role: "Senior Developer",
          duration: "2017-2019"
        }
      ],
      education: [
        {
          degree: "Master of Science in Computer Science",
          institution: "Stanford University",
          year: "2017"
        },
        {
          degree: "Bachelor of Engineering",
          institution: "MIT",
          year: "2015"
        }
      ]
    },
    performance: {
      currentRating: 4.5,
      lastReviewDate: "2023-12-15",
      achievements: [
        "Led digital transformation for Fortune 500 client",
        "Reduced system downtime by 35%",
        "Mentored 5 junior consultants"
      ],
      ongoingProjects: [
        {
          name: "Cloud Migration Project",
          role: "Technical Lead",
          completion: 75
        },
        {
          name: "Digital Banking Platform",
          role: "Solution Architect",
          completion: 40
        }
      ]
    },
    documents: {
      compliance: [
        {
          name: "Code of Conduct",
          status: "Completed",
          date: "2024-01-15"
        },
        {
          name: "Data Privacy Training",
          status: "Due",
          date: "2024-03-30"
        }
      ],
      hrDocs: [
        {
          name: "Offer Letter",
          type: "PDF",
          uploadDate: "2022-01-10"
        },
        {
          name: "Latest Payslip",
          type: "PDF",
          uploadDate: "2024-02-28"
        }
      ]
    }
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
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
      case 'basic':
        return (
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
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{profileData.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Building2 className="w-5 h-5 text-deloitte-green" />
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="font-medium">{profileData.department}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="w-5 h-5 text-deloitte-green" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{profileData.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <UserCheck className="w-5 h-5 text-deloitte-green" />
                <div>
                  <p className="text-sm text-gray-500">Reporting Manager</p>
                  <p className="font-medium">{profileData.manager}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-deloitte-green" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{profileData.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-deloitte-green" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{profileData.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Calendar className="w-5 h-5 text-deloitte-green" />
                <div>
                  <p className="text-sm text-gray-500">Date of Joining</p>
                  <p className="font-medium">{profileData.doj}</p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'background':
        return (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={tabVariants}
            className="space-y-6"
          >
            <div className="border-l-4 border-deloitte-green pl-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Current Role
              </h3>
              <p className="mt-2 text-gray-600">
                Lead technology consultant specializing in digital transformation projects.
                Responsible for client engagement, solution architecture, and team leadership.
              </p>
            </div>
            <div className="border-l-4 border-deloitte-green pl-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Award className="w-5 h-5" />
                Skills & Certifications
              </h3>
              <div className="mt-2 space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Skills</h4>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {profileData.backgroundDetails.skills.map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-deloitte-green/10 text-deloitte-green rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Certifications</h4>
                  <ul className="mt-1 space-y-1">
                    {profileData.backgroundDetails.certifications.map((cert) => (
                      <li key={cert} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-deloitte-green" />
                        {cert}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="border-l-4 border-deloitte-green pl-4">
              <h3 className="font-semibold flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Education
              </h3>
              <div className="mt-2 space-y-2">
                {profileData.backgroundDetails.education.map((edu) => (
                  <div key={edu.degree} className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium">{edu.degree}</p>
                    <p className="text-sm text-gray-500">{edu.institution}, {edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      case 'performance':
        return (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={tabVariants}
            className="space-y-6"
          >
            <div className="bg-deloitte-green/5 p-4 rounded-lg">
              <div className="flex items-center gap-4">
                <Star className="w-8 h-8 text-deloitte-green" />
                <div>
                  <p className="text-sm text-gray-500">Current Performance Rating</p>
                  <p className="text-2xl font-bold">{profileData.performance.currentRating}/5.0</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Ongoing Projects</h3>
                {profileData.performance.ongoingProjects.map((project) => (
                  <div key={project.name} className="mb-4 bg-white p-4 rounded-lg shadow-sm">
                    <p className="font-medium">{project.name}</p>
                    <p className="text-sm text-gray-500">{project.role}</p>
                    <div className="mt-2 h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-deloitte-green rounded-full"
                        style={{ width: `${project.completion}%` }}
                      />
                    </div>
                    <p className="text-sm text-right mt-1">{project.completion}% Complete</p>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="font-semibold mb-3">Recent Achievements</h3>
                <ul className="space-y-2">
                  {profileData.performance.achievements.map((achievement) => (
                    <li key={achievement} className="flex items-start gap-2">
                      <Award className="w-5 h-5 text-deloitte-green flex-shrink-0 mt-1" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        );
      case 'documents':
        return (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={tabVariants}
            className="space-y-6"
          >
            <div>
              <h3 className="font-semibold mb-3">Compliance Documents</h3>
              <div className="space-y-3">
                {profileData.documents.compliance.map((doc) => (
                  <div key={doc.name} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <FileCheck className="w-5 h-5 text-deloitte-green" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-gray-500">Due: {doc.date}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      doc.status === 'Completed' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3">HR Documents</h3>
              <div className="space-y-3">
                {profileData.documents.hrDocs.map((doc) => (
                  <div key={doc.name} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-deloitte-green" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-gray-500">Uploaded: {doc.uploadDate}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownload(doc.name)}
                      className="px-3 py-1 text-sm border border-deloitte-green text-deloitte-green rounded-lg hover:bg-deloitte-green/10 transition-colors"
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
    <div className={`min-h-screen bg-gray-50`}>
      {/* Header */}
      <div className="bg-deloitte-black text-white py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Employee Profile</h1>
          
        </div>
      </div>

      {/* Profile Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-deloitte-darkGray rounded-lg shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-deloitte-green/10 dark:bg-deloitte-green/5 p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                src={profileData.profilePic}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
              <div className="flex-1 text-center md:text-left">
                <motion.h2
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-2xl font-bold text-deloitte-black dark:text-white"
                >
                  {profileData.name}
                </motion.h2>
                <motion.p
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-deloitte-darkGray dark:text-deloitte-lightGray"
                >
                  {profileData.jobTitle}
                </motion.p>
                <motion.p
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-sm text-gray-500 dark:text-gray-400"
                >
                  Employee ID: {profileData.employeeId}
                </motion.p>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-deloitte-green text-white rounded-lg hover:bg-deloitte-green/90 transition-colors">
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-deloitte-green text-deloitte-green dark:text-white rounded-lg hover:bg-deloitte-green/10 transition-colors">
                  <Key className="w-4 h-4" />
                  Change Password
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b dark:border-gray-700">
            <nav className="flex gap-4 px-6">
              {['basic', 'background', 'performance','documents'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 border-b-2 transition-colors ${
                    activeTab === tab
                      ? 'border-deloitte-green text-deloitte-green dark:text-white'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-deloitte-green dark:hover:text-white'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6 dark:text-white">
            {renderTabContent()}
          </div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <button
            onClick={handleLeaveRequest}
            className="flex items-center gap-3 p-4 bg-white dark:bg-deloitte-darkGray dark:text-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <CalendarRange className="w-5 h-5 text-deloitte-green" />
            <span>Request Leave</span>
          </button>
          <button
            onClick={handlePayslip}
            className="flex items-center gap-3 p-4 bg-white dark:bg-deloitte-darkGray dark:text-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <FileSpreadsheet className="w-5 h-5 text-deloitte-green" />
            <span>View Payslip</span>
          </button>
          <button
            onClick={() => handleDownload('HR Documents')}
            className="flex items-center gap-3 p-4 bg-white dark:bg-deloitte-darkGray dark:text-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <FileText className="w-5 h-5 text-deloitte-green" />
            <span>HR Documents</span>
          </button>
          <button className="flex items-center gap-3 p-4 bg-white dark:bg-deloitte-darkGray dark:text-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Settings className="w-5 h-5 text-deloitte-green" />
            <span>Settings</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default Profile;