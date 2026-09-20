import React from "react";
import { Building2 } from "lucide-react";
import type { DepartmentWorkload as WorkloadItem } from "../../types/analytics";

interface DepartmentWorkloadProps {
  workload: WorkloadItem[];
}

export const DepartmentWorkload: React.FC<DepartmentWorkloadProps> = ({ workload }) => {
  if (!workload || workload.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-xs text-center">
        <Building2 className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Department Workload</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Department workload will appear when reports are assigned to municipal departments.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Department Workload & Performance</span>
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Active workload and resolution stats by assigned municipal department
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/80 dark:bg-slate-900/60 border-b border-gray-200 dark:border-slate-700 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-3">Department</th>
              <th className="py-3 px-3 text-center">Assigned</th>
              <th className="py-3 px-3 text-center">Active</th>
              <th className="py-3 px-3 text-center">Resolved</th>
              <th className="py-3 px-3 text-center">High Priority</th>
              <th className="py-3 px-3 text-right">Resolution Rate</th>
              <th className="py-3 px-3 text-right">Avg Speed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-700 text-xs text-slate-700 dark:text-slate-200">
            {workload.map((item) => (
              <tr
                key={item.department}
                className="hover:bg-gray-50/60 dark:hover:bg-slate-700/40 transition-colors"
              >
                <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                  <span className="truncate max-w-[200px]">{item.department}</span>
                </td>
                <td className="py-3 px-3 text-center font-bold text-slate-900 dark:text-white">
                  {item.total}
                </td>
                <td className="py-3 px-3 text-center font-bold text-amber-600 dark:text-amber-400">
                  {item.active}
                </td>
                <td className="py-3 px-3 text-center font-bold text-emerald-600 dark:text-emerald-400">
                  {item.resolved}
                </td>
                <td className="py-3 px-3 text-center font-bold text-rose-600 dark:text-rose-400">
                  {item.highPriority}
                </td>
                <td className="py-3 px-3 text-right font-bold text-teal-600 dark:text-teal-400">
                  {item.resolutionRate}%
                </td>
                <td className="py-3 px-3 text-right text-gray-500 dark:text-slate-400 font-mono text-[11px]">
                  {item.avgResolutionTimeFormatted}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
