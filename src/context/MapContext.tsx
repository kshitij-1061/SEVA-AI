import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import type { MapItem, MapReportItem, MapFilters, MapLocation } from "../services/map/types";
import { mapService } from "../services/map/mapService";
import { filterMapItems, clusterReports } from "../utils/mapFilters";
import { DEMO_MAP_CENTER } from "../data/seedMapData";
import { useReports } from "./ReportContext";
import { useAuth } from "./AuthContext";
import { isValidCoordinates } from "../utils/mapUtils";

interface MapContextType {
  mapItems: MapItem[];
  filteredItems: MapItem[];
  selectedItem: MapItem | null;
  filters: MapFilters;
  searchQuery: string;
  mapCenter: MapLocation;
  userLocation: MapLocation | null;
  viewMode: "map" | "list";
  loading: boolean;
  error: string | null;
  isLocating: boolean;
  setFilters: React.Dispatch<React.SetStateAction<MapFilters>>;
  setSearchQuery: (q: string) => void;
  setViewMode: (v: "map" | "list") => void;
  selectItem: (item: MapItem | null) => void;
  requestUserLocation: () => Promise<MapLocation | null>;
  resetMap: () => void;
  setMapCenter: (loc: MapLocation) => void;
}

const defaultFilters: MapFilters = {
  itemType: "all",
  category: "All",
  priority: "All",
  status: "All",
  ownership: "all",
};

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { reports: liveReports } = useReports();
  const { user } = useAuth();

  const [seedItems, setSeedItems] = useState<MapItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MapItem | null>(null);
  const [filters, setFilters] = useState<MapFilters>(defaultFilters);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mapCenter, setMapCenter] = useState<MapLocation>(DEMO_MAP_CENTER);
  const [userLocation, setUserLocation] = useState<MapLocation | null>(null);
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);

  const loadInitialMapData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await mapService.getMapItems();
      setSeedItems(items);
    } catch (err) {
      console.error("Failed to load map data:", err);
      setError("Unable to load civic map data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInitialMapData();
  }, [loadInitialMapData]);

  // Combine seed items with live report items from ReportContext
  const allMapItems = useMemo(() => {
    const liveMapReportItems: MapReportItem[] = liveReports
      .filter((r) => r.location && isValidCoordinates(r.location.latitude, r.location.longitude))
      .map((r) => ({
        id: `map-live-${r.id}`,
        type: "report",
        reportId: r.id,
        title: r.title,
        category: r.category,
        issueType: r.issueType,
        priority: r.priority,
        status: r.status,
        location: {
          latitude: r.location.latitude!,
          longitude: r.location.longitude!,
          address: r.location.address,
          city: r.location.city,
        },
        createdAt: r.createdAt,
        department: r.department,
        imageUrl: r.images?.[0]?.previewUrl,
        userId: r.userId,
        isDemo: false,
      }));

    // Deduplicate reports by reportId
    const seedReportItems = seedItems.filter((item) => {
      if (item.type === "report") {
        return !liveMapReportItems.some((lr) => lr.reportId === item.reportId);
      }
      return true;
    });

    const combinedReports = [
      ...liveMapReportItems,
      ...seedReportItems.filter((i): i is MapReportItem => i.type === "report"),
    ];

    const services = seedItems.filter((i) => i.type === "service");
    const hotspots = clusterReports(combinedReports);

    return [...combinedReports, ...services, ...hotspots];
  }, [seedItems, liveReports]);

  // Filter items using current filters and search query
  const filteredItems = useMemo(() => {
    return filterMapItems(allMapItems, filters, searchQuery, user?.id);
  }, [allMapItems, filters, searchQuery, user?.id]);

  const selectItem = (item: MapItem | null) => {
    setSelectedItem(item);
    if (item && isValidCoordinates(item.type === "hotspot" ? item.center.latitude : item.location.latitude, item.type === "hotspot" ? item.center.longitude : item.location.longitude)) {
      const lat = item.type === "hotspot" ? item.center.latitude : item.location.latitude;
      const lng = item.type === "hotspot" ? item.center.longitude : item.location.longitude;
      setMapCenter({ latitude: lat, longitude: lng });
    }
  };

  const requestUserLocation = async (): Promise<MapLocation | null> => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return null;
    }

    setIsLocating(true);
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc: MapLocation = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            address: "Your Current Browser Location",
            city: "Current Location",
          };
          setUserLocation(loc);
          setMapCenter(loc);
          setIsLocating(false);
          resolve(loc);
        },
        (err) => {
          console.warn("Geolocation permission denied or failed:", err.message);
          setIsLocating(false);
          alert("Location unavailable. You can search for or manually select a location on the map.");
          resolve(null);
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    });
  };

  const resetMap = () => {
    setFilters(defaultFilters);
    setSearchQuery("");
    setSelectedItem(null);
    setMapCenter(DEMO_MAP_CENTER);
  };

  return (
    <MapContext.Provider
      value={{
        mapItems: allMapItems,
        filteredItems,
        selectedItem,
        filters,
        searchQuery,
        mapCenter,
        userLocation,
        viewMode,
        loading,
        error,
        isLocating,
        setFilters,
        setSearchQuery,
        setViewMode,
        selectItem,
        requestUserLocation,
        resetMap,
        setMapCenter,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a MapProvider");
  }
  return context;
};
