import React, { createContext, useContext, useState } from "react";
import type { VisionAnalysisResult } from "../types";
import { visionService } from "../services/vision/visionService";
import type { VisionAnalysisContext } from "../services/vision/types";

interface VisionContextValue {
  analyses: VisionAnalysisResult[];
  isAnalyzing: boolean;
  analyzeImage: (
    image: File | string,
    context?: VisionAnalysisContext
  ) => Promise<VisionAnalysisResult>;
  getAnalysis: (imageId: string) => VisionAnalysisResult | undefined;
  clearAnalysis: (imageId: string) => void;
}

const VisionContext = createContext<VisionContextValue | undefined>(undefined);

export const VisionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [analyses, setAnalyses] = useState<VisionAnalysisResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const analyzeImage = async (
    image: File | string,
    context?: VisionAnalysisContext
  ): Promise<VisionAnalysisResult> => {
    setIsAnalyzing(true);
    try {
      const result = await visionService.analyzeImage(image, context);
      setAnalyses((prev) => {
        const filtered = prev.filter((a) => a.imageId !== result.imageId);
        return [...filtered, result];
      });
      return result;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getAnalysis = (imageId: string): VisionAnalysisResult | undefined => {
    return analyses.find((a) => a.imageId === imageId);
  };

  const clearAnalysis = (imageId: string) => {
    setAnalyses((prev) => prev.filter((a) => a.imageId !== imageId));
  };

  return (
    <VisionContext.Provider
      value={{
        analyses,
        isAnalyzing,
        analyzeImage,
        getAnalysis,
        clearAnalysis,
      }}
    >
      {children}
    </VisionContext.Provider>
  );
};

export const useVision = (): VisionContextValue => {
  const context = useContext(VisionContext);
  if (!context) {
    throw new Error("useVision must be used within a VisionProvider");
  }
  return context;
};
