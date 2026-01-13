import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'tribeguess-favorite-names';

export interface FavoriteName {
  name: string;
  addedAt: number;
  region?: string;
  tribe?: string;
  languageFamily?: string;
}

export function useFavoriteNames() {
  const [favorites, setFavorites] = useState<FavoriteName[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
    }
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Failed to save favorites:', error);
    }
  }, [favorites]);

  const addFavorite = useCallback((name: string, metadata?: Partial<Omit<FavoriteName, 'name' | 'addedAt'>>) => {
    setFavorites(prev => {
      if (prev.some(f => f.name.toLowerCase() === name.toLowerCase())) {
        return prev;
      }
      return [...prev, { name, addedAt: Date.now(), ...metadata }];
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
