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

interface CategoryDistributionChartProps {
  data: DistributionItem[];
}

export const CategoryDistributionChart: React.FC<CategoryDistributionChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-xs text-center flex flex-col items-center justify-center min-h-[300px]">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          No category distribution data available for active filters.
        </p>
      </div>
    );
  }

  const COLORS = ["#0d9488", "#0284c7", "#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-xs space-y-3">
      <div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          Category Distribution
        </h3>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          Volume of civic complaints grouped by category
        </p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
            <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11, fill: "#64748b" }} />
            <YAxis
              dataKey="label"
              type="category"
              tick={{ fontSize: 10, fill: "#64748b" }}
              width={110}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload as DistributionItem;
                  return (
                    <div className="bg-slate-900 text-white text-xs p-2.5 rounded-xl shadow-lg border border-slate-700">
                      <p className="font-bold">{item.label}</p>
                      <p className="text-teal-300">
                        {item.count} report{item.count === 1 ? "" : "s"} ({item.percentage}%)
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={16}>
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
