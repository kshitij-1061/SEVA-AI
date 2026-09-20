import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import { X, Check, MapPin } from "lucide-react";
import { isValidCoordinates } from "../../utils/mapUtils";
import { DEMO_MAP_CENTER } from "../../data/seedMapData";

interface LocationMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialLat?: number;
  initialLng?: number;
  onSelectLocation: (lat: number, lng: number) => void;
}

export const LocationMapModal: React.FC<LocationMapModalProps> = ({
  isOpen,
  onClose,
  initialLat,
  initialLng,
  onSelectLocation,
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  const startLat = isValidCoordinates(initialLat, initialLng) ? initialLat! : DEMO_MAP_CENTER.latitude;
  const startLng = isValidCoordinates(initialLat, initialLng) ? initialLng! : DEMO_MAP_CENTER.longitude;

  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number }>({
    lat: startLat,
    lng: startLng,
  });

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    // Small delay to ensure modal DOM container is fully mounted and sized
    const timer = setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
        return;
      }

      const map = L.map(containerRef.current!, {
        center: [startLat, startLng],
        zoom: 14,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap",
      }).addTo(map);

      const marker = L.marker([startLat, startLng], { draggable: true }).addTo(map);
      markerRef.current = marker;
      mapRef.current = map;

      // Handle map click to move marker pin
      map.on("click", (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        marker.setLatLng([lat, lng]);
        setSelectedCoords({ lat, lng });
      });

      // Handle marker drag
      marker.on("dragend", () => {
        const pos = marker.getLatLng();
        setSelectedCoords({ lat: pos.lat, lng: pos.lng });
      });
    }, 150);

    return () => {
      clearTimeout(timer);
      if (!isOpen && mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
      }
    };
  }, [isOpen, startLat, startLng]);

  const handleConfirm = () => {
    onSelectLocation(selectedCoords.lat, selectedCoords.lng);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-teal-400" />
            <h3 className="text-base font-bold">Select Report Location Pin</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Map */}
        <div className="p-4 flex-1 space-y-3 overflow-y-auto">
          <p className="text-xs text-slate-600">
            Click anywhere on the map or drag the marker pin to select the exact geographic coordinates of the civic issue.
          </p>

          <div className="w-full h-80 rounded-2xl overflow-hidden border border-slate-200 relative">
            <div ref={containerRef} className="w-full h-full z-0" />
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-800">Selected Coordinates:</span>
              <span className="font-mono text-teal-700 ml-2 font-bold">
                {selectedCoords.lat.toFixed(5)}° N, {selectedCoords.lng.toFixed(5)}° E
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-xs border border-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Use Selected Location</span>
          </button>
        </div>
      </div>
    </div>
  );
};
