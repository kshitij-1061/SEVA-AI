import type { CivicReport } from "../types";

/**
 * Safely calculates percentage value without divide-by-zero errors.
 */
export function calculatePercentage(value: number, total: number): number {
  if (!total || total <= 0) return 0;
  const pct = (value / total) * 100;
  return Math.round(pct * 10) / 10;
}

/**
 * Parses date string (e.g., "Sep 20, 2026, 01:15 PM" or ISO string) into Date object.
 */
export function parseReportDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  const parsed = new Date(dateStr);
  if (!isNaN(parsed.getTime())) return parsed;

  // Fallback for custom formatted strings like "Sep 20, 2026, 01:15 PM"
  try {
    const cleaned = dateStr.replace(",", "");
    const d = new Date(cleaned);
    if (!isNaN(d.getTime())) return d;
  } catch {
    // Ignore parse error
  }
  return null;
}

/**
 * Calculates resolution time duration in milliseconds between report creation
 * and the actual 'resolved' timeline event. Returns null if unresolved or missing.
 */
export function calculateResolutionTimeMs(report: CivicReport): number | null {
  if (report.status !== "resolved") return null;

  const createdDate = parseReportDate(report.createdAt);
  if (!createdDate) return null;

  const resolvedEvent = report.timeline?.find((ev) => ev.status === "resolved");
  if (!resolvedEvent || !resolvedEvent.timestamp) return null;

  const resolvedDate = parseReportDate(resolvedEvent.timestamp);
  if (!resolvedDate) return null;

  const diffMs = resolvedDate.getTime() - createdDate.getTime();
  return diffMs > 0 ? diffMs : null;
}

/**
 * Formats duration in milliseconds into human readable string.
 */
export function formatResolutionTime(ms: number | null): string {
  if (ms === null || ms <= 0) {
    return "No resolved data yet";
  }

  const hours = ms / (1000 * 60 * 60);
  if (hours < 1) {
    const mins = Math.max(1, Math.round(ms / (1000 * 60)));
    return `${mins} mins`;
  }

  if (hours < 48) {
    return `${hours.toFixed(1)} hours`;
  }

  const days = hours / 24;
  return `${days.toFixed(1)} days`;
}

/**
 * Formats timestamp into relative time string.
 */
export function formatTimeAgo(timestampStr: string): string {
  const d = parseReportDate(timestampStr);
  if (!d) return timestampStr;

  const now = new Date();
  const diffMs = now.getTime() - d.getTime();

  if (diffMs < 0) return "Just now";

  const diffMins = Math.floor(diffMs / (1000 * 60));
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) return `${diffDays}d ago`;

  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/**
 * Exports report analytics dataset to a downloadable CSV file.
 */
export function exportAnalyticsToCsv(
  reports: CivicReport[],
  filename: string = "sevafix-analytics.csv"
): void {
  const headers = [
    "Report ID",
    "Title",
    "Category",
    "Issue Type",
    "Priority",
    "Status",
    "Department",
    "Assigned To",
    "City",
    "Address",
    "AI Assisted",
    "Created At",
    "Updated At",
    "Resolution Time",
  ];

  const rows = reports.map((report) => {
    const resMs = calculateResolutionTimeMs(report);
    const resFormatted = formatResolutionTime(resMs);

    return [
      `"${report.id}"`,
      `"${(report.title || "").replace(/"/g, '""')}"`,
      `"${report.category || ""}"`,
      `"${report.issueType || ""}"`,
      `"${report.priority || ""}"`,
      `"${report.status || ""}"`,
      `"${(report.department || "").replace(/"/g, '""')}"`,
      `"${(report.assignment?.assignedTo || "Unassigned").replace(/"/g, '""')}"`,
      `"${report.location?.city || ""}"`,
      `"${(report.location?.address || "").replace(/"/g, '""')}"`,
      `"${report.aiGenerated ? "Yes" : "No"}"`,
      `"${report.createdAt || ""}"`,
      `"${report.updatedAt || ""}"`,
      `"${resFormatted}"`,
    ];
  });

  const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
