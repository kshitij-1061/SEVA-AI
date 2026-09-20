import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useReports } from "../context/ReportContext";
import { AdminReportTable } from "../components/admin/AdminReportTable";
import { StatusUpdateModal } from "../components/admin/StatusUpdateModal";
import {
  Building2,
  Search,
  Filter,
} from "lucide-react";
import type { CivicReport, ReportStatus } from "../types";

const ALL_DEPARTMENTS = [
  "Roads & Infrastructure Department",
  "Electrical & Street Lighting Cell",
  "Waste Management & Sanitation",
  "Water Supply & Jal Nigam",
  "Drainage & Sewerage Division",
  "Public Health & Sanitation",
  "Traffic & Public Transport Cell",
  "Horticulture & Parks Department",
  "General Municipal Grievance Division",
];

export const DeptDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { reports, updateReportStatus } = useReports();

  const activeDepartment = user?.department || "Roads & Infrastructure Department";
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>(activeDepartment);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [statusModalReport, setStatusModalReport] = useState<CivicReport | null>(null);

  // Filter reports by department
  const deptReports = reports.filter((r) => {
    if (selectedDeptFilter === "ALL") return true;
    return r.department === selectedDeptFilter;
  });

  // Department metrics
  const totalDeptCount = deptReports.length;
  const pendingCount = deptReports.filter((r) => r.status === "submitted" || r.status === "acknowledged").length;
  const inProgressCount = deptReports.filter((r) => r.status === "in_progress").length;
  const resolvedCount = deptReports.filter((r) => r.status === "resolved").length;

  const filteredReports = deptReports.filter((report) => {
    if (statusFilter !== "all" && report.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesId = report.id.toLowerCase().includes(q);
      const matchesTitle = report.title.toLowerCase().includes(q);
      const matchesUser = (report.userName || "").toLowerCase().includes(q);
      const matchesCity = (report.location?.city || "").toLowerCase().includes(q);
      return matchesId || matchesTitle || matchesUser || matchesCity;
    }
    return true;
  });

  const handleStatusConfirm = (newStatus: ReportStatus, publicNote: string) => {
    if (!statusModalReport) return;
    updateReportStatus(statusModalReport.id, newStatus, publicNote);
    setStatusModalReport(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" /> Department Officer Portal
            </span>
            <span className="text-[10px] bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 font-mono px-2 py-0.5 rounded">
              Demo Environment
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Field Officer Resolution Desk
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Officer: <strong className="text-slate-700 dark:text-slate-300">{user?.name}</strong> | Assigned Jurisdiction:{" "}
            <span className="text-amber-700 dark:text-amber-300 font-semibold">{selectedDeptFilter}</span>
          </p>
        </div>

        {/* Department Switcher Dropdown */}
        <div className="flex items-center gap-2 bg-amber-50/80 dark:bg-amber-950/30 p-2 rounded-xl border border-amber-200 dark:border-amber-900/40">
          <span className="text-xs font-semibold text-amber-800 dark:text-amber-300 whitespace-nowrap">
            View Dept:
          </span>
          <select
            value={selectedDeptFilter}
            onChange={(e) => setSelectedDeptFilter(e.target.value)}
            className="bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-800 rounded-lg px-2.5 py-1 text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
          >
            <option value="ALL">ALL DEPARTMENTS (Demo View)</option>
            {ALL_DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
            Department Scope Total
          </span>
          <span className="text-2xl font-bold text-slate-900 dark:text-white">{totalDeptCount}</span>
        </div>

        <div className="bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl p-4 shadow-2xs">
          <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 block mb-1">
            Pending Action
          </span>
          <span className="text-2xl font-bold text-amber-800 dark:text-amber-300">{pendingCount}</span>
        </div>

        <div className="bg-purple-50/70 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/40 rounded-xl p-4 shadow-2xs">
          <span className="text-xs font-semibold text-purple-700 dark:text-purple-400 block mb-1">
            Active In-Progress
          </span>
          <span className="text-2xl font-bold text-purple-800 dark:text-purple-300">{inProgressCount}</span>
        </div>

        <div className="bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-xl p-4 shadow-2xs">
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 block mb-1">
            Resolved Issues
          </span>
          <span className="text-2xl font-bold text-emerald-800 dark:text-emerald-300">{resolvedCount}</span>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-3.5 h-3.5 text-gray-500 dark:text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="submitted">Submitted</option>
            <option value="acknowledged">Acknowledged</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search assigned reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 border border-slate-300 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-amber-500 outline-hidden bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100"
          />
        </div>
      </div>

      {/* Reports Table */}
      <AdminReportTable
        reports={filteredReports}
        currentUser={user}
        onOpenStatusModal={(report) => setStatusModalReport(report)}
      />

      {/* Status Modal */}
      {statusModalReport && (
        <StatusUpdateModal
          report={statusModalReport}
          currentUser={user}
          isOpen={!!statusModalReport}
          onClose={() => setStatusModalReport(null)}
          onConfirm={handleStatusConfirm}
        />
      )}
    </div>
  );
};
