import React, { useState } from "react";
import { ImageAnalyzer } from "../components/ImageAnalyzer";
import { Sparkles, Eye } from "lucide-react";

export const ImageAnalyzerPage: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<{
    url: string;
    name: string;
    cat: string;
    type: string;
  } | null>(null);

  const presets = [
    {
      name: "pothole_road.jpg",
      label: "Pothole Evidence",
      url: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=600",
      cat: "Road Infrastructure",
      type: "Pothole",
    },
    {
      name: "garbage_overflow.jpg",
      label: "Garbage Dump Evidence",
      url: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=600",
      cat: "Waste Management",
      type: "Garbage Dump",
    },
    {
      name: "street_lamp_dark.jpg",
      label: "Streetlight Outage",
      url: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&q=80&w=600",
      cat: "Street Lighting",
      type: "Broken Streetlight",
    },
    {
      name: "water_pipe_leak.jpg",
      label: "Water Leakage",
      url: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&q=80&w=600",
      cat: "Water Supply",
      type: "Water Leakage",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-slate-950 p-6 rounded-3xl text-white shadow-xl space-y-3 border border-teal-800">
        <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full text-xs font-semibold border border-teal-500/30">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Module 4: Vision & Visual Evidence
        </div>
        <h1 className="text-2xl font-bold tracking-tight">AI Vision & Evidence Analyzer</h1>
        <p className="text-xs text-slate-300 max-w-2xl">
          Upload photo evidence of potholes, waste dumps, broken streetlights, or water leaks to extract AI-assisted observations, severity ratings, and problem descriptions.
        </p>
      </div>

      {/* Preset Samples Bar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-teal-600" /> Quick Presentation Demo Presets:
          </span>
          <span className="text-[10px] text-slate-400 font-mono">1-Click Test Photos</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedPreset(p)}
              className={`p-2 bg-slate-50 hover:bg-teal-50/60 rounded-xl border text-left transition-all group flex flex-col justify-between ${
                selectedPreset?.name === p.name ? "border-teal-500 ring-2 ring-teal-200" : "border-slate-200"
              }`}
            >
              <img
                src={p.url}
                alt={p.label}
                className="w-full h-20 object-cover rounded-lg mb-2 group-hover:scale-105 transition-transform"
              />
              <div>
                <span className="text-xs font-bold text-slate-800 group-hover:text-teal-700 block truncate">
                  {p.label}
                </span>
                <span className="text-[10px] text-slate-400 block truncate">{p.cat}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Analyzer Tool */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <ImageAnalyzer
          key={selectedPreset?.name || "default"}
          initialImage={selectedPreset?.url}
          initialName={selectedPreset?.name}
          categoryContext={selectedPreset?.cat}
          issueTypeContext={selectedPreset?.type}
        />
      </div>
    </div>
  );
};
