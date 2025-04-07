import React, { useState, useEffect } from "react";
import { Document, Page, Text, View, StyleSheet, PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import {styles} from "./Styles.jsx"

// Define styles directly in the file to ensure they're available


const EmployeeReportPDF = ({ data }) => {
  // Format the JSON data structure for use in the report
  const employeeInfo = data.employee_info || {};
  const currentState = data.current_state || {};
  const vibeTrend = data.vibe_trend || [];
  const intentAnalysis = data.intent_analysis || {};
  const chatAnalysis = data.chat_analysis || {};
  const performance = data.performance || {};
  const onboarding = data.onboarding_experience || {};
  const leaveAnalysis = data.leave_analysis || {};
  const awards = data.awards_and_recognition || {};
  const communicationActivity = data.communication_activity || {};

  // Helper function to handle null values
  const formatValue = (value, defaultValue = "?") => {
    if (value === null || value === undefined) return defaultValue;
    // Check if the value is an object and convert to string representation
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value);
    }
    return value;
  };

  // Calculate the risk level
  const getRiskLevelStyle = (level) => {
    if (!level) return styles.lowRisk;
    if (level >= 4) return styles.highRisk;
    if (level >= 2) return styles.mediumRisk;
    return styles.lowRisk;
  };

  // Get risk level color
  const getRiskLevelColor = (level) => {
    if (!level) return '#d6e9c6'; // low risk color
    if (level >= 4) return '#ebccd1'; // high risk color
    if (level >= 2) return '#faebcc'; // medium risk color
    return '#d6e9c6'; // low risk color
  };

  // Helper function to get sentiment style
  const getSentimentStyle = (sentiment) => {
    if (!sentiment) return styles.neutral;
    const sentimentLower = sentiment.toLowerCase();
    if (sentimentLower.includes('positive') || sentimentLower.includes('good')) return styles.positive;
    if (sentimentLower.includes('negative') || sentimentLower.includes('poor')) return styles.negative;
    return styles.neutral;
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "?";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (e) {
      return "?";
    }
  };

  // Calculate joining date
  const joiningDate = formatDate(employeeInfo.joining_date);
  
  // Get monthly leave data - using the correct structure from the JSON
  const monthlyLeaveData = Object.entries(leaveAnalysis.monthly_breakdown || {}).map(([month, values]) => ({
    month,
    sick: formatValue(values.sick, 0),
    casual: formatValue(values.casual, 0),
    annual: formatValue(values.annual, 0),
    unpaid: formatValue(values.unpaid, 0),
    other: formatValue(values.other, 0),
    total: (values.sick || 0) + (values.casual || 0) + (values.annual || 0) + (values.unpaid || 0) + (values.other || 0)
  })).slice(0, 6);  // Show only last 6 months

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>Employee Performance Report</Text>
          <Text style={styles.subtitle}>Generated on {new Date().toLocaleDateString()} for {formatValue(employeeInfo.name)}</Text>
        </View>

        {/* Employee Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Employee Information</Text>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.text}>Name: <Text style={styles.bold}>{formatValue(employeeInfo.name)}</Text></Text>
              <Text style={styles.text}>Employee ID: <Text style={styles.bold}>{formatValue(employeeInfo.employee_id)}</Text></Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.text}>Email: <Text style={styles.bold}>{formatValue(employeeInfo.email)}</Text></Text>
              <Text style={styles.text}>Joining Date: <Text style={styles.bold}>{joiningDate}</Text></Text>
            </View>
          </View>
        </View>

        {/* Current State & Risk Assessment */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current State & Risk Assessment</Text>
          
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.text}>Current Vibe Score: <Text style={styles.bold}>{formatValue(currentState.vibe_score)}/5</Text></Text>
              <Text style={styles.text}>Last Check-in: <Text style={styles.bold}>{formatDate(currentState.last_check_in)}</Text></Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.text}>Risk Assessment: <Text style={styles.bold}>{formatValue(currentState.risk_assessment)}/5</Text></Text>
              <Text style={styles.text}>Current Vibe: <Text style={styles.bold}>{formatValue(vibeTrend[0]?.vibe)}</Text></Text>
            </View>
          </View>
          
          <View style={[styles.riskBox, getRiskLevelStyle(currentState.risk_assessment)]}>
            <Text style={styles.text}>
              <Text style={styles.bold}>Primary Issues: </Text>
              {formatValue(intentAnalysis.primary_issues)}
            </Text>
          </View>
          
          <Text style={styles.text}>Intent Analysis Updated At: <Text style={styles.bold}>{formatDate(intentAnalysis.updated_at)}</Text></Text>
        </View>

        {/* Wellbeing Analysis */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Wellbeing Analysis</Text>
          
          <Text style={styles.text}>Composite Score: <Text style={styles.bold}>{formatValue(chatAnalysis.wellbeing_analysis?.composite_score)}/100</Text></Text>
          
          <View style={{ marginTop: 10 }}>
            {Object.entries(chatAnalysis.wellbeing_analysis?.component_breakdown || {}).map(([key, value], index) => (
              <View key={index} style={styles.tagBox}>
                <View style={styles.row}>
                  <View style={styles.col}>
                    <Text style={[styles.text, styles.bold]}>{key.replace(/_/g, " ").charAt(0).toUpperCase() + key.replace(/_/g, " ").slice(1)}</Text>
                  </View>
                  <View style={styles.col}>
                    <Text style={styles.text}>Score: {formatValue(value.score)}/30</Text>
                  </View>
                </View>
                <Text style={styles.text}>{formatValue(value.summary)}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* IMPROVED Chat Analysis Section */}
        <View style={styles.section} break>
          <Text style={styles.sectionTitle}>Chat Analysis</Text>
          
          <View style={styles.chatAnalysisBox}>
            <Text style={[styles.text, styles.bold, { fontSize: 11 }]}>Communication Insights</Text>
            
            <View style={styles.row}>
              <View style={styles.metricBox}>
                <Text style={styles.metricTitle}>Risk Assessment</Text>
                <View style={styles.riskRow}>
                  <View style={[styles.riskIndicator, { backgroundColor: getRiskLevelColor(chatAnalysis.risk_assessment?.risk_level) }]} />
                  <Text style={styles.metricValue}>{formatValue(chatAnalysis.risk_assessment?.risk_level)}/5</Text>
                </View>
              </View>
              
              <View style={styles.metricBox}>
                <Text style={styles.metricTitle}>Engagement Level</Text>
                <Text style={styles.metricValue}>{formatValue(chatAnalysis.engagement_level || "Medium")}</Text>
              </View>
              
              <View style={styles.metricBox}>
                <Text style={styles.metricTitle}>Communication Style</Text>
                <Text style={styles.metricValue}>{formatValue(chatAnalysis.communication_style || "Collaborative")}</Text>
              </View>
            </View>

            <View style={styles.horizontalDivider} />
            
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={[styles.text, styles.bold]}>Key Topics:</Text>
                <View style={styles.listContainer}>
                  {(chatAnalysis.key_topics || ["Project Updates", "Technical Issues", "Team Collaboration"]).map((topic, index) => (
                    <Text key={index} style={styles.listItem}>• {formatValue(topic)}</Text>
                  ))}
                </View>
              </View>
              
              <View style={styles.col}>
                <Text style={[styles.text, styles.bold]}>Sentiment Analysis:</Text>
                {(chatAnalysis.sentiment_analysis || [
                  { topic: "Work-Life Balance", sentiment: "Positive" },
                  { topic: "Project Deadlines", sentiment: "Negative" },
                  { topic: "Team Dynamics", sentiment: "Neutral" }
                ]).map((item, index) => (
                  <View key={index} style={[styles.sentimentBox, getSentimentStyle(item.sentiment)]}>
                    <Text style={[styles.text, { fontSize: 9 }]}>
                      <Text style={styles.bold}>{formatValue(item.topic)}:</Text> {formatValue(item.sentiment)}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
            
            <View style={styles.horizontalDivider} />
            
            <View style={styles.insightBox}>
              <Text style={styles.insightTitle}>Summary Analysis</Text>
              <Text style={styles.text}>{formatValue(chatAnalysis.summary)}</Text>
            </View>
            
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={[styles.text, { marginTop: 8 }]}>Recommended Mentor: <Text style={styles.bold}>{formatValue(chatAnalysis.recommended_mentor)}</Text></Text>
              </View>
              <View style={styles.col}>
                <Text style={[styles.text, { marginTop: 8 }]}>Last Analyzed: <Text style={styles.bold}>{formatDate(chatAnalysis.last_analyzed || new Date())}</Text></Text>
              </View>
            </View>
          </View>
        </View>

        {/* Intent Analysis Tags */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Employee Engagement Analysis</Text>
    
          {(intentAnalysis.tags || []).map((tag, index) => (
            <View key={index} style={styles.tagBox}>
              <View style={styles.row}>
                <View style={styles.col}>
                  <Text style={[styles.text, styles.bold]}>{formatValue(tag.tag).replace(/_/g, " ")}</Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.text}>Priority : {(formatValue(tag.weight) * 100).toFixed(0) >60?"High":(formatValue(tag.weight) * 100).toFixed(0)>40?"Medium":"Low"}</Text>
                </View>
              </View>
              <Text style={styles.text}>Description: {formatValue(tag.description)}</Text>
              <Text style={styles.text}>Completed: <Text style={styles.bold}>{tag.completed === true ? "Yes" : tag.completed === false ? "No" : "?"}</Text></Text>
              {tag.summary && <Text style={[styles.text, { fontStyle: "italic" }]}>Summary: {formatValue(tag.summary)}</Text>}
            </View>
          ))}
        </View>

        {/* Vibe Trend Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mood Trend</Text>
          
          {vibeTrend.length > 0 ? (
            <View>
              <View style={styles.chart}>
                {vibeTrend.slice(0, 7).map((item, index) => (
                  <View key={index} style={{ alignItems: 'center' }}>
                    <View 
                      style={[
                        styles.bar, 
                        { height: (item.vibe_score || 0) * 15, backgroundColor: (item.vibe_score || 0) > 3 ? '#22c55e' : (item.vibe_score || 0) > 2 ? '#f59e0b' : '#ef4444' }
                      ]} 
                    />
                    <Text style={styles.chartLabel}>{formatDate(item.date)}</Text>
                  </View>
                ))}
              </View>
              
              <View style={styles.vibeSection}>
                {["Frustrated", "Sad", "Okay", "Happy", "Excited"].map((vibe) => {
                  const count = vibeTrend.filter(v => v.vibe === vibe).length;
                  const percentage = vibeTrend.length > 0 
                    ? Math.round((count / vibeTrend.length) * 100) 
                    : 0;
                  
                  return (
                    <View key={vibe} style={styles.vibeStat}>
                      <Text style={styles.text}>{vibe}</Text>
                      <Text style={styles.text}>{count}</Text>
                      <Text style={styles.text}>{percentage}%</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          ) : (
            <Text style={styles.noDataText}>No vibe data available</Text>
          )}
        </View>

        

        {/* Communication Activity - Simplified to match available data */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Communication Activity</Text>
          
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={[styles.text, styles.bold]}>Weekly Averages:</Text>
              <Text style={styles.text}>Teams Messages: <Text style={styles.bold}>{formatValue(communicationActivity.weekly_averages?.teams_messages)}</Text></Text>
              <Text style={styles.text}>Emails: <Text style={styles.bold}>{formatValue(communicationActivity.weekly_averages?.emails)}</Text></Text>
              <Text style={styles.text}>Meetings: <Text style={styles.bold}>{formatValue(communicationActivity.weekly_averages?.meetings)}</Text></Text>
              <Text style={styles.text}>Work Hours: <Text style={styles.bold}>{formatValue(communicationActivity.weekly_averages?.work_hours)}</Text></Text>
            </View>
            <View style={styles.col}>
              <Text style={[styles.text, styles.bold]}>Communication Scores:</Text>
              <Text style={styles.text}>Messages Score: <Text style={styles.bold}>{formatValue(communicationActivity.communication_scores?.messages_score)}%</Text></Text>
              <Text style={styles.text}>Emails Score: <Text style={styles.bold}>{formatValue(communicationActivity.communication_scores?.emails_score)}%</Text></Text>
              <Text style={styles.text}>Meetings Score: <Text style={styles.bold}>{formatValue(communicationActivity.communication_scores?.meetings_score)}%</Text></Text>
            </View>
          </View>
          
          <Text style={[styles.text, styles.bold, { marginTop: 10 }]}>Recent Activity:</Text>
          {(communicationActivity.activity_level || []).slice(0, 5).map((activity, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{formatDate(activity.date)}</Text>
              <Text style={styles.tableCell}>{formatValue(activity.teamsMessages)} msgs</Text>
              <Text style={styles.tableCell}>{formatValue(activity.emails)} emails</Text>
              <Text style={styles.tableCell}>{formatValue(activity.meetings)} meetings</Text>
              <Text style={styles.tableCell}>{formatValue(activity.work_hours)} hrs</Text>
            </View>
          ))}
        </View>


        {/* Leave Analysis */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Leave Analysis</Text>
          
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={[styles.text, styles.bold]}>Total Leaves:</Text>
              {Object.entries(leaveAnalysis.total_leaves || {}).map(([key, value], index) => (
                <Text key={index} style={styles.text}>{key.charAt(0).toUpperCase() + key.slice(1)}: <Text style={styles.bold}>{formatValue(value)}</Text></Text>
              ))}
            </View>
            <View style={styles.col}>
              <Text style={[styles.text, styles.bold]}>Recent Monthly Breakdown:</Text>
              <View style={[styles.leaveRow, styles.leaveHeader]}>
                <Text style={styles.leaveCol}>Month</Text>
                <Text style={styles.leaveCol}>Sick</Text>
                <Text style={styles.leaveCol}>Other</Text>
                <Text style={styles.leaveCol}>Unpaid</Text>
              </View>
              
              {monthlyLeaveData.slice(0, 3).map((item, index) => (
                <View key={index} style={styles.leaveRow}>
                  <Text style={styles.leaveCol}>{item.month}</Text>
                  <Text style={styles.leaveCol}>{item.sick}</Text>
                  <Text style={styles.leaveCol}>{item.other}</Text>
                  <Text style={styles.leaveCol}>{item.unpaid}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Awards and Recognition */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Awards and Recognition</Text>
          
          <Text style={styles.text}>Total Points: <Text style={styles.bold}>{formatValue(awards.total_points)}</Text></Text>
          
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={[styles.text, styles.bold, { marginTop: 5 }]}>Award Types:</Text>
              {(awards.award_types || []).length > 0 ? (
                <View style={styles.listContainer}>
                  {(awards.award_types || []).map((type, index) => (
                    <Text key={index} style={styles.listItem}>• {formatValue(type)}</Text>
                  ))}
                </View>
              ) : (
                <Text style={styles.noDataText}>No award types available</Text>
              )}
            </View>
            <View style={styles.col}>
              <Text style={[styles.text, styles.bold, { marginTop: 5 }]}>Recent Awards:</Text>
              {(awards.recent_awards || []).length > 0 ? (
                (awards.recent_awards || []).slice(0, 3).map((award, index) => (
                  <View key={index} style={{ marginBottom: 5, padding: 3, backgroundColor: "#F5F7FA" }}>
                    <Text style={[styles.text, styles.bold]}>{formatValue(award.type)}</Text>
                    <Text style={styles.text}>Points: {formatValue(award.points)}</Text>
                    <Text style={[styles.text, { fontSize: 8 }]}>Date: {formatDate(award.date)}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.noDataText}>No awards recorded</Text>
              )}
            </View>
          </View>
        </View>

        {/* Performance Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance Summary</Text>
          
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.text}>Current Rating: <Text style={styles.bold}>{formatValue(performance.current?.rating)}/5</Text></Text>
              <Text style={styles.text}>Feedback: <Text style={styles.bold}>{formatValue(performance.current?.feedback)}</Text></Text>
              <Text style={styles.text}>Period: <Text style={styles.bold}>{formatValue(performance.current?.period)}</Text></Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.text}>Performance Trend</Text>
              <View style={styles.chart}>
                {(performance.trend?.ratings || []).map((rating, index) => (
                  <View key={index} style={{ alignItems: 'center' }}>
                    <View 
                      style={[
                        styles.bar, 
                        { height: (rating || 0) * 15, backgroundColor: '#3b82f6' }
                      ]} 
                    />
                    <Text style={styles.chartLabel}>{formatValue(performance.trend?.periods?.[index])}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
          
          {/* Performance History */}
          <Text style={[styles.text, styles.bold, { marginTop: 10 }]}>Performance History</Text>
          {(performance.history || []).length > 0 ? (
            <View style={styles.tableContainer}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderCell}>Period</Text>
                <Text style={styles.tableHeaderCell}>Rating</Text>
                <Text style={styles.tableHeaderCell}>Feedback</Text>
              </View>
              {(performance.history || []).map((item, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{formatValue(item.period)}</Text>
                  <Text style={styles.tableCell}>{formatValue(item.rating)}/5</Text>
                  <Text style={styles.tableCell}>{formatValue(item.feedback)}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.noDataText}>No performance history available</Text>
          )}
        </View>

        {/* Onboarding Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Onboarding Experience</Text>
          
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.text}>Feedback: <Text style={styles.bold}>{formatValue(onboarding.feedback)}</Text></Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.text}>Mentor Assigned: <Text style={styles.bold}>{onboarding.mentor_assigned === true ? "Yes" : onboarding.mentor_assigned === false ? "No" : "?"}</Text></Text>
              <Text style={styles.text}>Training Completed: <Text style={styles.bold}>{onboarding.training_completed === true ? "Yes" : onboarding.training_completed === false ? "No" : "?"}</Text></Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>This report is confidential and intended for internal use only • Generated on {new Date().toLocaleDateString()}</Text>
        </View>
      </Page>
    </Document>
  );
};

// Component for the PDF generator with download button
const EmployeeReportGenerator = ({ employeeData }) => {
  // Client-side rendering check
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex items-center justify-center p-10 border border-gray-200 rounded-lg bg-gray-50 h-[600px]">
        <div className="text-center">
          <div className="inline-block animate-spin h-8 w-8 border-4 border-gray-300 border-t-blue-600 rounded-full mb-4"></div>
          <p className="text-gray-600">Loading PDF viewer...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pdf-report-container">
      {/* Download Button */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex-1">
          <h2 className="text-xl font-semibold">Employee Performance Report</h2>
          <p className="text-sm text-gray-500">For {employeeData.employee_info?.name || 'Employee'}</p>
        </div>
        <PDFDownloadLink
          document={<EmployeeReportPDF data={employeeData} />}
          fileName={`${employeeData.employee_info?.name?.replace(/\s+/g, '_') || 'employee'}_performance_report.pdf`}
          className="inline-flex h-10 items-center justify-center rounded-md bg-green-700 px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
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
        <PDFViewer width="100%" height="100%" className="w-full h-full">
          <EmployeeReportPDF data={employeeData} />
        </PDFViewer>
      </div>
    </div>
  );
};

export default EmployeeReportGenerator;