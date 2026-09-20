import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { DistributionItem } from "../../types/analytics";

interface StatusDistributionChartProps {
  data: DistributionItem[];
}

export const StatusDistributionChart: React.FC<StatusDistributionChartProps> = ({ data }) => {
  const hasData = data.some((item) => item.count > 0);

  if (!hasData) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-xs text-center flex flex-col items-center justify-center min-h-[300px]">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          No report status distribution data available for selected filters.
        </p>
      </div>
    );
  }

  const chartData = data.filter((item) => item.count > 0);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Status Breakdown
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Proportion of complaints across lifecycle stages
          </p>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={3}
              dataKey="count"
              nameKey="label"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || "#8884d8"} />
              ))}
            </Pie>
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
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value: string) => (
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300 mr-2">
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
