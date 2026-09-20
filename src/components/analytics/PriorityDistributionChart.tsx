import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { DistributionItem } from "../../types/analytics";

interface PriorityDistributionChartProps {
  data: DistributionItem[];
}

export const PriorityDistributionChart: React.FC<PriorityDistributionChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-xs text-center flex flex-col items-center justify-center min-h-[300px]">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          No priority distribution data available for active filters.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-xs space-y-3">
      <div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          Priority Breakdown
        </h3>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          Grievance severity distribution
        </p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#64748b" }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#64748b" }} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload as DistributionItem;
                  return (
                    <div className="bg-slate-900 text-white text-xs p-2.5 rounded-xl shadow-lg border border-slate-700">
                      <p className="font-bold">{item.label} Priority</p>
                      <p className="text-teal-300">
                        {item.count} report{item.count === 1 ? "" : "s"} ({item.percentage}%)
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={28}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || "#3b82f6"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
