import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { PublicService, ServiceMatch } from "../services/serviceFinder/types";
import { serviceService } from "../services/serviceFinder/serviceService";
import { serviceStorage } from "../utils/serviceStorage";
import { useAuth } from "./AuthContext";

interface ServiceContextType {
  services: PublicService[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: string;
  matches: ServiceMatch[];
  savedServiceIds: string[];
  searchHistory: string[];
  viewMode: "all" | "saved";
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setViewMode: (mode: "all" | "saved") => void;
  performSearch: (query: string, category?: string) => Promise<void>;
  getServiceById: (id: string) => Promise<PublicService | null>;
  toggleSaveService: (id: string) => void;
  isServiceSaved: (id: string) => boolean;
  clearSearchHistory: () => void;
  clearSearch: () => void;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const ServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [services, setServices] = useState<PublicService[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [matches, setMatches] = useState<ServiceMatch[]>([]);
  const [savedServiceIds, setSavedServiceIds] = useState<string[]>(serviceStorage.getSavedServiceIds());
  const [searchHistory, setSearchHistory] = useState<string[]>(serviceStorage.getSearchHistory());
  const [viewMode, setViewMode] = useState<"all" | "saved">("all");

  const loadInitialServices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await serviceService.getServices();
      setServices(data);
    } catch (err) {
      setError("Failed to load service directory. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInitialServices();
  }, [loadInitialServices]);

  const performSearch = async (query: string, category?: string) => {
    setLoading(true);
    setError(null);
    const catToUse = category !== undefined ? category : selectedCategory;
    setSearchQuery(query);
    if (category !== undefined) setSelectedCategory(category);

    try {
      if (query.trim()) {
        const history = serviceStorage.addSearchQuery(query);
        setSearchHistory(history);
        const matchResults = await serviceService.matchServices(query, user?.city);
        setMatches(matchResults);

        let filtered = matchResults.map((m) => m.service);
        if (catToUse && catToUse !== "All") {
          filtered = filtered.filter((s) => s.category.toLowerCase() === catToUse.toLowerCase());
        }
        setServices(filtered);
      } else {
        setMatches([]);
        let allData = await serviceService.getServices();
        if (catToUse && catToUse !== "All") {
          allData = allData.filter((s) => s.category.toLowerCase() === catToUse.toLowerCase());
        }
        setServices(allData);
      }
    } catch (err) {
      setError("Failed to search services. Please check your query.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getServiceById = async (id: string): Promise<PublicService | null> => {
    const existing = services.find((s) => s.id === id);
    if (existing) return existing;
    return serviceService.getServiceById(id);
  };

  const toggleSaveService = (id: string) => {
    if (serviceStorage.isServiceSaved(id)) {
      const updated = serviceStorage.unsaveServiceId(id);
      setSavedServiceIds(updated);
    } else {
      const updated = serviceStorage.saveServiceId(id);
      setSavedServiceIds(updated);
    }
  };

  const isServiceSaved = (id: string): boolean => {
    return savedServiceIds.includes(id);
  };

  const clearSearchHistory = () => {
    serviceStorage.clearSearchHistory();
    setSearchHistory([]);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setMatches([]);
    performSearch("", selectedCategory);
  };

  return (
    <ServiceContext.Provider
      value={{
        services,
        loading,
        error,
        searchQuery,
        selectedCategory,
        matches,
        savedServiceIds,
        searchHistory,
        viewMode,
        setSearchQuery,
        setSelectedCategory,
        setViewMode,
        performSearch,
        getServiceById,
        toggleSaveService,
        isServiceSaved,
        clearSearchHistory,
        clearSearch,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export const useServices = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error("useServices must be used within a ServiceProvider");
  }
  return context;
};
