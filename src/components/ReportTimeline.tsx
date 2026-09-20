import React from "react";
import type { ReportStatus, ReportTimelineEvent } from "../types";
import { CheckCircle2, Clock, AlertTriangle, ShieldCheck, Building2, User } from "lucide-react";

interface ReportTimelineProps {
  currentStatus: ReportStatus;
  timeline: ReportTimelineEvent[];
}

export const ReportTimeline: React.FC<ReportTimelineProps> = ({
  currentStatus,
  timeline,
}) => {
  const steps: { status: ReportStatus; label: string; desc: string }[] = [
    { status: "submitted", label: "Submitted", desc: "Report recorded in SevaFix system" },
    { status: "acknowledged", label: "Acknowledged", desc: "Verified by municipal admin" },
    { status: "in_progress", label: "In Progress", desc: "Work assigned & team dispatched" },
    { status: "resolved", label: "Resolved", desc: "Issue resolved & inspected" },
  ];

  const getStepIndex = (st: ReportStatus) => {
    switch (st) {
      case "submitted":
        return 0;
      case "acknowledged":
        return 1;
      case "in_progress":
        return 2;
      case "resolved":
        return 3;
      case "rejected":
        return -1;
      default:
        return 0;
    }
  };

  const currentStepIdx = getStepIndex(currentStatus);

  const getActorBadge = (actor?: string) => {
    switch (actor) {
      case "admin":
        return { label: "Admin Officer", icon: ShieldCheck, bg: "bg-indigo-100 text-indigo-800" };
      case "department":
        return { label: "Department Team", icon: Building2, bg: "bg-amber-100 text-amber-800" };
      case "citizen":
        return { label: "Citizen", icon: User, bg: "bg-teal-100 text-teal-800" };
      default:
        return { label: "SevaFix System", icon: Clock, bg: "bg-slate-100 text-slate-700" };
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar Steps */}
      <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
        <div className="text-xs font-bold text-slate-800 mb-4 flex items-center justify-between">
          <span>Live Resolution Progress Lifecycle</span>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">
            Status: {currentStatus.replace("_", " ").toUpperCase()}
          </span>
        </div>

        {currentStatus === "rejected" ? (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2 font-medium">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>This report was rejected after municipal verification. See timeline details below.</span>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 relative">
            {steps.map((step, idx) => {
              const isPassed = idx <= currentStepIdx;
              const isCurrent = idx === currentStepIdx;

              return (
                <div key={step.status} className="flex flex-col items-center text-center relative z-10">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-xs ${
                      isCurrent
                        ? "bg-teal-600 text-white ring-4 ring-teal-100 scale-110"
                        : isPassed
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-200 text-slate-400"
                    }`}
                  >
                    {isPassed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                  </div>
                  <span
                    className={`text-[11px] font-bold mt-2 ${
                      isCurrent
                        ? "text-teal-700 font-extrabold"
                        : isPassed
                        ? "text-slate-800"
                        : "text-slate-400"
                    }`}
                  >
                    {step.label}
                  </span>
                  <span className="text-[9px] text-slate-400 hidden sm:block mt-0.5 max-w-[90px]">
                    {step.desc}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* History Log Timeline Events */}
      <div className="space-y-3">
        <div className="text-xs font-bold text-slate-800 uppercase tracking-wider text-[11px]">
          Status History & Log Events ({timeline.length})
        </div>

        <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {timeline.map((event) => {
            const actorInfo = getActorBadge(event.actor);
            const ActorIcon = actorInfo.icon;

            return (
              <div key={event.id} className="relative group">
                <div className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-teal-600 ring-4 ring-white shadow-xs" />
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-xs font-bold text-slate-900">{event.title}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 ${actorInfo.bg}`}>
                        <ActorIcon className="w-2.5 h-2.5" />
                        {actorInfo.label}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{event.timestamp}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{event.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
