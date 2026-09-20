import React from "react";
import { Info, Shield } from "lucide-react";

interface VisionDisclaimerProps {
  provider: "demo" | "real";
}

export const VisionDisclaimer: React.FC<VisionDisclaimerProps> = ({ provider }) => {
  return (
    <div className="bg-amber-500/10 border border-amber-500/20 text-amber-900 p-3 rounded-xl text-xs space-y-1">
      <div className="flex items-center gap-1.5 font-bold text-amber-800">
        <Info className="w-4 h-4 text-amber-600 shrink-0" />
        <span>{provider === "demo" ? "Demo Vision Analysis" : "AI Vision Analysis"}</span>
      </div>
      <p className="text-[11px] text-amber-900/80 leading-normal">
        {provider === "demo"
          ? "This prototype uses simulated vision classification. Results are illustrative and should be reviewed by the citizen before report submission."
          : "Images are analyzed using automated computer vision. Findings assist reporting and do not constitute binding government inspection."}
      </p>
      <div className="pt-1 text-[10px] text-amber-700 font-mono flex items-center gap-1">
        <Shield className="w-3 h-3 text-amber-600" />
        <span>Privacy Notice: Images are processed in local session and not uploaded to external servers.</span>
      </div>
    </div>
  );
};
