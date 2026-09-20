import React, { useState } from "react";
import { X, AlertTriangle, Clock } from "lucide-react";
import type { CivicReport, ReportStatus, User } from "../../types";
import { canTransitionStatus } from "../../utils/reportStatus";

interface StatusUpdateModalProps {
  report: CivicReport;
  currentUser: User | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (newStatus: ReportStatus, publicNote: string) => void;
}

export const StatusUpdateModal: React.FC<StatusUpdateModalProps> = ({
  report,
  currentUser,
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  const availableStatuses: ReportStatus[] = ["submitted", "acknowledged", "in_progress", "resolved", "rejected"];
  const userRole = currentUser?.role || "admin";
  const validTransitions = availableStatuses.filter((targetStatus) =>
    canTransitionStatus(report.status, targetStatus, userRole)
  );

  const [selectedStatus, setSelectedStatus] = useState<ReportStatus>(
    validTransitions[0] || report.status
  );
  const [publicNote, setPublicNote] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!canTransitionStatus(report.status, selectedStatus, userRole)) {
      setError(`Cannot transition from ${report.status} to ${selectedStatus}.`);
      return;
    }

    if (!publicNote.trim()) {
      setError("Please provide an update note for the citizen's tracking timeline.");
      return;
    }

    onConfirm(selectedStatus, publicNote.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100 dark:border-slate-700">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Update Report Status</span>
              <span className="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-mono px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800">
                {report.id}
              </span>
            </h3>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
              Current status: <strong className="text-slate-700 dark:text-slate-300 capitalize">{report.status.replace("_", " ")}</strong>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-xs text-red-600 dark:text-red-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              New Status Target
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as ReportStatus)}
              className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {availableStatuses.map((st) => {
                const isValid = canTransitionStatus(report.status, st, userRole);
                return (
                  <option key={st} value={st} disabled={!isValid}>
                    {st.replace("_", " ").toUpperCase()} {!isValid ? "(Invalid state step)" : ""}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Timeline Update Note <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              value={publicNote}
              onChange={(e) => setPublicNote(e.target.value)}
              placeholder="e.g., Inspection team assigned. Work scheduled for tomorrow morning."
              className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <span className="text-[11px] text-gray-500 dark:text-slate-400">
              This message will appear on the citizen's tracking timeline.
            </span>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 rounded-xl p-3 text-xs text-blue-800 dark:text-blue-300 flex items-start gap-2">
            <Clock className="w-4 h-4 shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <p className="font-semibold mb-0.5">Real-time Timeline Updates</p>
              <p className="text-[11px] text-blue-700 dark:text-blue-400">
                Updating status will automatically update the tracking timeline for citizen, admin, and department views.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm cursor-pointer"
            >
              Update Status
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
