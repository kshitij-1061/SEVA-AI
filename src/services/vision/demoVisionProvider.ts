import type { VisionAnalysisResult, VisionObservation, VisionSeverity } from "../../types";
import type { VisionProvider, VisionAnalysisContext } from "./types";

export class DemoVisionProvider implements VisionProvider {
  async analyzeImage(
    image: File | string,
    context?: VisionAnalysisContext
  ): Promise<VisionAnalysisResult> {
    // Simulate vision AI processing latency
    await new Promise((res) => setTimeout(res, 500));

    const imageId = typeof image === "string" ? "img-preview" : image.name;
    const filename = typeof image === "string" ? (context?.filename || "photo.jpg") : image.name;
    const lowerName = filename.toLowerCase();

    const cat = context?.category?.toLowerCase() || "";
    const type = context?.issueType?.toLowerCase() || "";

    let detectedCategory = "Road Infrastructure";
    let detectedIssue = "Pothole";
    let severity: VisionSeverity = "high";
    let confidence = 0.89;

    let observations: VisionObservation[] = [];
    let suggestedDescription = "";

    if (lowerName.includes("garbage") || lowerName.includes("trash") || cat.includes("waste") || type.includes("garbage")) {
      detectedCategory = "Waste Management";
      detectedIssue = "Garbage Dump";
      severity = "medium";
      confidence = 0.91;
      observations = [
        { id: "obs-1", type: "object", text: "Accumulation of plastic waste, cardboard boxes, and uncollected rubbish." },
        { id: "obs-2", type: "hazard", text: "Sanitation risk due to uncollected waste overflow near pedestrian path." },
        { id: "obs-3", type: "environment", text: "Located on public sidewalk adjacent to commercial/residential area." },
      ];
      suggestedDescription = "Visual evidence indicates uncollected garbage accumulation overflowing onto public walkway, creating sanitation concern.";
    } else if (lowerName.includes("light") || lowerName.includes("lamp") || cat.includes("lighting") || type.includes("light")) {
      detectedCategory = "Street Lighting";
      detectedIssue = "Broken Streetlight";
      severity = "medium";
      confidence = 0.87;
      observations = [
        { id: "obs-1", type: "damage", text: "Damaged luminaire housing / unlit streetlight pole." },
        { id: "obs-2", type: "hazard", text: "Poor illumination creating night safety and visibility hazard for pedestrians." },
        { id: "obs-3", type: "environment", text: "Residential street pole fixture." },
      ];
      suggestedDescription = "Image indicates damaged streetlight fixture resulting in inadequate nighttime street lighting.";
    } else if (lowerName.includes("water") || lowerName.includes("pipe") || cat.includes("water") || type.includes("water")) {
      detectedCategory = "Water Supply";
      detectedIssue = "Water Leakage";
      severity = "high";
      confidence = 0.93;
      observations = [
        { id: "obs-1", type: "damage", text: "Active water accumulation originating from damaged supply pipe." },
        { id: "obs-2", type: "hazard", text: "Water wastage and local road surface saturation/slippiness." },
        { id: "obs-3", type: "environment", text: "Sub-surface pipeline breakdown." },
      ];
      suggestedDescription = "Visual evidence indicates active water supply leakage from damaged pipeline causing road saturation.";
    } else {
      // Default Pothole / Road Damage scenario
      detectedCategory = "Road Infrastructure";
      detectedIssue = "Pothole";
      severity = "high";
      confidence = 0.89;
      observations = [
        { id: "obs-1", type: "damage", text: "Visible asphalt surface cracking and road depression." },
        { id: "obs-2", type: "hazard", text: "Large road cavity posing skidding hazard for two-wheelers and vehicles." },
        { id: "obs-3", type: "environment", text: "Paved urban roadway surface." },
      ];
      suggestedDescription = "The image appears to show significant road surface damage consistent with a large pothole, posing potential hazard to passing vehicles.";
    }

    return {
      id: `vis-${Date.now()}`,
      imageId,
      status: "completed",
      detectedCategory,
      detectedIssue,
      severity,
      confidence,
      observations,
      suggestedDescription,
      analyzedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      provider: "demo",
      disclaimer: "Demo Vision Analysis — This prototype currently uses a simulated/local vision provider. Results are illustrative and should be reviewed before submission.",
    };
  }
}
