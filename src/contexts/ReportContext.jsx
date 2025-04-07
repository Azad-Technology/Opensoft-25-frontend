import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

const ReportContext = createContext(undefined);

export const ReportProvider = ({ children }) => {
    const [resultSummary, setResultSummary] = useState(null)
    return (
    <ReportContext.Provider
      value={{
        resultSummary,
        setResultSummary,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export const useReport = () => {
  const context = useContext(ReportContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};