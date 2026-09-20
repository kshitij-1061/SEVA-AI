import type { ReportStatus, UserRole } from "../types";

export const ALLOWED_STATUS_TRANSITIONS: Record<ReportStatus, ReportStatus[]> = {
  submitted: ["acknowledged", "in_progress", "rejected"],
  acknowledged: ["in_progress", "resolved", "rejected"],
  in_progress: ["resolved", "rejected", "acknowledged"],
  resolved: ["in_progress"], // Reopen only via follow-up
  rejected: ["submitted"],
};

export function canTransitionStatus(
  currentStatus: ReportStatus,
  nextStatus: ReportStatus,
  userRole?: UserRole
): boolean {
  if (userRole === "citizen") return false; // Citizens cannot directly change status
  if (currentStatus === nextStatus) return true;

  const allowed = ALLOWED_STATUS_TRANSITIONS[currentStatus] || [];
  return allowed.includes(nextStatus);
}

export const STATUS_LABELS: Record<ReportStatus, string> = {
  submitted: "Submitted",
  acknowledged: "Acknowledged",
  in_progress: "In Progress",
  resolved: "Resolved",
  rejected: "Rejected",
};
