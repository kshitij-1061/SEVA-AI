import React from "react";
import type { CreateReportInput } from "../types";
import {
  MapPin,
  Building2,
  AlertCircle,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Image as ImageIcon,
} from "lucide-react";

interface ReportReviewProps {
  input: CreateReportInput;
  suggestedDepartment: string;
  onEdit: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export const ReportReview: React.FC<ReportReviewProps> = ({
  input,
  suggestedDepartment,
  onEdit,
  onSubmit,
  isSubmitting = false,
}) => {
  const priorityColors = {
    low: "bg-slate-100 text-slate-800 border-slate-200",
    medium: "bg-blue-100 text-blue-800 border-blue-200",
    high: "bg-amber-100 text-amber-800 border-amber-200",
    urgent: "bg-rose-100 text-rose-800 border-rose-200",
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl space-y-6 animate-in fade-in duration-200">
      <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200 uppercase tracking-wider">
            Step 4 of 4: Review Before Submission
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-2">Verify Your Civic Report</h2>
        </div>
        {input.aiGenerated && (
          <span className="bg-teal-900 text-teal-200 text-[10px] font-bold px-2.5 py-1 rounded-full border border-teal-700 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-300" /> AI Assisted
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
          <span className="text-[11px] text-slate-400 font-semibold block uppercase tracking-wider">
            Problem & Classification
          </span>
          <div>
            <span className="text-slate-500 font-medium">Category:</span>{" "}
            <strong className="text-slate-900">{input.category}</strong>
          </div>
          <div>
            <span className="text-slate-500 font-medium">Issue Type:</span>{" "}
            <strong className="text-slate-900">{input.issueType}</strong>
          </div>
          <div>
            <span className="text-slate-500 font-medium">Title:</span>{" "}
            <strong className="text-slate-900">{input.title}</strong>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <span className="text-slate-500 font-medium">Priority:</span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${
                priorityColors[input.priority]
              }`}
            >
              {input.priority}
            </span>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
          <span className="text-[11px] text-slate-400 font-semibold block uppercase tracking-wider">
            Location & Municipal Routing
          </span>
          <div className="flex items-start gap-1.5">
            <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 block">{input.location.address}</strong>
              <span className="text-slate-500">{input.location.city || "Meerut"}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200/80">
            <span className="text-[10px] text-slate-500 font-medium block">Suggested Department</span>
            <div className="font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
              <Building2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span>{suggestedDepartment}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
        <span className="text-[11px] text-slate-400 font-semibold block uppercase tracking-wider">
          Detailed Description
        </span>
        <p className="text-slate-800 leading-relaxed italic bg-white p-3 rounded-xl border border-slate-200">
          “{input.description}”
        </p>
      </div>

      {input.images && input.images.length > 0 && (
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <ImageIcon className="w-4 h-4 text-teal-600" /> Attached Photos ({input.images.length})
          </span>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {input.images.map((img) => (
              <img
                key={img.id}
                src={img.previewUrl}
                alt={img.name}
                className="w-16 h-16 rounded-lg object-cover border border-slate-200 shadow-2xs shrink-0"
              />
            ))}
          </div>
        </div>
      )}

      <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-[11px] text-amber-800 flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <span>
          <strong>Demo Submission Notice:</strong> Clicking submit will generate a unique SevaFix report ID (`SF-XXXX`) and save the complaint to your local demo environment.
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={onEdit}
          disabled={isSubmitting}
          className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back & Edit Form
        </button>

        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-200" />
          {isSubmitting ? "Generating Demo Report ID..." : "Confirm & Submit Civic Report"}
        </button>
      </div>
    </div>
  );
};
