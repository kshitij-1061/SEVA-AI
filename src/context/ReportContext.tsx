import React, { createContext, useContext, useState, useEffect } from "react";
import type {
  CivicReport,
  CreateReportInput,
  ReportTimelineEvent,
  User,
} from "../types";
import { reportService } from "../services/reportService";
import { useAuth } from "./AuthContext";

interface ReportContextValue {
  reports: CivicReport[];
  draft: Partial<CivicReport> | null;
  createReport: (input: CreateReportInput) => Promise<CivicReport>;
  updateReport: (reportId: string, updates: Partial<CivicReport>) => void;
  getReport: (reportId: string) => CivicReport | undefined;
  getUserReports: (userId: string) => CivicReport[];
  addTimelineEvent: (reportId: string, event: ReportTimelineEvent) => void;
  assignReport: (reportId: string, department: string, officerName: string) => CivicReport | undefined;
  updateReportStatus: (reportId: string, status: CivicReport["status"], publicNote: string) => CivicReport | undefined;
  updateReportPriority: (reportId: string, priority: CivicReport["priority"]) => CivicReport | undefined;
  addInternalNote: (reportId: string, text: string) => CivicReport | undefined;
  addCitizenFollowUp: (reportId: string, text: string) => CivicReport | undefined;
  submitResolutionFeedback: (reportId: string, status: "confirmed" | "not_resolved", comment?: string) => CivicReport | undefined;
  resetDemoReports: () => void;
  saveDraft: (draft: Partial<CivicReport>) => void;
  clearDraft: () => void;
  refreshReports: () => void;
}

const ReportContext = createContext<ReportContextValue | undefined>(undefined);

export const ReportProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [reports, setReports] = useState<CivicReport[]>([]);
  const [draft, setDraft] = useState<Partial<CivicReport> | null>(null);

  const refreshReports = () => {
    const loaded = reportService.getReports();
    setReports(loaded);
    const savedDraft = reportService.getDraft();
    setDraft(savedDraft);
  };

  useEffect(() => {
    refreshReports();
  }, []);

  const fallbackUser: User = user || {
    id: "user-citizen-001",
    name: "Demo Citizen",
    email: "citizen@sevafix.demo",
    role: "citizen",
    city: "Meerut",
    joinedAt: "2026-01-15",
  };

  const createReport = async (input: CreateReportInput): Promise<CivicReport> => {
    const newReport = await reportService.createReport(input, fallbackUser);
    refreshReports();
    return newReport;
  };

  const updateReport = (reportId: string, updates: Partial<CivicReport>) => {
    reportService.updateReport(reportId, updates);
    refreshReports();
  };

  const getReport = (reportId: string): CivicReport | undefined => {
    return reportService.getReportById(reportId);
  };

  const getUserReports = (userId: string): CivicReport[] => {
    return reportService.getReportsByUser(userId);
  };

  const addTimelineEvent = (reportId: string, event: ReportTimelineEvent) => {
    reportService.addTimelineEvent(reportId, event);
    refreshReports();
  };

  const assignReport = (reportId: string, department: string, officerName: string) => {
    const res = reportService.assignReport(reportId, department, officerName, fallbackUser);
    refreshReports();
    return res;
  };

  const updateReportStatus = (reportId: string, status: CivicReport["status"], publicNote: string) => {
    const res = reportService.updateReportStatus(reportId, status, publicNote, fallbackUser);
    refreshReports();
    return res;
  };

  const updateReportPriority = (reportId: string, priority: CivicReport["priority"]) => {
    const res = reportService.updateReportPriority(reportId, priority, fallbackUser);
    refreshReports();
    return res;
  };

  const addInternalNote = (reportId: string, text: string) => {
    const res = reportService.addInternalNote(reportId, text, fallbackUser);
    refreshReports();
    return res;
  };

  const addCitizenFollowUp = (reportId: string, text: string) => {
    const res = reportService.addCitizenFollowUp(reportId, text, fallbackUser);
    refreshReports();
    return res;
  };

  const submitResolutionFeedback = (reportId: string, status: "confirmed" | "not_resolved", comment?: string) => {
    const res = reportService.submitResolutionFeedback(reportId, status, comment);
    refreshReports();
    return res;
  };

  const resetDemoReports = () => {
    reportService.resetDemoReports();
    refreshReports();
  };

  const saveDraft = (draftData: Partial<CivicReport>) => {
    reportService.saveDraft(draftData);
    setDraft(draftData);
  };

  const clearDraft = () => {
    reportService.clearDraft();
    setDraft(null);
  };

  return (
    <ReportContext.Provider
      value={{
        reports,
        draft,
        createReport,
        updateReport,
        getReport,
        getUserReports,
        addTimelineEvent,
        assignReport,
        updateReportStatus,
        updateReportPriority,
        addInternalNote,
        addCitizenFollowUp,
        submitResolutionFeedback,
        resetDemoReports,
        saveDraft,
        clearDraft,
        refreshReports,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export const useReports = (): ReportContextValue => {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error("useReports must be used within a ReportProvider");
  }
  return context;
};
