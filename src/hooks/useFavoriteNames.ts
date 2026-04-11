import { useState, useEffect, useCallback } from 'react';
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

  // Load from localStorage on mount with validation
  useEffect(() => {
    const loaded = safeReadStorage<FavoriteName[]>(
      STORAGE_KEY,
      (data) => validateFavorites(data) as FavoriteName[] | null,
      []
    );
    setFavorites(loaded);
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    safeWriteStorage(STORAGE_KEY, favorites);
  }, [favorites]);

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
    const isFav = favorites.some(f => f.name.toLowerCase() === name.toLowerCase());
    if (isFav) {
      removeFavorite(name);
    } else {
      addFavorite(name, metadata);
    }
    return !isFav;
  }, [favorites, addFavorite, removeFavorite]);

  const isFavorite = useCallback((name: string) => {
    return favorites.some(f => f.name.toLowerCase() === name.toLowerCase());
  }, [favorites]);

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
