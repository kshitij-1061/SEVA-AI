import React, { useState } from "react";
import { MapPin, Building, Map, LocateFixed, Loader2 } from "lucide-react";
import { LocationMapModal } from "./map/LocationMapModal";

interface LocationPickerProps {
  address: string;
  city: string;
  latitude?: number;
  longitude?: number;
  onAddressChange: (val: string) => void;
  onCityChange: (val: string) => void;
  onCoordinatesChange?: (lat: number, lng: number) => void;
}

export const LocationPicker: React.FC<LocationPickerProps> = ({
  address,
  city,
  latitude,
  longitude,
  onAddressChange,
  onCityChange,
  onCoordinatesChange,
}) => {
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [currentLat, setCurrentLat] = useState<number | undefined>(latitude || 28.9845);
  const [currentLng, setCurrentLng] = useState<number | undefined>(longitude || 77.7064);

  const handleSelectFromMap = (lat: number, lng: number) => {
    setCurrentLat(lat);
    setCurrentLng(lng);
    if (onCoordinatesChange) {
      onCoordinatesChange(lat, lng);
    }
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setCurrentLat(lat);
        setCurrentLng(lng);
        if (onCoordinatesChange) {
          onCoordinatesChange(lat, lng);
        }
        setIsLocating(false);
      },
      (err) => {
        console.warn("Geolocation failed:", err.message);
        setIsLocating(false);
        alert("Location permission denied or unavailable. Please select manually on the map.");
      }
    );
  };

  return (
    <div className="space-y-4 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200">
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
        <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-teal-600" /> Location Details
        </label>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleUseMyLocation}
            disabled={isLocating}
            className="px-2.5 py-1 bg-white hover:bg-slate-100 text-teal-700 font-bold rounded-lg text-[11px] border border-slate-200 transition-colors flex items-center gap-1"
          >
            {isLocating ? <Loader2 className="w-3 h-3 animate-spin" /> : <LocateFixed className="w-3 h-3 text-teal-600" />}
            <span>Use My Location</span>
          </button>
          <button
            type="button"
            onClick={() => setMapModalOpen(true)}
            className="px-2.5 py-1 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg text-[11px] transition-colors flex items-center gap-1 shadow-2xs"
          >
            <Map className="w-3 h-3" />
            <span>Select on Map</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Street Address / Nearby Landmark *
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              required
              placeholder="e.g. Near Meerut College Main Gate, University Road"
              value={address}
              onChange={(e) => onAddressChange(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 outline-hidden bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            City / Municipality *
          </label>
          <div className="relative">
            <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              required
              placeholder="Meerut"
              value={city}
              onChange={(e) => onCityChange(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 outline-hidden bg-white"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-3 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-slate-600">
          <div className="p-1.5 bg-teal-50 rounded-lg text-teal-700 shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <span className="font-semibold text-slate-800">Geographic Coordinates:</span>
            <span className="font-mono text-slate-600 ml-1">
              {currentLat && currentLng ? `${currentLat.toFixed(4)}° N, ${currentLng.toFixed(4)}° E` : "28.9845° N, 77.7064° E"}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMapModalOpen(true)}
          className="text-[10px] text-teal-700 hover:underline font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-200"
        >
          Change Pin Location
        </button>
      </div>

      {/* Interactive Location Map Picker Modal */}
      <LocationMapModal
        isOpen={mapModalOpen}
        onClose={() => setMapModalOpen(false)}
        initialLat={currentLat}
        initialLng={currentLng}
        onSelectLocation={handleSelectFromMap}
      />
    </div>
  );
};
