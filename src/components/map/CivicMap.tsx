import React, { useEffect, useRef } from "react";
import L from "leaflet";
import { useMap } from "../../context/MapContext";
import { isValidCoordinates, MARKER_COLORS, createCustomMarkerSvg } from "../../utils/mapUtils";

export const CivicMap: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);

  const { filteredItems, mapCenter, userLocation, selectItem, selectedItem } = useMap();

  // Initialize Leaflet Map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const initialLat = isValidCoordinates(mapCenter.latitude, mapCenter.longitude)
      ? mapCenter.latitude
      : 28.9845;
    const initialLng = isValidCoordinates(mapCenter.latitude, mapCenter.longitude)
      ? mapCenter.longitude
      : 77.7064;

    const map = L.map(containerRef.current, {
      center: [initialLat, initialLng],
      zoom: 13,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    markersRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = null;
    };
  }, []);

  // Recenter when mapCenter updates
  useEffect(() => {
    if (mapRef.current && isValidCoordinates(mapCenter.latitude, mapCenter.longitude)) {
      mapRef.current.setView([mapCenter.latitude, mapCenter.longitude], mapRef.current.getZoom() || 13, {
        animate: true,
      });
    }
  }, [mapCenter]);

  // Update Markers when filteredItems, selectedItem, or userLocation change
  useEffect(() => {
    if (!mapRef.current || !markersRef.current) return;

    markersRef.current.clearLayers();

    // User Location Marker
    if (userLocation && isValidCoordinates(userLocation.latitude, userLocation.longitude)) {
      const userIcon = L.divIcon({
        html: createCustomMarkerSvg(MARKER_COLORS.userLocation, "user"),
        className: "custom-user-marker",
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const userMarker = L.marker([userLocation.latitude, userLocation.longitude], {
        icon: userIcon,
        title: "Your Location",
      });
      userMarker.bindPopup(`<strong>Your Current Location</strong>`);
      markersRef.current.addLayer(userMarker);
    }

    // Render Filtered Map Items
    filteredItems.forEach((item) => {
      const lat = item.type === "hotspot" ? item.center.latitude : item.location.latitude;
      const lng = item.type === "hotspot" ? item.center.longitude : item.location.longitude;

      if (!isValidCoordinates(lat, lng)) return;

      let color = MARKER_COLORS.submitted;
      let iconType: "report" | "service" | "hotspot" = "report";

      if (item.type === "report") {
        color = MARKER_COLORS[item.status] || MARKER_COLORS.submitted;
        iconType = "report";
      } else if (item.type === "service") {
        color = MARKER_COLORS.service;
        iconType = "service";
      } else if (item.type === "hotspot") {
        color = MARKER_COLORS.hotspot;
        iconType = "hotspot";
      }

      const isSelected = selectedItem && selectedItem.id === item.id;

      const customIcon = L.divIcon({
        html: createCustomMarkerSvg(color, iconType),
        className: isSelected ? "custom-map-marker selected-marker" : "custom-map-marker",
        iconSize: iconType === "hotspot" ? [32, 32] : [28, 36],
        iconAnchor: iconType === "hotspot" ? [16, 16] : [14, 36],
      });

      const marker = L.marker([lat, lng], {
        icon: customIcon,
        title: item.type === "report" ? item.title : item.type === "service" ? item.name : item.title,
      });

      marker.on("click", () => {
        selectItem(item);
      });

      markersRef.current?.addLayer(marker);
    });
  }, [filteredItems, selectedItem, userLocation, selectItem]);

  return (
    <div className="w-full h-full relative rounded-3xl overflow-hidden border border-slate-200 shadow-inner min-h-[450px]">
      <div ref={containerRef} className="w-full h-full min-h-[450px] z-0" />
    </div>
  );
};
