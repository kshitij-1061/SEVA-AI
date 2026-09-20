import React, { useState } from "react";
import { useVision } from "../context/VisionContext";
import type { VisionAnalysisResult } from "../types";
import { VisionResultCard } from "./VisionResultCard";
import { validateImage, formatFileSize } from "../utils/imageUtils";
import {
  Upload,
  Sparkles,
  Loader2,
  AlertCircle,
  Image as ImageIcon,
  CheckCircle2,
} from "lucide-react";

interface ImageAnalyzerProps {
  initialImage?: File | string;
  initialName?: string;
  categoryContext?: string;
  issueTypeContext?: string;
  onAcceptFindings?: (result: VisionAnalysisResult) => void;
  onUseDescription?: (desc: string) => void;
}

export const ImageAnalyzer: React.FC<ImageAnalyzerProps> = ({
  initialImage,
  initialName,
  categoryContext,
  issueTypeContext,
  onAcceptFindings,
  onUseDescription,
}) => {
  const { analyzeImage, isAnalyzing } = useVision();

  const [selectedFile, setSelectedFile] = useState<File | null>(
    initialImage instanceof File ? initialImage : null
  );
  const [previewUrl, setPreviewUrl] = useState<string>(
    typeof initialImage === "string" ? initialImage : ""
  );
  const [fileName, setFileName] = useState<string>(
    initialName || (initialImage instanceof File ? initialImage.name : "photo.jpg")
  );
  const [fileSize, setFileSize] = useState<number | undefined>(
    initialImage instanceof File ? initialImage.size : undefined
  );

  const [analysisResult, setAnalysisResult] = useState<VisionAnalysisResult | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [acceptedNotice, setAcceptedNotice] = useState<string | null>(null);

  const handleFileChange = (file: File) => {
    setValidationError(null);
    setAcceptedNotice(null);
    const validation = validateImage(file);
    if (!validation.valid) {
      setValidationError(validation.error || "Invalid file format");
      return;
    }

    setSelectedFile(file);
    setFileName(file.name);
    setFileSize(file.size);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
      setAnalysisResult(null);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!previewUrl && !selectedFile) return;
    setValidationError(null);
    setAcceptedNotice(null);

    try {
      const target = selectedFile || previewUrl;
      const result = await analyzeImage(target, {
        category: categoryContext,
        issueType: issueTypeContext,
        filename: fileName,
      });
      setAnalysisResult(result);
    } catch (err) {
      console.error("Image analysis failed:", err);
      setValidationError("Failed to analyze image. Please try again.");
    }
  };

  const handleAccept = (result: VisionAnalysisResult) => {
    if (onAcceptFindings) {
      onAcceptFindings(result);
    }
    setAcceptedNotice("AI findings applied to report! Review your information before submission.");
  };

  const handleReject = () => {
    setAnalysisResult(null);
    setAcceptedNotice("AI findings discarded. Your original report choices remain unchanged.");
  };

  return (
    <div className="space-y-4">
      {validationError && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{validationError}</span>
        </div>
      )}

      {acceptedNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{acceptedNotice}</span>
        </div>
      )}

      {/* File Select Area if no preview yet */}
      {!previewUrl && (
        <div className="border-2 border-dashed border-slate-300 hover:border-teal-500 bg-slate-50/70 p-6 rounded-2xl text-center cursor-pointer transition-all relative">
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileChange(e.target.files[0]);
              }
            }}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-2 text-teal-600 border border-slate-200 shadow-2xs">
            <Upload className="w-6 h-6" />
          </div>
          <div className="text-xs font-bold text-slate-800">Choose or Drop Civic Photo</div>
          <p className="text-[11px] text-slate-500 mt-0.5">JPG, PNG, or WEBP up to 10 MB</p>
        </div>
      )}

      {/* Image Preview & Analyze Action Bar */}
      {previewUrl && (
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <img
              src={previewUrl}
              alt={fileName}
              className="w-16 h-16 rounded-xl object-cover border border-slate-200 shadow-2xs shrink-0"
            />
            <div className="truncate text-xs">
              <span className="font-bold text-slate-900 block truncate max-w-xs">{fileName}</span>
              {fileSize && (
                <span className="text-[10px] text-slate-500 font-mono block">
                  {formatFileSize(fileSize)}
                </span>
              )}
              <span className="text-[10px] text-teal-700 font-semibold flex items-center gap-1 mt-0.5">
                <ImageIcon className="w-3 h-3" /> Ready for AI Vision Scan
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold rounded-xl text-xs transition-all shadow-xs flex items-center justify-center gap-2 disabled:opacity-50 shrink-0"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                Scanning Visual Evidence...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                {analysisResult ? "Re-analyze with AI" : "Analyze Photo with AI"}
              </>
            )}
          </button>
        </div>
      )}

      {/* Result Card Component */}
      {analysisResult && (
        <VisionResultCard
          result={analysisResult}
          onAccept={handleAccept}
          onReject={handleReject}
          onRetry={handleAnalyze}
          onUseDescription={onUseDescription}
        />
      )}
    </div>
  );
};
