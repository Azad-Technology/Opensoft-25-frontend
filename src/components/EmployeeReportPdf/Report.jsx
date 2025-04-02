import React from "react";
import { Document, Page, Text, View, StyleSheet, PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { styles } from "./Styles";


const EmployeeReportPDF = ({ employeeData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Employee Performance Report</Text>
          <Text style={styles.subtitle}>Generated on {new Date().toLocaleDateString()}</Text>
        </View>
      </View>

      {/* Employee Info Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Employee Information</Text>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.text}>Name: <Text style={styles.bold}>{employeeData.user.name}</Text></Text>
            <Text style={styles.text}>Position: <Text style={styles.bold}>{employeeData.user.position}</Text></Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.text}>Department: <Text style={styles.bold}>{employeeData.user.department}</Text></Text>
            <Text style={styles.text}>Email: <Text style={styles.bold}>{employeeData.user.email}</Text></Text>
          </View>
        </View>
      </View>

      {/* Performance Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Performance Summary</Text>
        <Text style={styles.text}>Overall Rating: <Text style={styles.bold}>{employeeData.userPerformance.rating}/5.0</Text></Text>
        <Text style={styles.text}>Manager Feedback:</Text>
        <Text style={styles.text}>{employeeData.userPerformance.managerFeedback}</Text>
        
        <Text style={[styles.text, styles.bold, { marginTop: 10 }]}>Strengths:</Text>
        <View style={styles.flexRow}>
          {employeeData.userPerformance.strengths.map((strength, index) => (
            <Text key={index} style={styles.tag}>{strength}</Text>
          ))}
        </View>
        
        <Text style={[styles.text, styles.bold, { marginTop: 10 }]}>Areas for Improvement:</Text>
        <View style={styles.flexRow}>
          {employeeData.userPerformance.improvements.map((improvement, index) => (
            <Text key={index} style={[styles.tag, styles.improvementTag]}>{improvement}</Text>
          ))}
        </View>
      </View>

      {/* Vibe Trend Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emotional Well-being</Text>
        <Text style={styles.text}>Based on {employeeData.userVibes.length} daily check-ins</Text>
        
        <View style={styles.vibeSection}>
          {["Frustrated", "Sad", "Okay", "Happy", "Excited"].map((vibe) => {
            const count = employeeData.userVibes.filter(v => v.vibe.toLowerCase() === vibe.toLowerCase()).length;
            const percentage = employeeData.userVibes.length > 0 
              ? Math.round((count / employeeData.userVibes.length) * 100) 
              : 0;
            
            return (
              <View key={vibe} style={styles.vibeStat}>
                <Text style={styles.text}>{vibe}</Text>
                <Text style={[styles.text, styles.bold]}>{count}</Text>
                <Text style={styles.text}>{percentage}%</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Activity Levels Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Activity Summary</Text>
        <Text style={styles.text}>Average daily activity metrics:</Text>
        
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.text}>
              Teams Messages: <Text style={styles.bold}>
                {Math.round(employeeData.userActivities.reduce((sum, a) => sum + a.teamsMessages, 0) / employeeData.userActivities.length)}
              </Text>
            </Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.text}>
              Emails: <Text style={styles.bold}>
                {Math.round(employeeData.userActivities.reduce((sum, a) => sum + a.emails, 0) / employeeData.userActivities.length)}
              </Text>
            </Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.text}>
              Meetings: <Text style={styles.bold}>
                {Math.round(employeeData.userActivities.reduce((sum, a) => sum + a.meetings, 0) / employeeData.userActivities.length)}
              </Text>
            </Text>
          </View>
        </View>
      </View>
      
      {/* Recognition Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recognitions & Achievements</Text>
        
        {employeeData.userRecognitions.length > 0 ? (
          employeeData.userRecognitions.map((recognition, index) => (
            <View key={index} style={{ marginBottom: 10, padding: 8, backgroundColor: "#F5F7FA", borderRadius: 4 }}>
              <Text style={[styles.text, styles.bold]}>{recognition.type}</Text>
              <Text style={styles.text}>{recognition.description}</Text>
              <View style={styles.row}>
                <Text style={[styles.text, { fontSize: 10 }]}>Date: {new Date(recognition.date).toLocaleDateString()}</Text>
                <Text style={[styles.text, { fontSize: 10 }]}>Given by: {recognition.givenBy}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.text}>No recognitions recorded.</Text>
        )}
      </View>

      {/* Leave History Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Leave History</Text>
        
        {employeeData.userLeaves.length > 0 ? (
          <View>
            <View style={[styles.leaveRow, styles.leaveHeader]}>
              <Text style={styles.leaveCol}>Date Range</Text>
              <Text style={styles.leaveCol}>Reason</Text>
              <Text style={styles.leaveCol}>Status</Text>
            </View>
            
            {employeeData.userLeaves.map((leave, index) => (
              <View key={index} style={styles.leaveRow}>
                <Text style={styles.leaveCol}>
                  {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                </Text>
                <Text style={styles.leaveCol}>{leave.reason}</Text>
                <Text style={[
                  styles.leaveCol, 
                  styles.statusBadge, 
                  leave.status === "approved" ? styles.approved : 
                  leave.status === "pending" ? styles.pending : styles.rejected
                ]}>
                  {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.text}>No leave records found.</Text>
        )}
      </View>

      {/* Projects Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Assigned Projects</Text>
        
        {employeeData.projectData.map((project, index) => (
          <View key={index} style={styles.projectCard}>
            <Text style={[styles.text, styles.bold]}>{project.name}</Text>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.text}>Priority: {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.text}>Status: {project.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</Text>
              </View>
            </View>
            <Text style={styles.text}>
              Timeline: {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
            </Text>
            <Text style={styles.text}>Team: {project.assignees.join(', ')}</Text>
            <Text style={styles.text}>Progress: {project.progress}%</Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${project.progress}%`, 
                    backgroundColor: project.progress < 30 ? "#F44336" : 
                                    project.progress < 70 ? "#FFC107" : "#4CAF50" 
                  }
                ]} 
              />
            </View>
          </View>
        ))}
      </View>
      
      {/* Footer */}
      <View style={styles.footer}>
        <Text>This report is confidential and intended for internal use only • Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</Text>
      </View>
    </Page>
  </Document>
);


const EmployeeReportGenerator = ({ employeeData }) => {
  return (
    <div className="pdf-report-container">
      {/* Download Button */}
      <div className="flex justify-between items-center mb-6">
        <PDFDownloadLink
          document={<EmployeeReportPDF employeeData={employeeData} />}
          fileName={`${employeeData.user.name.replace(/\s+/g, '_')}_performance_report.pdf`}
          className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {({ loading }) => (
            <>
              {loading ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              )}
              {loading ? "Generating PDF..." : "Download Report"}
            </>
          )}
        </PDFDownloadLink>
      </div>

      {/* PDF Viewer */}
      <div className="pdf-viewer-container w-full overflow-hidden rounded-lg border border-gray-200 shadow-lg" style={{ height: "800px" }}>
        <PDFViewer style={{ width: "100%", height: "100%" }}>
          <EmployeeReportPDF employeeData={employeeData} />
        </PDFViewer>
      </div>
    </div>
  );
};

export default EmployeeReportGenerator;