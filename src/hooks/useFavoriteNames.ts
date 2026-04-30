import { useState, useEffect, useCallback, useRef } from 'react';
import { safeReadStorage, safeWriteStorage, validateFavorites, sanitizeTextInput } from '@/lib/dataValidation';

const STORAGE_KEY = 'tribeguess-favorite-names';
const MAX_FAVORITES = 500;

export interface FavoriteName {
  name: string;
  addedAt: number;
  region?: string;
  tribe?: string;
  languageFamily?: string;
}

export function useFavoriteNames() {
  const [favorites, setFavorites] = useState<FavoriteName[]>([]);
  const favoritesRef = useRef(favorites);
  favoritesRef.current = favorites;
  const [hasLoaded, setHasLoaded] = useState(false);

  // Load from localStorage on mount with validation
  useEffect(() => {
    const loaded = safeReadStorage<FavoriteName[]>(
      STORAGE_KEY,
      (data) => validateFavorites(data) as FavoriteName[] | null,
      []
    );
    setFavorites(loaded);
    setHasLoaded(true);
  }, []);

  // Save to localStorage only after initial load (prevents overwriting with empty array)
  useEffect(() => {
    if (hasLoaded) {
      safeWriteStorage(STORAGE_KEY, favorites);
    }
  }, [favorites, hasLoaded]);

  const addFavorite = useCallback((name: string, metadata?: Partial<Omit<FavoriteName, 'name' | 'addedAt'>>) => {
    const sanitized = sanitizeTextInput(name, 100);
    if (!sanitized) return;
    
    setFavorites(prev => {
      if (prev.length >= MAX_FAVORITES) return prev; // Cap
      if (prev.some(f => f.name.toLowerCase() === sanitized.toLowerCase())) {
        return prev;
      }
      return [...prev, { name: sanitized, addedAt: Date.now(), ...metadata }];
    });
  }, []);

  const removeFavorite = useCallback((name: string) => {
    setFavorites(prev => prev.filter(f => f.name.toLowerCase() !== name.toLowerCase()));
  }, []);

  const toggleFavorite = useCallback((name: string, metadata?: Partial<Omit<FavoriteName, 'name' | 'addedAt'>>) => {
    const sanitized = sanitizeTextInput(name, 100);
    if (!sanitized) return false;
    const isFav = favoritesRef.current.some((f) => f.name.toLowerCase() === sanitized.toLowerCase());
    if (isFav) {
      removeFavorite(sanitized);
      return false;
    }
    addFavorite(sanitized, metadata);
    return true;
  }, [addFavorite, removeFavorite]);

  const isFavorite = useCallback((name: string) => {
    const s = sanitizeTextInput(name, 100);
    if (!s) return false;
    return favoritesRef.current.some((f) => f.name.toLowerCase() === s.toLowerCase());
  }, []);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    count: favorites.length
  };
}
