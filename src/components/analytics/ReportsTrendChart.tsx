import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { TrendPoint } from "../../types/analytics";

interface ReportsTrendChartProps {
  data: TrendPoint[];
}

export const ReportsTrendChart: React.FC<ReportsTrendChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-xs text-center flex flex-col items-center justify-center min-h-[300px]">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Insufficient timeline data to generate reporting trend points.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Reports Over Time
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Filing velocity and status transitions timeline
          </p>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="totalGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0d9488" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#0d9488" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="resolvedGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="formattedDate"
              tick={{ fontSize: 11, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 11, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-slate-900 text-white text-xs p-3 rounded-xl shadow-lg border border-slate-700 space-y-1">
                      <p className="font-bold border-b border-slate-700 pb-1">{label}</p>
                      {payload.map((p) => (
                        <div key={p.name} className="flex justify-between gap-4">
                          <span style={{ color: p.color }}>{p.name}:</span>
                          <span className="font-bold">{p.value}</span>
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend verticalAlign="top" height={30} align="right" />
            <Area
              type="monotone"
              dataKey="total"
              name="Total Reports"
              stroke="#0d9488"
              fillOpacity={1}
              fill="url(#totalGrad)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="resolved"
              name="Resolved"
              stroke="#10b981"
              fillOpacity={1}
              fill="url(#resolvedGrad)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
