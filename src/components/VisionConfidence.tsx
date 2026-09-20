import React from "react";
import { Sparkles } from "lucide-react";

interface VisionConfidenceProps {
  confidence: number;
}

export const VisionConfidence: React.FC<VisionConfidenceProps> = ({ confidence }) => {
  const percent = Math.round(confidence * 100);

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-slate-700 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" /> AI Confidence Estimate
        </span>
        <span className="font-bold text-teal-700 font-mono">{percent}%</span>
      </div>
      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-[10px] text-slate-400 italic">
        Confidence score is an estimate provided for citizen review.
      </p>
    </div>
  );
};
