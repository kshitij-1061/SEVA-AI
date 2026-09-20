import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useReports } from "../context/ReportContext";
import { ReportTimeline } from "../components/ReportTimeline";
import { StatusProgressBar } from "../components/admin/StatusProgressBar";
import { InternalNotes } from "../components/admin/InternalNotes";
import { StatusUpdateModal } from "../components/admin/StatusUpdateModal";
import { AssignReportModal } from "../components/admin/AssignReportModal";
import {
  ArrowLeft,
  MapPin,
  Building2,
  Sparkles,
  Image as ImageIcon,
  UserCheck,
  ShieldCheck,
  Send,
  ThumbsUp,
  RotateCcw,
  MessageSquare,
  AlertTriangle,
} from "lucide-react";
import type { CivicReport } from "../types";
import { canAssignReport, canUpdateStatus } from "../utils/permissions";

export const ReportDetailsPage: React.FC = () => {
  const { reportId } = useParams<{ reportId: string }>();
  const { user } = useAuth();
  const {
    getReport,
    assignReport,
    updateReportStatus,
    updateReportPriority,
    addInternalNote,
    addCitizenFollowUp,
    submitResolutionFeedback,
  } = useReports();
  const navigate = useNavigate();

  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [followUpText, setFollowUpText] = useState("");
  const [feedbackComment, setFeedbackComment] = useState("");

  const report = reportId ? getReport(reportId) : undefined;

  if (!report) {
    return (
      <div className="max-w-2xl mx-auto my-12 p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-lg text-center space-y-4">
        <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-full flex items-center justify-center mx-auto font-bold text-lg font-mono">
          404
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Report Not Found</h2>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          No civic complaint matching reference ID <strong>{reportId}</strong> was found in your session.
        </p>
        <Link
          to="/my-reports"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white font-bold rounded-xl text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Return to My Reports
        </Link>
      </div>
    );
  }

  const priorityColors = {
    low: "bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600",
    medium: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800",
    high: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-800",
    urgent: "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/40 dark:text-rose-300 dark:border-rose-800",
  };

  const handleFollowUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!followUpText.trim()) return;
    addCitizenFollowUp(report.id, followUpText.trim());
    setFollowUpText("");
  };

  const handleFeedbackSubmit = (status: "confirmed" | "not_resolved") => {
    submitResolutionFeedback(report.id, status, feedbackComment.trim() || undefined);
    setFeedbackComment("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-slate-400 px-2.5 py-1 rounded-full font-mono border border-slate-200 dark:border-slate-700">
            Demo Environment
          </span>
          <span className="text-[11px] text-blue-700 bg-blue-50 dark:bg-blue-900/40 dark:text-blue-300 px-2.5 py-1 rounded-full font-mono border border-blue-200 dark:border-blue-800 uppercase font-bold">
            Role: {user?.role || "Citizen"}
          </span>
        </div>
      </div>

      {/* Visual Status Progress Bar */}
      <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs">
        <div className="mb-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          Resolution Lifecycle Status
        </div>
        <StatusProgressBar status={report.status} />
      </div>

      {/* Role-Aware Action Bar for Management */}
      {(canAssignReport(user) || canUpdateStatus(user, report)) && (
        <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-4 rounded-2xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0" />
            <div>
              <p className="font-bold text-xs">Management Action Control Bar</p>
              <p className="text-[11px] text-indigo-200">
                Logged in as <strong className="text-white">{user?.name}</strong> ({user?.role})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {canAssignReport(user) && (
              <button
                onClick={() => setIsAssignModalOpen(true)}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Building2 className="w-3.5 h-3.5" /> Assign Dept / Officer
              </button>
            )}

            {canUpdateStatus(user, report) && (
              <button
                onClick={() => setIsStatusModalOpen(true)}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Update Status
              </button>
            )}
          </div>
        </div>
      )}

      {/* Report Main Header & Information Card */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-700 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono font-extrabold text-sm text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/40 px-2.5 py-0.5 rounded border border-teal-200 dark:border-teal-800">
                {report.id}
              </span>
              {report.aiGenerated && (
                <span className="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-purple-200 dark:border-purple-800 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" /> AI Assisted Report
                </span>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {report.title}
            </h1>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {user?.role === "admin" ? (
              <select
                value={report.priority}
                onChange={(e) =>
                  updateReportPriority(report.id, e.target.value as CivicReport["priority"])
                }
                className={`text-xs font-bold px-3 py-1 rounded-full border uppercase focus:outline-none cursor-pointer ${
                  priorityColors[report.priority]
                }`}
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent Priority</option>
              </select>
            ) : (
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full border uppercase ${
                  priorityColors[report.priority]
                }`}
              >
                {report.priority} Priority
              </span>
            )}
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-700">
            <span className="text-[10px] text-slate-400 font-medium block">Category & Type</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 block mt-0.5">
              {report.category} ({report.issueType})
            </span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-700">
            <span className="text-[10px] text-slate-400 font-medium block">Location Landmark</span>
            <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1 mt-0.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span className="truncate">{report.location.address || report.location.city}</span>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-700">
            <span className="text-[10px] text-slate-400 font-medium block">Assigned Department</span>
            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1 mt-0.5">
              <Building2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span>{report.department || "Unassigned"}</span>
            </div>
          </div>
        </div>

        {/* Assignment Metadata Box if assigned */}
        {report.assignment && (
          <div className="bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/40 rounded-xl p-3.5 text-xs text-indigo-900 dark:text-indigo-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <div>
                <p className="font-bold">Assigned Field Officer: {report.assignment.assignedTo}</p>
                <p className="text-[11px] text-indigo-700 dark:text-indigo-300">
                  Assigned by {report.assignment.assignedBy} on {report.assignment.assignedAt}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Description */}
        <div className="space-y-1.5 pt-2">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
            Complaint Details
          </span>
          <p className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 leading-relaxed font-normal">
            {report.description}
          </p>
        </div>

        {/* Images */}
        {report.images && report.images.length > 0 && (
          <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-700">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-teal-600" /> Photo Evidence ({report.images.length})
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {report.images.map((img) => (
                <div
                  key={img.id}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-2xs bg-slate-50 dark:bg-slate-900 flex flex-col justify-between"
                >
                  <a
                    href={img.previewUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group block relative"
                  >
                    <img
                      src={img.previewUrl}
                      alt={img.name}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute bottom-0 inset-x-0 p-1.5 bg-slate-900/80 text-white text-[10px] truncate">
                      {img.name}
                    </div>
                    {img.analysis && (
                      <span className="absolute top-2 left-2 bg-purple-900/90 text-purple-200 text-[9px] font-bold px-2 py-0.5 rounded-full border border-purple-700 flex items-center gap-1 shadow-sm">
                        <Sparkles className="w-2.5 h-2.5 text-amber-300" /> AI Visual Evidence
                      </span>
                    )}
                  </a>

                  {img.analysis && (
                    <div className="p-2.5 text-[11px] bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 space-y-1">
                      <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                        <span>{img.analysis.detectedIssue}</span>
                        <span className="text-[10px] text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/40 px-1.5 py-0.2 rounded font-mono">
                          {Math.round((img.analysis.confidence ?? 0.9) * 100)}% Match
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-600 dark:text-slate-400 line-clamp-2">
                        {img.analysis.observations?.[0]?.text}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Internal Management Notes (Strictly hidden from Citizen role) */}
      <InternalNotes
        notes={report.internalNotes}
        currentUser={user}
        onAddNote={(text) => addInternalNote(report.id, text)}
      />

      {/* Citizen Interactive Actions (Follow-Up & Resolution Feedback) */}
      {user?.role === "citizen" && (
        <div className="space-y-4">
          {/* Add Follow-Up Form */}
          {report.status !== "resolved" && report.status !== "rejected" && (
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-teal-600" />
                Add Follow-Up Information
              </h3>
              <form onSubmit={handleFollowUpSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={followUpText}
                  onChange={(e) => setFollowUpText(e.target.value)}
                  placeholder="Provide additional details or landmark update..."
                  className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                  type="submit"
                  disabled={!followUpText.trim()}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed shadow-xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" /> Send
                </button>
              </form>
            </div>
          )}

          {/* Resolution Confirmation Box */}
          {(report.status === "resolved" || report.status === "rejected") && (
            <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-300 font-bold text-xs">
                <ThumbsUp className="w-4 h-4 text-emerald-600" />
                <span>Citizen Resolution Verification</span>
              </div>
              <p className="text-xs text-emerald-800 dark:text-emerald-400">
                The department has marked this issue as resolved. Please confirm if the problem on ground has been fixed.
              </p>

              {report.resolutionFeedback ? (
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs">
                  <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-0.5">
                    Your Feedback: {report.resolutionFeedback.status === "confirmed" ? "Confirmed Fixed" : "Issue Still Persists"}
                  </span>
                  {report.resolutionFeedback.comment && (
                    <p className="text-slate-600 dark:text-slate-300 italic">
                      “{report.resolutionFeedback.comment}”
                    </p>
                  )}
                  <span className="text-[10px] text-gray-400 block mt-1">
                    Submitted at {report.resolutionFeedback.submittedAt}
                  </span>
                </div>
              ) : (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={feedbackComment}
                    onChange={(e) => setFeedbackComment(e.target.value)}
                    placeholder="Optional feedback comment for municipal team..."
                    className="w-full bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-800 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleFeedbackSubmit("confirmed")}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" /> Confirm Resolved
                    </button>
                    <button
                      onClick={() => handleFeedbackSubmit("not_resolved")}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" /> Issue Still Persists
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Public Tracking Timeline */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs">
        <ReportTimeline currentStatus={report.status} timeline={report.timeline} />
      </div>

      {/* Modals */}
      {isAssignModalOpen && (
        <AssignReportModal
          report={report}
          currentUser={user}
          isOpen={isAssignModalOpen}
          onClose={() => setIsAssignModalOpen(false)}
          onAssign={(dept, officer) => assignReport(report.id, dept, officer)}
        />
      )}

      {isStatusModalOpen && (
        <StatusUpdateModal
          report={report}
          currentUser={user}
          isOpen={isStatusModalOpen}
          onClose={() => setIsStatusModalOpen(false)}
          onConfirm={(status, note) => updateReportStatus(report.id, status, note)}
        />
      )}
    </div>
  );
};
