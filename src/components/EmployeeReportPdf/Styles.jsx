import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 10,
    backgroundColor: '#f9fdf9', // Very light green background for the entire page
  },
  header: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#86BC25', // MINDFLIX green
    //borderRadius: 0, // MINDFLIX uses more rectangular designs
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: '#000000', // Black text
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333333', // Darker gray for better readability
  },
  section: {
    marginBottom: 15,
    padding: 10,
    // Gradient-like effect from white to very light green
    backgroundColor: '#f0f8f0',
    //borderRadius: 0, // Square corners instead of rounded
    border: '1px solid #dddddd', // Lighter border
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    borderBottom: '1px solid #86BC25', // MINDFLIX green border
    paddingBottom: 3,
    color: '#000000', // Black text
  },
  row: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  col: {
    flex: 1,
    paddingHorizontal: 5,
  },
  text: {
    fontSize: 10,
    marginBottom: 3,
    color: '#333333', // Darker gray for better readability
  },
  bold: {
    fontWeight: 'bold',
  },
  riskBox: {
    padding: 8,
    marginVertical: 8,
    //borderRadius: 0, // Square corners
  },
  lowRisk: {
    backgroundColor: '#d6e9c6', // MINDFLIX-style muted green
  },
  mediumRisk: {
    backgroundColor: '#faebcc', // MINDFLIX-style muted yellow
  },
  highRisk: {
    backgroundColor: '#ebccd1', // MINDFLIX-style muted red
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 80,
    marginVertical: 10,
  },
  bar: {
    width: 15,
    //borderRadius: 0, // Square corners
    marginHorizontal: 2,
  },
  chartLabel: {
    fontSize: 8,
    marginTop: 3,
    color: '#333333', // Darker gray
  },
  vibeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  vibeStat: {
    alignItems: 'center',
  },
  tableContainer: {
    marginTop: 5,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#86BC25', // MINDFLIX green
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#000000', // Black border
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 9,
    color: '#FFFFFF', // White text on green background
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd', // Light gray border
    padding: 5,
  },
  tableCell: {
    flex: 1,
    fontSize: 9,
    color: '#333333', // Darker gray
  },
  noDataText: {
    fontStyle: 'italic',
    color: '#666666', // Medium gray
    fontSize: 9,
  },
  leaveRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd', // Light gray border
  },
  leaveHeader: {
    backgroundColor: '#86BC25', // MINDFLIX green
    fontWeight: 'bold',
    color: '#FFFFFF', // White text
  },
  leaveCol: {
    flex: 1,
    padding: 3,
    fontSize: 8,
    textAlign: 'center',
  },
  listContainer: {
    marginLeft: 10,
  },
  listItem: {
    marginBottom: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 8,
    color: '#666666', // Medium gray
  },
  // New styles for improved chat analysis section
  chatAnalysisBox: {
    marginTop: 8,
    padding: 10,
    backgroundColor: '#effaef', // Very light green background
    borderLeft: '3px solid #86BC25', // Green accent border
  },
  metricBox: {
    flex: 1,
    padding: 8,
    margin: 4,
    backgroundColor: '#fcfcfc',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  metricTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#86BC25', // MINDFLIX green for metric titles
    marginBottom: 3,
  },
  metricValue: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  tagBox: {
    padding: 6,
    marginVertical: 3,
    backgroundColor: '#f7fdf5', // Very light green
    borderLeft: '2px solid #aed581', // Light green accent
  },
  horizontalDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    marginVertical: 8,
  },
  insightBox: {
    marginTop: 5,
    padding: 8,
    backgroundColor: '#fdfdfd',
    borderWidth: 1,
    borderColor: '#e6e6e6',
  },
  insightTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#333333',
  },
  riskIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5,
  },
  riskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  // Sentiment box styles
  sentimentBox: {
    padding: 5, 
    marginVertical: 2,
    borderLeftWidth: 3,
  },
  positive: {
    borderLeftColor: '#4caf50',
    backgroundColor: '#f1f8e9',
  },
  neutral: {
    borderLeftColor: '#9e9e9e',
    backgroundColor: '#f5f5f5',
  },
  negative: {
    borderLeftColor: '#f44336',
    backgroundColor: '#ffebee',
  },
});