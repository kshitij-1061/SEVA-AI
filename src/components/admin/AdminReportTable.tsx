import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Calendar,
  Clock,
  ChevronRight,
  UserCheck,
  ArrowUpRight,
} from "lucide-react";
import type { CivicReport, ReportStatus, User } from "../../types";
import { canAssignReport, canUpdateStatus } from "../../utils/permissions";

interface AdminReportTableProps {
  reports: CivicReport[];
  currentUser: User | null;
  onOpenAssignModal?: (report: CivicReport) => void;
  onOpenStatusModal?: (report: CivicReport) => void;
  onPriorityChange?: (reportId: string, priority: CivicReport["priority"]) => void;
}

export const AdminReportTable: React.FC<AdminReportTableProps> = ({
  reports,
  currentUser,
  onOpenAssignModal,
  onOpenStatusModal,
  onPriorityChange,
}) => {
  const navigate = useNavigate();

  const getStatusBadge = (status: ReportStatus) => {
    switch (status) {
      case "submitted":
        return "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-800";
      case "acknowledged":
        return "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800";
      case "in_progress":
        return "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/40 dark:text-purple-300 dark:border-purple-800";
      case "resolved":
        return "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-800";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/40 dark:text-red-300 dark:border-red-800";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getPriorityBadge = (priority: CivicReport["priority"]) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 font-bold border-red-300";
      case "high":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300 font-semibold border-orange-300";
      case "medium":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-300";
      case "low":
        return "bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-300 border-gray-300";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (reports.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-8 text-center shadow-xs">
        <Clock className="w-10 h-10 text-gray-400 mx-auto mb-3" />
        <h3 className="text-base font-bold text-slate-900 dark:text-white">No Reports Found</h3>
        <p className="text-xs text-gray-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
          No reports match your current filter parameters or department scope.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/80 dark:bg-slate-900/60 border-b border-gray-200 dark:border-slate-700 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <th className="py-3.5 px-4">Report Details</th>
              <th className="py-3.5 px-4">Category & Location</th>
              <th className="py-3.5 px-4">Department & Officer</th>
              <th className="py-3.5 px-4">Urgency</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-700 text-xs text-slate-700 dark:text-slate-200">
            {reports.map((report) => (
              <tr
                key={report.id}
                className="hover:bg-gray-50/60 dark:hover:bg-slate-700/40 transition-colors"
              >
                {/* ID & Title */}
                <td className="py-3.5 px-4 align-top">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="font-mono text-[11px] font-bold text-blue-600 dark:text-blue-400">
                        {report.id}
                      </span>
                      {report.aiGenerated && (
                        <span className="text-[10px] bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 font-medium px-1.5 py-0.2 rounded border border-purple-200 dark:border-purple-800">
                          SevaAI
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => navigate(`/reports/${report.id}`)}
                      className="font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 text-left line-clamp-1 flex items-center gap-1 group cursor-pointer"
                    >
                      <span>{report.title}</span>
                      <ArrowUpRight className="w-3 h-3 text-gray-400 group-hover:text-blue-600 transition-colors shrink-0" />
                    </button>
                    <span className="text-[11px] text-gray-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      {report.createdAt} • by {report.userName || "Citizen"}
                    </span>
                  </div>
                </td>

                {/* Category & City */}
                <td className="py-3.5 px-4 align-top">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {report.category}
                    </span>
                    <span className="text-[11px] text-gray-500 dark:text-slate-400 truncate max-w-[180px]">
                      {report.location?.address || "Location specified"}, {report.location?.city || "Meerut"}
                    </span>
                  </div>
                </td>

                {/* Department & Assignment */}
                <td className="py-3.5 px-4 align-top">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-indigo-500" />
                      <span className="truncate max-w-[160px] font-medium">
                        {report.department || "Unassigned"}
                      </span>
                    </span>
                    {report.assignment ? (
                      <span className="text-[11px] text-indigo-700 dark:text-indigo-300 flex items-center gap-1 font-mono">
                        <UserCheck className="w-3 h-3 text-indigo-500" />
                        {report.assignment.assignedTo}
                      </span>
                    ) : (
                      <span className="text-[11px] text-amber-600 dark:text-amber-400 italic">
                        Pending Assignment
                      </span>
                    )}
                  </div>
                </td>

                {/* Priority */}
                <td className="py-3.5 px-4 align-top">
                  {onPriorityChange && currentUser?.role === "admin" ? (
                    <select
                      value={report.priority}
                      onChange={(e) =>
                        onPriorityChange(report.id, e.target.value as CivicReport["priority"])
                      }
                      className={`text-[11px] px-2 py-1 rounded-md border font-medium uppercase focus:outline-none cursor-pointer ${getPriorityBadge(
                        report.priority
                      )}`}
                    >
                      <option value="low">LOW</option>
                      <option value="medium">MEDIUM</option>
                      <option value="high">HIGH</option>
                      <option value="urgent">URGENT</option>
                    </select>
                  ) : (
                    <span
                      className={`inline-block px-2 py-0.5 rounded border text-[10px] uppercase font-bold ${getPriorityBadge(
                        report.priority
                      )}`}
                    >
                      {report.priority}
                    </span>
                  )}
                </td>

                {/* Status */}
                <td className="py-3.5 px-4 align-top">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${getStatusBadge(
                      report.status
                    )}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {report.status.replace("_", " ").toUpperCase()}
                  </span>
                </td>

                {/* Action Buttons */}
                <td className="py-3.5 px-4 align-top text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    {canAssignReport(currentUser) && onOpenAssignModal && (
                      <button
                        onClick={() => onOpenAssignModal(report)}
                        className="px-2.5 py-1 text-[11px] font-medium bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:hover:bg-indigo-900/60 dark:text-indigo-300 rounded-lg border border-indigo-200 dark:border-indigo-800 transition-colors cursor-pointer"
                        title="Assign Department & Officer"
                      >
                        Assign
                      </button>
                    )}

                    {canUpdateStatus(currentUser, report) && onOpenStatusModal && (
                      <button
                        onClick={() => onOpenStatusModal(report)}
                        className="px-2.5 py-1 text-[11px] font-medium bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:hover:bg-blue-900/60 dark:text-blue-300 rounded-lg border border-blue-200 dark:border-blue-800 transition-colors cursor-pointer"
                        title="Update Status"
                      >
                        Status
                      </button>
                    )}

                    <button
                      onClick={() => navigate(`/reports/${report.id}`)}
                      className="p-1.5 text-gray-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                      title="View Details"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
