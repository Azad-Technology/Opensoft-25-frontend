import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
  },
  header: {
    marginBottom: 30,
    borderBottom: "2px solid #86BC25",  // Deloitte green
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0E0E0E",  // Deloitte uses black for headings
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    color: "#555555",  // Deloitte gray
    marginTop: 6,
    letterSpacing: 0.3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#0E0E0E",
    backgroundColor: "#F2F7ED",  // Light green background
    padding: 10,
    borderRadius: 4,
    borderLeft: "4px solid #86BC25",  // Deloitte green
  },
  section: {
    marginBottom: 25,
    paddingBottom: 20,
    borderBottom: "1px solid #E5E7EB",
  },
  text: {
    fontSize: 12,
    marginBottom: 6,
    color: "#333333",
    lineHeight: 1.5,
  },
  bold: {
    fontWeight: "bold",
    color: "#0E0E0E",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  col: {
    flex: 1,
    paddingHorizontal: 5,
  },
  flexRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
    gap: 6,
  },
  tag: {
    fontSize: 10,
    backgroundColor: "#E9F2DF",  // Light Deloitte green
    color: "#4B7B0B",  // Darker green
    padding: "4 10",
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
    fontWeight: "bold",
  },
  improvementTag: {
    backgroundColor: "#F7F7F7",  // Light gray
    color: "#555555",  // Deloitte gray
  },
  leaveRow: {
    flexDirection: "row",
    borderBottom: "1px solid #F3F4F6",
    paddingVertical: 8,
    alignItems: "center",
  },
  leaveCol: {
    flex: 1,
    fontSize: 11,
    padding: "5 8",
  },
  leaveHeader: {
    backgroundColor: "#F5F5F5",  // Deloitte light gray
    fontSize: 11,
    fontWeight: "bold",
    color: "#4B5563",
    borderBottom: "2px solid #E5E7EB",
  },
  statusBadge: {
    fontSize: 10,
    padding: "3 8",
    borderRadius: 12,
    textAlign: "center",
    maxWidth: 80,
    fontWeight: "bold",
  },
  approved: {
    backgroundColor: "#E9F2DF",  // Light Deloitte green
    color: "#4B7B0B",  // Darker green
  },
  pending: {
    backgroundColor: "#F7F7F7",  // Light gray
    color: "#555555",  // Deloitte gray
  },
  rejected: {
    backgroundColor: "#FBEAEA",  // Light red
    color: "#991B1B",
  },
  projectCard: {
    marginVertical: 10,
    padding: 12,
    borderRadius: 4,
    backgroundColor: "#F9FAFB",
    borderLeft: "3px solid #86BC25",  // Deloitte green
  },
  progressBar: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    marginTop: 8,
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
    backgroundColor: "#86BC25",  // Deloitte green
  },
  vibeSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 15,
    gap: 10,
  },
  vibeStat: {
    width: "30%",
    marginBottom: 12,
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
  },
  vibeStatHigh: {
    borderTopWidth: 3,
    borderTopColor: "#86BC25",  // Deloitte green
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0E0E0E",  // Deloitte black
    marginVertical: 5,
  },
  statLabel: {
    fontSize: 10,
    color: "#555555",  // Deloitte gray
    textAlign: "center",
  },
  statPercentage: {
    fontSize: 12,
    color: "#4B5563",
    fontWeight: "medium",
  },
  infoCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 4,
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  recognitionCard: {
    backgroundColor: "#F2F7ED",  // Light green background
    borderRadius: 4,
    padding: 12,
    marginBottom: 12,
    borderLeft: "3px solid #86BC25",  // Deloitte green
  },
  badge: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#FFFFFF",
    backgroundColor: "#86BC25",  // Deloitte green
    padding: "3 8",
    borderRadius: 12,
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    borderTop: "1px solid #E5E7EB",
    paddingTop: 10,
    fontSize: 10,
    color: "#555555",  // Deloitte gray
    textAlign: "center",
  },
  logo: {
    width: 50,
    height: 50,
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 8,
  },
  colorBar: {
    height: 4,
    width: "25%",
    backgroundColor: "#86BC25",  // Deloitte green
    borderRadius: 2,
    marginBottom: 15,
  },
  grid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  gridItem: {
    width: "48%",
    margin: "1%",
    padding: 10,
    backgroundColor: "#F9FAFB",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  metricTitle: {
    fontSize: 10,
    color: "#555555",  // Deloitte gray
    marginBottom: 5,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0E0E0E",  // Deloitte black
  },
  highlightBox: {
    backgroundColor: "#F2F7ED",  // Light green background
    borderRadius: 4,
    padding: 12,
    marginTop: 10,
    borderLeft: "4px solid #86BC25",  // Deloitte green
  },
  highlightText: {
    fontSize: 12,
    color: "#0E0E0E",  // Deloitte black
    fontStyle: "italic",
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E9F2DF",  // Light Deloitte green
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4B7B0B",  // Darker green
  },
  dateRange: {
    fontSize: 11,
    color: "#555555",  // Deloitte gray
    backgroundColor: "#F5F5F5",  // Deloitte light gray
    padding: "3 8",
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 4,
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  tableHeader: {
    backgroundColor: "#F5F5F5", // Deloitte light gray
  },
  tableCell: {
    padding: 8,
    fontSize: 11,
    textAlign: "left",
    flex: 1,
  },
  tableHeaderCell: {
    fontWeight: "bold",
    color: "#4B5563",
  },
  graphPlaceholder: {
    height: 120,
    backgroundColor: "#F9FAFB",
    borderRadius: 4,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
  },
  graphText: {
    fontSize: 12,
    color: "#555555", // Deloitte gray
    fontStyle: "italic",
  }
});