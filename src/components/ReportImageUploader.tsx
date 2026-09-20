import React, { useRef, useState } from "react";
import type { ReportImage, VisionAnalysisResult } from "../types";
import { useVision } from "../context/VisionContext";
import { VisionResultCard } from "./VisionResultCard";
import { Upload, X, Sparkles, Loader2, CheckCircle2, Eye } from "lucide-react";

interface ReportImageUploaderProps {
  images: ReportImage[];
  onChange: (images: ReportImage[]) => void;
  maxImages?: number;
  categoryContext?: string;
  issueTypeContext?: string;
  onApplyVisionFindings?: (result: VisionAnalysisResult) => void;
}

export const ReportImageUploader: React.FC<ReportImageUploaderProps> = ({
  images,
  onChange,
  maxImages = 5,
  categoryContext,
  issueTypeContext,
  onApplyVisionFindings,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { analyzeImage, isAnalyzing } = useVision();
  const [analyzingImageId, setAnalyzingImageId] = useState<string | null>(null);
  const [selectedResultImageId, setSelectedResultImageId] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const remainingSlots = maxImages - images.length;
    const filesToProcess = files.slice(0, remainingSlots);

    const newImages: ReportImage[] = [];

    filesToProcess.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const resultUrl = uploadEvent.target?.result as string;
        newImages.push({
          id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          name: file.name,
          previewUrl: resultUrl,
          uploadedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        });

        if (newImages.length === filesToProcess.length) {
          onChange([...images, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemove = (id: string) => {
    const filtered = images.filter((img) => img.id !== id);
    if (selectedResultImageId === id) setSelectedResultImageId(null);
    onChange(filtered);
  };

  const handleAnalyzeClick = async (img: ReportImage) => {
    setAnalyzingImageId(img.id);
    try {
      const res = await analyzeImage(img.previewUrl, {
        category: categoryContext,
        issueType: issueTypeContext,
        filename: img.name,
      });

      const updated = images.map((item) =>
        item.id === img.id ? { ...item, analysis: res } : item
      );
      onChange(updated);
      setSelectedResultImageId(img.id);
    } catch (err) {
      console.error("Failed image analysis:", err);
    } finally {
      setAnalyzingImageId(null);
    }
  };

  const activeAnalyzedImg = images.find((i) => i.id === selectedResultImageId);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-800">
          Upload Photos of the Issue ({images.length}/{maxImages})
        </label>
        <span className="text-[11px] text-slate-500">
          JPG, PNG, WEBP (Clear photos help document problem)
        </span>
      </div>

      {images.length < maxImages && (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 hover:border-teal-500 bg-slate-50/70 hover:bg-teal-50/30 p-6 rounded-2xl text-center cursor-pointer transition-all group"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            className="hidden"
            onChange={handleFileSelect}
          />
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-xs group-hover:scale-110 transition-transform text-teal-600 border border-slate-200">
            <Upload className="w-6 h-6" />
          </div>
          <div className="text-xs font-bold text-slate-800 group-hover:text-teal-700">
            Click to upload photo evidence
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Attach up to {maxImages} images (e.g., close-up of pothole, street view)
          </p>
        </div>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-2">
          {images.map((img) => {
            const isAnalyzingThis = analyzingImageId === img.id;
            const hasAnalysis = !!img.analysis;

            return (
              <div
                key={img.id}
                className={`relative group bg-white rounded-xl border overflow-hidden shadow-xs flex flex-col justify-between transition-all ${
                  selectedResultImageId === img.id ? "border-teal-500 ring-2 ring-teal-200" : "border-slate-200"
                }`}
              >
                <div className="h-28 w-full bg-slate-100 overflow-hidden relative">
                  <img
                    src={img.previewUrl}
                    alt={img.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemove(img.id)}
                    className="absolute top-1.5 right-1.5 bg-slate-900/80 hover:bg-rose-600 text-white p-1 rounded-full backdrop-blur-xs transition-colors shadow-sm"
                    title="Remove image"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  {hasAnalysis && (
                    <span className="absolute bottom-1.5 left-1.5 bg-emerald-900/90 text-emerald-200 text-[9px] font-bold px-1.5 py-0.2 rounded flex items-center gap-0.5">
                      <CheckCircle2 className="w-2.5 h-2.5" /> Analyzed
                    </span>
                  )}
                </div>

                <div className="p-2 text-[10px] space-y-1.5">
                  <div className="font-semibold text-slate-800 truncate" title={img.name}>
                    {img.name}
                  </div>

                  {hasAnalysis ? (
                    <button
                      type="button"
                      onClick={() => setSelectedResultImageId(selectedResultImageId === img.id ? null : img.id)}
                      className="w-full py-1 bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold rounded border border-teal-200 flex items-center justify-center gap-1"
                    >
                      <Eye className="w-3 h-3" /> View AI Result
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleAnalyzeClick(img)}
                      disabled={isAnalyzing}
                      className="w-full py-1 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded flex items-center justify-center gap-1 shadow-2xs disabled:opacity-50"
                    >
                      {isAnalyzingThis ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <>
                          <Sparkles className="w-3 h-3 text-amber-300" />
                          <span>Analyze AI</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Embedded Active Vision Card */}
      {activeAnalyzedImg && activeAnalyzedImg.analysis && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
            <span>Visual Analysis for: {activeAnalyzedImg.name}</span>
            <button
              type="button"
              onClick={() => setSelectedResultImageId(null)}
              className="text-slate-400 hover:text-slate-600 text-[11px]"
            >
              Close Card
            </button>
          </div>
          <VisionResultCard
            result={activeAnalyzedImg.analysis}
            onAccept={(res) => {
              if (onApplyVisionFindings) onApplyVisionFindings(res);
            }}
            onReject={() => setSelectedResultImageId(null)}
            onRetry={() => handleAnalyzeClick(activeAnalyzedImg)}
          />
        </div>
      )}
    </div>
  );
};
