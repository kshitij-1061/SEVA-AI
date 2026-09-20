import type {
  CivicReport,
  CreateReportInput,
  ReportTimelineEvent,
  ReportStatus,
  User,
} from "../types";
import { SEED_REPORTS } from "../data/seedReports";
import { generateReportId } from "../utils/reportId";

const STORAGE_KEY_REPORTS = "sevafix_reports";
const STORAGE_KEY_DRAFT = "sevafix_report_draft";

export const CATEGORY_DEPARTMENT_MAP: { [key: string]: string } = {
  "Road Infrastructure": "Roads & Infrastructure Department",
  "Street Lighting": "Electrical & Street Lighting Cell",
  "Waste Management": "Waste Management & Sanitation",
  "Water Supply": "Water Supply & Jal Nigam",
  "Drainage": "Drainage & Sewerage Division",
  "Public Sanitation": "Public Health & Sanitation",
  "Traffic & Transport": "Traffic & Public Transport Cell",
  "Parks & Public Spaces": "Horticulture & Parks Department",
  "Other": "General Municipal Grievance Division",
};

export class ReportService {
  public getReports(): CivicReport[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_REPORTS);
      if (stored) {
        return JSON.parse(stored);
      }
      // Initialize with seed reports if none exist
      localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(SEED_REPORTS));
      return SEED_REPORTS;
    } catch (err) {
      console.error("Failed to read reports from storage:", err);
      return SEED_REPORTS;
    }
  }

  public getReportById(id: string): CivicReport | undefined {
    const all = this.getReports();
    return all.find((r) => r.id.toLowerCase() === id.toLowerCase());
  }

  public getReportsByUser(userId: string): CivicReport[] {
    const all = this.getReports();
    return all.filter((r) => r.userId === userId);
  }

  public suggestDepartment(category: string): string {
    return CATEGORY_DEPARTMENT_MAP[category] || "General Municipal Grievance Division";
  }

  public async createReport(input: CreateReportInput, currentUser: User): Promise<CivicReport> {
    const allReports = this.getReports();
    const newId = generateReportId(allReports);
    const nowIso = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const suggestedDept = input.department || this.suggestDepartment(input.category);

    const initialEvent: ReportTimelineEvent = {
      id: `ev-${newId}-1`,
      status: "submitted",
      title: "Report Submitted",
      description: `Civic complaint recorded in SevaFix demo platform (Ref ID: ${newId}).`,
      timestamp: nowIso,
      actor: "citizen",
    };

    const newReport: CivicReport = {
      id: newId,
      userId: currentUser.id,
      userName: currentUser.name,
      category: input.category,
      issueType: input.issueType,
      title: input.title,
      description: input.description,
      priority: input.priority,
      status: "submitted",
      location: {
        address: input.location.address || "Address not specified",
        city: input.location.city || currentUser.city || "Meerut",
        latitude: input.location.latitude || 28.9845,
        longitude: input.location.longitude || 77.7064,
      },
      images: input.images || [],
      department: suggestedDept,
      aiGenerated: input.aiGenerated || false,
      aiAnalysis: input.aiAnalysis,
      createdAt: nowIso,
      updatedAt: nowIso,
      timeline: [initialEvent],
    };

    const updatedList = [newReport, ...allReports];
    localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(updatedList));

    // Clear active draft after successful submission
    this.clearDraft();

    return newReport;
  }

  public updateReport(reportId: string, updates: Partial<CivicReport>): CivicReport | undefined {
    const all = this.getReports();
    const index = all.findIndex((r) => r.id === reportId);
    if (index === -1) return undefined;

    const nowIso = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const existing = all[index];
    const updated: CivicReport = {
      ...existing,
      ...updates,
      updatedAt: nowIso,
    };

    all[index] = updated;
    localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(all));
    return updated;
  }

  public addTimelineEvent(reportId: string, event: ReportTimelineEvent): CivicReport | undefined {
    const report = this.getReportById(reportId);
    if (!report) return undefined;

    const updatedTimeline = [...report.timeline, event];
    return this.updateReport(reportId, {
      status: event.status as ReportStatus,
      timeline: updatedTimeline,
    });
  }

  public assignReport(
    reportId: string,
    department: string,
    officerName: string,
    currentUser: User
  ): CivicReport | undefined {
    const report = this.getReportById(reportId);
    if (!report) return undefined;

    const nowIso = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const assignment = {
      department,
      assignedTo: officerName || "Demo Field Officer",
      assignedAt: nowIso,
      assignedBy: currentUser.name,
    };

    const newTimelineEvent: ReportTimelineEvent = {
      id: `ev-${reportId}-${Date.now()}`,
      status: report.status === "submitted" ? "acknowledged" : report.status,
      title: "Report Assigned to Department",
      description: `Report assigned to ${department} (${officerName || "Field Officer"}) in demo workflow.`,
      timestamp: nowIso,
      actor: currentUser.role,
    };

    const newStatus: ReportStatus = report.status === "submitted" ? "acknowledged" : report.status;

    return this.updateReport(reportId, {
      department,
      assignment,
      status: newStatus,
      timeline: [...report.timeline, newTimelineEvent],
    });
  }

  public updateReportStatus(
    reportId: string,
    status: ReportStatus,
    publicNote: string,
    currentUser: User
  ): CivicReport | undefined {
    const report = this.getReportById(reportId);
    if (!report) return undefined;

    const nowIso = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const statusTitles: Record<ReportStatus, string> = {
      submitted: "Report Submitted",
      acknowledged: "Report Acknowledged",
      in_progress: "Work In Progress",
      resolved: "Issue Marked Resolved",
      rejected: "Report Closed / Rejected",
    };

    const timelineEvent: ReportTimelineEvent = {
      id: `ev-${reportId}-${Date.now()}`,
      status,
      title: statusTitles[status] || "Status Updated",
      description: publicNote || `Status updated to ${status.replace("_", " ")} in demo environment.`,
      timestamp: nowIso,
      actor: currentUser.role,
    };

    return this.updateReport(reportId, {
      status,
      timeline: [...report.timeline, timelineEvent],
    });
  }

  public updateReportPriority(
    reportId: string,
    priority: "low" | "medium" | "high" | "urgent",
    currentUser: User
  ): CivicReport | undefined {
    const report = this.getReportById(reportId);
    if (!report) return undefined;

    const nowIso = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const timelineEvent: ReportTimelineEvent = {
      id: `ev-${reportId}-${Date.now()}`,
      status: report.status,
      title: "Urgency Priority Updated",
      description: `Report priority adjusted to ${priority.toUpperCase()} by management.`,
      timestamp: nowIso,
      actor: currentUser.role,
    };

    return this.updateReport(reportId, {
      priority,
      timeline: [...report.timeline, timelineEvent],
    });
  }

  public addInternalNote(
    reportId: string,
    text: string,
    currentUser: User
  ): CivicReport | undefined {
    const report = this.getReportById(reportId);
    if (!report) return undefined;

    const nowIso = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const newNote = {
      id: `note-${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorRole: currentUser.role as "admin" | "department",
      text,
      createdAt: nowIso,
    };

    const currentNotes = report.internalNotes || [];
    return this.updateReport(reportId, {
      internalNotes: [...currentNotes, newNote],
    });
  }

  public addCitizenFollowUp(
    reportId: string,
    text: string,
    _currentUser?: User
  ): CivicReport | undefined {
    const report = this.getReportById(reportId);
    if (!report) return undefined;

    const nowIso = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const timelineEvent: ReportTimelineEvent = {
      id: `ev-${reportId}-${Date.now()}`,
      status: report.status,
      title: "Citizen Follow-Up Added",
      description: `Citizen update: “${text}”`,
      timestamp: nowIso,
      actor: "citizen",
    };

    return this.updateReport(reportId, {
      timeline: [...report.timeline, timelineEvent],
    });
  }

  public submitResolutionFeedback(
    reportId: string,
    feedbackStatus: "confirmed" | "not_resolved",
    comment?: string
  ): CivicReport | undefined {
    const report = this.getReportById(reportId);
    if (!report) return undefined;

    const nowIso = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const resolutionFeedback = {
      status: feedbackStatus,
      comment,
      submittedAt: nowIso,
    };

    const timelineEvent: ReportTimelineEvent = {
      id: `ev-${reportId}-${Date.now()}`,
      status: report.status,
      title: feedbackStatus === "confirmed" ? "Citizen Confirmed Resolution" : "Citizen Reported Unresolved Issue",
      description: comment
        ? `Citizen feedback: “${comment}”`
        : feedbackStatus === "confirmed"
        ? "Citizen confirmed issue is resolved."
        : "Citizen reported problem persists.",
      timestamp: nowIso,
      actor: "citizen",
    };

    return this.updateReport(reportId, {
      resolutionFeedback,
      timeline: [...report.timeline, timelineEvent],
    });
  }

  public resetDemoReports(): CivicReport[] {
    try {
      localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(SEED_REPORTS));
      return SEED_REPORTS;
    } catch (err) {
      console.error("Failed to reset demo reports:", err);
      return SEED_REPORTS;
    }
  }

  public saveDraft(draft: Partial<CivicReport>): void {
    try {
      localStorage.setItem(STORAGE_KEY_DRAFT, JSON.stringify(draft));
    } catch (err) {
      console.error("Failed to save report draft:", err);
    }
  }

  public getDraft(): Partial<CivicReport> | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_DRAFT);
      return stored ? JSON.parse(stored) : null;
    } catch (err) {
      console.error("Failed to read draft from storage:", err);
      return null;
    }
  }

  public clearDraft(): void {
    localStorage.removeItem(STORAGE_KEY_DRAFT);
  }
}

export const reportService = new ReportService();
