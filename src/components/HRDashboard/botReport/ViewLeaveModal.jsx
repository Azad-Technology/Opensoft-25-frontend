import React from 'react'

const ViewLeaveModal = () => {

    const leaveData = [
        { Employee_ID: "EMP001", Leave_Type: "Casual Leave", Leave_Days: "3", Leave_Start_Date: "25-03-2023", Leave_End_Date: "27-03-2023" },
        { Employee_ID: "EMP002", Leave_Type: "Sick Leave", Leave_Days: "2", Leave_Start_Date: "10-04-2023", Leave_End_Date: "11-04-2023" },
        { Employee_ID: "EMP003", Leave_Type: "Paid Leave", Leave_Days: "5", Leave_Start_Date: "15-05-2023", Leave_End_Date: "19-05-2023" },
        { Employee_ID: "EMP004", Leave_Type: "Maternity Leave", Leave_Days: "90", Leave_Start_Date: "01-06-2023", Leave_End_Date: "29-08-2023" },
        { Employee_ID: "EMP005", Leave_Type: "Unpaid Leave", Leave_Days: "1", Leave_Start_Date: "05-07-2023", Leave_End_Date: "05-07-2023" },
        { Employee_ID: "EMP006", Leave_Type: "Casual Leave", Leave_Days: "4", Leave_Start_Date: "12-08-2023", Leave_End_Date: "15-08-2023" },
        { Employee_ID: "EMP007", Leave_Type: "Sick Leave", Leave_Days: "3", Leave_Start_Date: "20-09-2023", Leave_End_Date: "22-09-2023" },
        { Employee_ID: "EMP008", Leave_Type: "Paid Leave", Leave_Days: "7", Leave_Start_Date: "01-10-2023", Leave_End_Date: "07-10-2023" },
        { Employee_ID: "EMP009", Leave_Type: "Unpaid Leave", Leave_Days: "2", Leave_Start_Date: "18-11-2023", Leave_End_Date: "19-11-2023" },
        { Employee_ID: "EMP010", Leave_Type: "Casual Leave", Leave_Days: "1", Leave_Start_Date: "05-12-2023", Leave_End_Date: "05-12-2023" }
    ];
    
  return (
    <div className='fixed inset-0 mt-32 md:m-0 backdrop-blur-sm flex justify-center items-center
    min-h-screen'>
      <div className='bg-white md-rounded-xl md-shadow-xl h-full w-full md:h-2/3 md:w-2/3'>
      <table className="table-fixed">
  <thead>
    <tr>
      <th>Leave Type</th>
      <th>Leave Days</th>
      <th>Start Date</th>
      <th>End Date</th>
    </tr>
  </thead>
  <tbody>
    {leaveData.map((data , index) => {
        <tr key={index}>
            <td>{data.Leave_Type}</td>
            <td>{data.Leave_Days}</td>
            <td>{data.Leave_Start_Date}</td>
            <td>{data.Leave_End_Date}</td>
        </tr>
    })}
  </tbody>
  </table>
      </div>
    </div>
  )
}

export default ViewLeaveModal
