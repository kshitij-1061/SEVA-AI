const SAVED_SERVICES_KEY = "sevafix_saved_services";
const SEARCH_HISTORY_KEY = "sevafix_service_search_history";
const MAX_SEARCH_HISTORY = 10;

export const serviceStorage = {
  getSavedServiceIds(): string[] {
    try {
      const data = localStorage.getItem(SAVED_SERVICES_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveServiceId(id: string): string[] {
    try {
      const current = serviceStorage.getSavedServiceIds();
      if (!current.includes(id)) {
        const updated = [...current, id];
        localStorage.setItem(SAVED_SERVICES_KEY, JSON.stringify(updated));
        return updated;
      }
      return current;
    } catch {
      return serviceStorage.getSavedServiceIds();
    }
  },

  unsaveServiceId(id: string): string[] {
    try {
      const current = serviceStorage.getSavedServiceIds();
      const updated = current.filter((item) => item !== id);
      localStorage.setItem(SAVED_SERVICES_KEY, JSON.stringify(updated));
      return updated;
    } catch {
      return serviceStorage.getSavedServiceIds();
    }
  },

  isServiceSaved(id: string): boolean {
    return serviceStorage.getSavedServiceIds().includes(id);
  },

  getSearchHistory(): string[] {
    try {
      const data = localStorage.getItem(SEARCH_HISTORY_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  addSearchQuery(query: string): string[] {
    const trimmed = query.trim();
    if (!trimmed) return serviceStorage.getSearchHistory();

    try {
      const current = serviceStorage.getSearchHistory();
      const filtered = current.filter((q) => q.toLowerCase() !== trimmed.toLowerCase());
      const updated = [trimmed, ...filtered].slice(0, MAX_SEARCH_HISTORY);
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
      return updated;
    } catch {
      return serviceStorage.getSearchHistory();
    }
  },

  clearSearchHistory(): void {
    try {
      localStorage.removeItem(SEARCH_HISTORY_KEY);
    } catch {
      // ignore storage errors
    }
  },
};
