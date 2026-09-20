import React from "react";
import { BarChart3, Download, ShieldCheck, Building2, User } from "lucide-react";
import type { User as UserType, CivicReport } from "../../types";
import { exportAnalyticsToCsv } from "../../utils/analyticsUtils";

interface AnalyticsHeaderProps {
  currentUser: UserType | null;
  filteredReports: CivicReport[];
}

export const AnalyticsHeader: React.FC<AnalyticsHeaderProps> = ({
  currentUser,
  filteredReports,
}) => {
  const role = currentUser?.role || "citizen";

  const roleConfig = {
    admin: {
      title: "System-Wide Civic Analytics",
      subtitle: "Complete municipal breakdown across all departments, categories, and report lifecycles.",
      badge: "Admin Master View",
      icon: ShieldCheck,
      color: "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
    },
    department: {
      title: "Department Performance Analytics",
      subtitle: `Metrics and resolution speeds scoped to ${currentUser?.department || "Roads & Infrastructure Department"}.`,
      badge: "Department Desk",
      icon: Building2,
      color: "bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    },
    citizen: {
      title: "My Civic Impact & Tracking",
      subtitle: "Personal civic contribution metrics and community issue resolution summary.",
      badge: "Citizen Impact",
      icon: User,
      color: "bg-teal-50 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300 border-teal-200 dark:border-teal-800",
    },
  };

  const config = roleConfig[role] || roleConfig.citizen;
  const RoleIcon = config.icon;

  const handleExportCsv = () => {
    exportAnalyticsToCsv(filteredReports, `sevafix-${role}-analytics.csv`);
  };

  return (
    <div className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-5">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 border border-teal-200/80 dark:border-slate-700 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            Real-Time Frontend Analytics
          </span>
          <span className="text-[10px] bg-slate-200/70 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-mono px-2 py-0.5 rounded">
            SevaFix Demo Environment
          </span>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
          Calculated dynamically from live LocalStorage reports in this session.
        </p>
      </div>

      {/* Main Header Title & Export Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-xs font-bold px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${config.color}`}
            >
              <RoleIcon className="w-3.5 h-3.5" /> {config.badge}
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            <span>{config.title}</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{config.subtitle}</p>
        </div>

        {role === "admin" && (
          <button
            onClick={handleExportCsv}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
            title="Export filtered analytics dataset to CSV"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        )}
      </div>
    </div>
  );
};
