import React from "react";
import { FileText, Check } from "lucide-react";

interface RequiredDocumentsProps {
  documents: string[];
}

export const RequiredDocuments: React.FC<RequiredDocumentsProps> = ({ documents }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
          <FileText className="w-4 h-4 text-teal-600" />
          Required & Recommended Documents ({documents.length})
        </span>
        <span className="text-[10px] text-slate-400 font-mono">Indicative Checklist</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        {documents.map((doc, idx) => (
          <div
            key={idx}
            className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-start gap-2 text-slate-800"
          >
            <div className="w-4 h-4 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
              <Check className="w-3 h-3 text-teal-700" />
            </div>
            <span className="leading-tight font-medium">{doc}</span>
          </div>
        ))}
      </div>

      <p className="text-[10px] text-slate-500 italic mt-2">
        Note: Documents shown are indicative. Additional local revenue or identity verification papers may be requested by officers.
      </p>
    </div>
  );
};
