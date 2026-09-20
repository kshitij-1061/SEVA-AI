import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useReports } from "../context/ReportContext";
import { AdminReportTable } from "../components/admin/AdminReportTable";
import { AssignReportModal } from "../components/admin/AssignReportModal";
import { StatusUpdateModal } from "../components/admin/StatusUpdateModal";
import {
  ShieldCheck,
  Building2,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Search,
  Filter,
  BarChart3,
} from "lucide-react";
import type { CivicReport, ReportStatus } from "../types";

export const AdminDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const {
    reports,
    assignReport,
    updateReportStatus,
    updateReportPriority,
    resetDemoReports,
  } = useReports();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  const [assignModalReport, setAssignModalReport] = useState<CivicReport | null>(null);
  const [statusModalReport, setStatusModalReport] = useState<CivicReport | null>(null);

  // Compute metrics
  const totalCount = reports.length;
  const unassignedCount = reports.filter((r) => !r.assignment).length;
  const inProgressCount = reports.filter((r) => r.status === "in_progress").length;
  const resolvedCount = reports.filter((r) => r.status === "resolved").length;
  const urgentCount = reports.filter((r) => r.priority === "urgent" || r.priority === "high").length;

  const categories = Array.from(new Set(reports.map((r) => r.category)));

  const filteredReports = reports.filter((report) => {
    if (statusFilter !== "all" && report.status !== statusFilter) return false;
    if (categoryFilter !== "all" && report.category !== categoryFilter) return false;
    if (priorityFilter !== "all" && report.priority !== priorityFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesId = report.id.toLowerCase().includes(q);
      const matchesTitle = report.title.toLowerCase().includes(q);
      const matchesUser = (report.userName || "").toLowerCase().includes(q);
      const matchesCity = (report.location?.city || "").toLowerCase().includes(q);
      const matchesDept = (report.department || "").toLowerCase().includes(q);
      return matchesId || matchesTitle || matchesUser || matchesCity || matchesDept;
    }
    return true;
  });

  const handleAssignConfirm = (department: string, officerName: string) => {
    if (!assignModalReport) return;
    assignReport(assignModalReport.id, department, officerName);
    setAssignModalReport(null);
  };

  const handleStatusConfirm = (newStatus: ReportStatus, publicNote: string) => {
    if (!statusModalReport) return;
    updateReportStatus(statusModalReport.id, newStatus, publicNote);
    setStatusModalReport(null);
  };

  const handlePriorityChange = (reportId: string, priority: CivicReport["priority"]) => {
    updateReportPriority(reportId, priority);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Bar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 px-2.5 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Admin Control Center
            </span>
            <span className="text-[10px] bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 font-mono px-2 py-0.5 rounded">
              Demo Environment
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Central Administrative Dashboard
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Log in as <strong className="text-slate-700 dark:text-slate-300">{user?.name}</strong> (Role: <span className="uppercase text-indigo-600 dark:text-indigo-400 font-bold">{user?.role}</span>). Assign departments, manage priority & route civic grievances.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => resetDemoReports()}
            className="px-3.5 py-2 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
            title="Reset reports database to original seed state"
          >
            <RotateCcw className="w-3.5 h-3.5 text-gray-500" /> Reset Demo Data
          </button>
        </div>
      </div>

      {/* Overview Analytics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-xs font-semibold">Total Reports</span>
            <BarChart3 className="w-4 h-4 text-blue-500" />
          </div>
          <span className="text-2xl font-bold text-slate-900 dark:text-white">{totalCount}</span>
        </div>

        <div className="bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-amber-700 dark:text-amber-400 mb-1">
            <span className="text-xs font-semibold">Unassigned</span>
            <Building2 className="w-4 h-4 text-amber-500" />
          </div>
          <span className="text-2xl font-bold text-amber-800 dark:text-amber-300">{unassignedCount}</span>
        </div>

        <div className="bg-purple-50/70 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/40 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-purple-700 dark:text-purple-400 mb-1">
            <span className="text-xs font-semibold">In Progress</span>
            <Clock className="w-4 h-4 text-purple-500" />
          </div>
          <span className="text-2xl font-bold text-purple-800 dark:text-purple-300">{inProgressCount}</span>
        </div>

        <div className="bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-emerald-700 dark:text-emerald-400 mb-1">
            <span className="text-xs font-semibold">Resolved</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <span className="text-2xl font-bold text-emerald-800 dark:text-emerald-300">{resolvedCount}</span>
        </div>

        <div className="bg-red-50/70 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-xl p-4 shadow-2xs col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-red-700 dark:text-red-400 mb-1">
            <span className="text-xs font-semibold">High / Urgent</span>
            <AlertTriangle className="w-4 h-4 text-red-500" />
          </div>
          <span className="text-2xl font-bold text-red-800 dark:text-red-300">{urgentCount}</span>
        </div>
      </div>

      {/* Control Filters & Search Bar */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-slate-400">
            <Filter className="w-3.5 h-3.5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="submitted">Submitted</option>
              <option value="acknowledged">Acknowledged</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Priority Filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search Ref ID, citizen name, city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 border border-slate-300 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-hidden bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100"
          />
        </div>
      </div>

      {/* Admin Management Table */}
      <AdminReportTable
        reports={filteredReports}
        currentUser={user}
        onOpenAssignModal={(report) => setAssignModalReport(report)}
        onOpenStatusModal={(report) => setStatusModalReport(report)}
        onPriorityChange={handlePriorityChange}
      />

      {/* Modals */}
      {assignModalReport && (
        <AssignReportModal
          report={assignModalReport}
          currentUser={user}
          isOpen={!!assignModalReport}
          onClose={() => setAssignModalReport(null)}
          onAssign={handleAssignConfirm}
        />
      )}

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
