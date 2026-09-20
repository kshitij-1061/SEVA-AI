import React from "react";
import type { VisionAnalysisResult } from "../types";
import { VisionObservationList } from "./VisionObservationList";
import { VisionConfidence } from "./VisionConfidence";
import { VisionDisclaimer } from "./VisionDisclaimer";
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Tag,
  FileText,
} from "lucide-react";

interface VisionResultCardProps {
  result: VisionAnalysisResult;
  onAccept?: (result: VisionAnalysisResult) => void;
  onReject?: () => void;
  onRetry?: () => void;
  onUseDescription?: (desc: string) => void;
}

export const VisionResultCard: React.FC<VisionResultCardProps> = ({
  result,
  onAccept,
  onReject,
  onRetry,
  onUseDescription,
}) => {
  const severityColors = {
    low: "bg-slate-100 text-slate-800 border-slate-200",
    medium: "bg-blue-100 text-blue-800 border-blue-200",
    high: "bg-amber-100 text-amber-800 border-amber-200",
    urgent: "bg-rose-100 text-rose-800 border-rose-200",
  };

  const severityBadge = result.severity ? severityColors[result.severity] : severityColors.medium;

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-md space-y-4 text-xs animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-teal-50 text-teal-600 rounded-lg">
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div>
            <span className="font-bold text-slate-900 text-sm block">AI Vision Evidence Result</span>
            <span className="text-[10px] text-slate-400 font-mono">Analyzed at {result.analyzedAt || "Just now"}</span>
          </div>
        </div>

        {result.severity && (
          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase ${severityBadge}`}>
            Suggested Severity: {result.severity}
          </span>
        )}
      </div>

      {/* Detection Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
          <span className="text-[10px] text-slate-400 font-medium block">Detected Category</span>
          <span className="font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
            <Tag className="w-3.5 h-3.5 text-teal-600" />
            {result.detectedCategory || "General Civic Issue"}
          </span>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
          <span className="text-[10px] text-slate-400 font-medium block">Detected Specific Issue</span>
          <span className="font-bold text-slate-900 mt-0.5 block">{result.detectedIssue || "Pothole"}</span>
        </div>
      </div>

      {/* Confidence Bar */}
      {result.confidence && <VisionConfidence confidence={result.confidence} />}

      {/* Observations List */}
      <VisionObservationList observations={result.observations} />

      {/* Suggested Description Box */}
      {result.suggestedDescription && (
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-800 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-teal-600" /> AI Suggested Description
            </span>
            {onUseDescription && (
              <button
                type="button"
                onClick={() => onUseDescription(result.suggestedDescription!)}
                className="text-[10px] font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 px-2 py-0.5 rounded border border-teal-200"
              >
                Use Description
              </button>
            )}
          </div>
          <p className="text-[11px] text-slate-700 italic bg-white p-2.5 rounded-lg border border-slate-200">
            “{result.suggestedDescription}”
          </p>
        </div>
      )}

      {/* Disclaimer */}
      <VisionDisclaimer provider={result.provider} />

      {/* Action Footer */}
      <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
        <div className="flex gap-2">
          {onReject && (
            <button
              type="button"
              onClick={onReject}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs flex items-center gap-1"
            >
              <XCircle className="w-3.5 h-3.5 text-slate-500" /> Ignore Findings
            </button>
          )}

          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" /> Re-analyze
            </button>
          )}
        </div>

        {onAccept && (
          <button
            type="button"
            onClick={() => onAccept(result)}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs transition-all shadow-xs flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-200" /> Use AI Findings in Report
          </button>
        )}
      </div>
    </div>
  );
};
