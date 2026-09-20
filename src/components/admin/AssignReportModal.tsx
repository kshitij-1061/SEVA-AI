import React, { useState } from "react";
import { X, Building2, ShieldCheck } from "lucide-react";
import type { CivicReport, User } from "../../types";

interface AssignReportModalProps {
  report: CivicReport;
  currentUser: User | null;
  isOpen: boolean;
  onClose: () => void;
  onAssign: (department: string, officerName: string) => void;
}

const DEPARTMENTS = [
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

const SAMPLE_OFFICERS: Record<string, string[]> = {
  "Roads & Infrastructure Department": ["Er. Rajesh Sharma", "Er. Amit Verma"],
  "Electrical & Street Lighting Cell": ["Er. Suresh Kumar", "Er. Priya Singh"],
  "Waste Management & Sanitation": ["Officer Sunil Yadav", "Officer Meena Kumari"],
  "Water Supply & Jal Nigam": ["Er. Alok Mishra", "Er. Kavita Roy"],
  "Drainage & Sewerage Division": ["Er. Vikas Chaudhary", "Er. Deepak Tyagi"],
  "Public Health & Sanitation": ["Dr. Anjali Gupta", "Inspector Rakesh Tomar"],
  "Traffic & Public Transport Cell": ["Insp. Sanjay Rathore", "Insp. Vikram Malik"],
  "Horticulture & Parks Department": ["Officer Sunita Devi", "Officer Manoj Kulkarni"],
  "General Municipal Grievance Division": ["Officer Rohit Saxena", "Officer Neha Joshi"],
};

export const AssignReportModal: React.FC<AssignReportModalProps> = ({
  report,
  isOpen,
  onClose,
  onAssign,
}) => {
  if (!isOpen) return null;

  const [selectedDept, setSelectedDept] = useState<string>(report.department || DEPARTMENTS[0]);
  const [officerName, setOfficerName] = useState<string>(
    report.assignment?.assignedTo || SAMPLE_OFFICERS[selectedDept]?.[0] || "Er. Rajesh Sharma"
  );

  const handleDeptChange = (dept: string) => {
    setSelectedDept(dept);
    if (SAMPLE_OFFICERS[dept] && SAMPLE_OFFICERS[dept].length > 0) {
      setOfficerName(SAMPLE_OFFICERS[dept][0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAssign(selectedDept, officerName.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100 dark:border-slate-700">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Assign Department & Officer</span>
            </h3>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
              Report Ref: <strong className="font-mono text-indigo-600 dark:text-indigo-400">{report.id}</strong>
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
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Select Department
            </label>
            <select
              value={selectedDept}
              onChange={(e) => handleDeptChange(e.target.value)}
              className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Assign Officer Name
            </label>
            <div className="space-y-2">
              <input
                type="text"
                value={officerName}
                onChange={(e) => setOfficerName(e.target.value)}
                placeholder="Enter officer name..."
                className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />

              {SAMPLE_OFFICERS[selectedDept] && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[11px] text-gray-500 dark:text-slate-400 self-center">Quick pick:</span>
                  {SAMPLE_OFFICERS[selectedDept].map((name) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => setOfficerName(name)}
                      className={`text-[11px] px-2 py-0.5 rounded-full border transition-colors cursor-pointer ${
                        officerName === name
                          ? "bg-indigo-100 border-indigo-300 text-indigo-700 dark:bg-indigo-900/60 dark:border-indigo-700 dark:text-indigo-300 font-medium"
                          : "bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/40 rounded-xl p-3 text-xs text-indigo-800 dark:text-indigo-300 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0 text-indigo-600 dark:text-indigo-400 mt-0.5" />
            <div>
              <p className="font-semibold mb-0.5">Role Routing Notice</p>
              <p className="text-[11px] text-indigo-700 dark:text-indigo-400">
                Assigning this department allows officers switching to the Department Role to view and manage this report in their dashboard.
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
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-sm cursor-pointer"
            >
              Confirm Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
