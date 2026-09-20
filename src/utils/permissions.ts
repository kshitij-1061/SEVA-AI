import type { CivicReport, User } from "../types";

export function canViewReport(user: User | null, report: CivicReport): boolean {
  if (!user) return false;
  if (user.role === "admin") return true;

  if (user.role === "citizen") {
    return report.userId === user.id;
  }

  if (user.role === "department") {
    if (!user.department) return false;
    // Check assigned department or match department name
    const deptMatch =
      report.department?.toLowerCase() === user.department.toLowerCase() ||
      report.assignment?.department?.toLowerCase() === user.department.toLowerCase();
    return deptMatch;
  }

  return false;
}

export function canUpdateStatus(user: User | null, report: CivicReport): boolean {
  if (!user) return false;
  if (user.role === "admin") return true;

  if (user.role === "department") {
    return canViewReport(user, report);
  }

  return false;
}

export function canAssignReport(user: User | null): boolean {
  return user?.role === "admin";
}

export function canViewInternalNotes(user: User | null): boolean {
  if (!user) return false;
  return user.role === "admin" || user.role === "department";
}

export function canAddInternalNote(user: User | null, report?: CivicReport): boolean {
  if (!user) return false;
  if (user.role === "admin") return true;
  if (user.role === "department") {
    return report ? canViewReport(user, report) : true;
  }
  return false;
}
