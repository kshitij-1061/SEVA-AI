export function isValidCoordinates(lat?: number, lng?: number): boolean {
  if (lat === undefined || lng === undefined) return false;
  if (isNaN(lat) || isNaN(lng)) return false;
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}

export function formatCoordinates(lat?: number, lng?: number): string {
  if (!isValidCoordinates(lat, lng)) return "Coordinates unavailable";
  return `${lat!.toFixed(4)}° N, ${lng!.toFixed(4)}° E`;
}

// Marker color definitions for report status and item types
export const MARKER_COLORS = {
  submitted: "#f59e0b", // Amber
  acknowledged: "#3b82f6", // Blue
  in_progress: "#0d9488", // Teal
  resolved: "#10b981", // Emerald
  rejected: "#ef4444", // Red
  service: "#8b5cf6", // Purple
  hotspot: "#ec4899", // Pink
  userLocation: "#0284c7", // Sky Blue
};

export function createCustomMarkerSvg(color: string, iconType: "report" | "service" | "hotspot" | "user"): string {
  if (iconType === "user") {
    return `<div style="position:relative;width:24px;height:24px;">
      <div style="position:absolute;inset:0;background-color:${color};opacity:0.3;border-radius:50%;animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;"></div>
      <div style="position:relative;width:24px;height:24px;background-color:${color};border:3px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>
    </div>`;
  }

  if (iconType === "hotspot") {
    return `<div style="width:32px;height:32px;background-color:${color}33;border:2px solid ${color};border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.2);">
      <div style="width:14px;height:14px;background-color:${color};border-radius:50%;"></div>
    </div>`;
  }

  return `<svg width="28" height="36" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.37 0 0 5.37 0 12C0 21 12 32 12 32C12 32 24 21 24 12C24 5.37 18.63 0 12 0Z" fill="${color}" stroke="#FFFFFF" stroke-width="2"/>
    <circle cx="12" cy="12" r="5" fill="#FFFFFF"/>
  </svg>`;
}
