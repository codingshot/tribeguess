import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'tribeguess-recent-searches';
const MAX_RECENT = 10;

export interface RecentSearch {
  name: string;
  country: string;
  topTribe?: string;
  confidence?: number;
  timestamp: number;
}

export function useRecentSearches() {
  const [searches, setSearches] = useState<RecentSearch[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setSearches(parsed.slice(0, MAX_RECENT));
        }
      }
    } catch {}
  }, []);

  const addSearch = useCallback((search: Omit<RecentSearch, 'timestamp'>) => {
    setSearches(prev => {
      const filtered = prev.filter(s => s.name.toLowerCase() !== search.name.toLowerCase());
      const updated = [{ ...search, timestamp: Date.now() }, ...filtered].slice(0, MAX_RECENT);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch {}
      return updated;
    });
  }, []);

  const clearSearches = useCallback(() => {
    setSearches([]);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }, []);

  return { searches, addSearch, clearSearches };
}
