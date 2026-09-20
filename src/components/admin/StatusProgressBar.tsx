import React from "react";
import { CheckCircle2, Clock, AlertCircle, XCircle } from "lucide-react";
import type { ReportStatus } from "../../types";

interface StatusProgressBarProps {
  status: ReportStatus;
  compact?: boolean;
}

export const StatusProgressBar: React.FC<StatusProgressBarProps> = ({ status, compact = false }) => {
  const steps: { key: ReportStatus; label: string; icon: React.ReactNode }[] = [
    { key: "submitted", label: "Submitted", icon: <Clock className="w-4 h-4" /> },
    { key: "acknowledged", label: "Acknowledged", icon: <CheckCircle2 className="w-4 h-4" /> },
    { key: "in_progress", label: "In Progress", icon: <AlertCircle className="w-4 h-4" /> },
    { key: "resolved", label: "Resolved", icon: <CheckCircle2 className="w-4 h-4" /> },
  ];

  const getStepState = (currentIndex: number, stepIndex: number) => {
    if (status === "rejected") {
      return stepIndex === 0 ? "completed" : "rejected";
    }
    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "upcoming";
  };

  const statusOrder: ReportStatus[] = ["submitted", "acknowledged", "in_progress", "resolved"];
  const currentIndex = status === "rejected" ? -1 : statusOrder.indexOf(status);

  if (status === "rejected") {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-red-700 dark:text-red-300 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          <span className="font-semibold text-sm">Report Closed / Rejected</span>
        </div>
        <span className="text-xs text-red-500 dark:text-red-400">Demo Environment</span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative flex items-center justify-between">
        {/* Connecting Line Background */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-gray-200 dark:bg-slate-700 z-0" />
        
        {/* Progress Line */}
        <div
          className="absolute top-1/2 left-0 -translate-y-1/2 h-1 bg-emerald-500 transition-all duration-300 z-0"
          style={{
            width: `${(Math.max(0, currentIndex) / (steps.length - 1)) * 100}%`,
          }}
        />

        {steps.map((step, idx) => {
          const state = getStepState(currentIndex, idx);
          let circleStyle = "bg-gray-200 text-gray-500 border-gray-300 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700";
          
          if (state === "completed") {
            circleStyle = "bg-emerald-600 text-white border-emerald-600 shadow-sm";
          } else if (state === "current") {
            circleStyle = "bg-blue-600 text-white border-blue-600 ring-4 ring-blue-100 dark:ring-blue-900/50 shadow-md animate-pulse";
          }

          return (
            <div key={step.key} className="relative z-10 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${circleStyle}`}>
                {step.icon}
              </div>
              {!compact && (
                <span
                  className={`mt-2 text-xs font-medium text-center ${
                    state === "current"
                      ? "text-blue-700 dark:text-blue-400 font-bold"
                      : state === "completed"
                      ? "text-emerald-700 dark:text-emerald-400"
                      : "text-gray-500 dark:text-slate-400"
                  }`}
                >
                  {step.label}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
