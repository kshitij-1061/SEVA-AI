import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useReports } from "../context/ReportContext";
import { ReportCard } from "../components/ReportCard";
import { Link } from "react-router-dom";
import {
  FileText,
  PlusCircle,
  Sparkles,
  Search,
  RotateCcw,
} from "lucide-react";

export const MyReportsPage: React.FC = () => {
  const { user } = useAuth();
  const { getUserReports, resetDemoReports } = useReports();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const currentUserId = user?.id || "user-citizen-001";
  const userReports = getUserReports(currentUserId);

  const stats = {
    total: userReports.length,
    submitted: userReports.filter((r) => r.status === "submitted").length,
    acknowledged: userReports.filter((r) => r.status === "acknowledged").length,
    in_progress: userReports.filter((r) => r.status === "in_progress").length,
    resolved: userReports.filter((r) => r.status === "resolved").length,
    rejected: userReports.filter((r) => r.status === "rejected").length,
  };

  const filteredReports = userReports.filter((r) => {
    if (activeTab !== "all" && r.status !== activeTab) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesId = r.id.toLowerCase().includes(q);
      const matchesTitle = r.title.toLowerCase().includes(q);
      const matchesCat = r.category.toLowerCase().includes(q);
      const matchesIssue = r.issueType.toLowerCase().includes(q);
      const matchesCity = (r.location?.city || "").toLowerCase().includes(q);
      return matchesId || matchesTitle || matchesCat || matchesIssue || matchesCity;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold bg-teal-50 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300 px-2.5 py-0.5 rounded-full border border-teal-200 dark:border-teal-800 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5" /> Citizen Tracker (Module 7)
            </span>
            <span className="text-[10px] bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 font-mono px-2 py-0.5 rounded">
              Demo Environment
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            My Submitted Civic Reports
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Track real-time resolution timeline for complaints filed under account{" "}
            <strong className="text-slate-700 dark:text-slate-300">{user?.name || "Demo Citizen"}</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => resetDemoReports()}
            className="px-3 py-2 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Reset demo reports to initial state"
          >
            <RotateCcw className="w-3.5 h-3.5 text-gray-500" /> Reset Demo Data
          </button>
          <Link
            to="/ai"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Ask SevaAI
          </Link>
          <Link
            to="/report-issue"
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <PlusCircle className="w-3.5 h-3.5" /> Report Issue
          </Link>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">Total Reports</span>
          <span className="text-xl font-bold text-slate-900 dark:text-white">{stats.total}</span>
        </div>
        <div className="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl p-3.5 shadow-2xs">
          <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 block mb-1">Submitted</span>
          <span className="text-xl font-bold text-amber-800 dark:text-amber-300">{stats.submitted}</span>
        </div>
        <div className="bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 rounded-xl p-3.5 shadow-2xs">
          <span className="text-xs font-semibold text-blue-700 dark:text-blue-400 block mb-1">Acknowledged</span>
          <span className="text-xl font-bold text-blue-800 dark:text-blue-300">{stats.acknowledged}</span>
        </div>
        <div className="bg-purple-50/60 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/40 rounded-xl p-3.5 shadow-2xs">
          <span className="text-xs font-semibold text-purple-700 dark:text-purple-400 block mb-1">In Progress</span>
          <span className="text-xl font-bold text-purple-800 dark:text-purple-300">{stats.in_progress}</span>
        </div>
        <div className="bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-xl p-3.5 shadow-2xs col-span-2 sm:col-span-1">
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 block mb-1">Resolved</span>
          <span className="text-xl font-bold text-emerald-800 dark:text-emerald-300">{stats.resolved}</span>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl w-full sm:w-auto overflow-x-auto">
          {[
            { id: "all", label: `All (${userReports.length})` },
            { id: "submitted", label: `Submitted (${stats.submitted})` },
            { id: "acknowledged", label: `Acknowledged (${stats.acknowledged})` },
            { id: "in_progress", label: `In Progress (${stats.in_progress})` },
            { id: "resolved", label: `Resolved (${stats.resolved})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? "bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-300 shadow-xs font-bold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by Ref ID, title, category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 border border-slate-300 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 outline-hidden bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100"
          />
        </div>
      </div>

      {/* Reports Grid */}
      {filteredReports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredReports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 p-12 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs text-center max-w-lg mx-auto space-y-4 my-8">
          <div className="w-16 h-16 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-3xl flex items-center justify-center mx-auto border border-teal-100 dark:border-teal-800 shadow-2xs">
            <FileText className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Civic Reports Found</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {searchQuery || activeTab !== "all"
                ? "No complaints match your active status filters or search query."
                : "Found a pothole, broken streetlight, garbage dump, or water leak in your neighborhood?"}
            </p>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <Link
              to="/ai"
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Ask SevaAI
            </Link>
            <Link
              to="/report-issue"
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs"
            >
              <PlusCircle className="w-3.5 h-3.5" /> File New Report
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
