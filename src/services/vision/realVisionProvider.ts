import type { VisionAnalysisResult } from "../../types";
import type { VisionProvider, VisionAnalysisContext } from "./types";

export class RealVisionProvider implements VisionProvider {
  async analyzeImage(
    _image: File | string,
    _context?: VisionAnalysisContext
  ): Promise<VisionAnalysisResult> {
    throw new Error(
      "Real vision provider (OpenAI / Cloud Vision API) is not currently configured. Using DemoVisionProvider for presentation."
    );
  }
}
