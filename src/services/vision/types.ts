import type { VisionAnalysisResult } from "../../types";

export interface VisionAnalysisContext {
  category?: string;
  issueType?: string;
  filename?: string;
}

export interface VisionProvider {
  analyzeImage(
    image: File | string,
    context?: VisionAnalysisContext
  ): Promise<VisionAnalysisResult>;
}
