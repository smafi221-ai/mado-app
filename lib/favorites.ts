const STORAGE_KEY = 'mado_favorites';

export function getFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(id: string): string[] {
  const favorites = getFavorites();
  const next = favorites.includes(id)
    ? favorites.filter((f) => f !== id)
    : [...favorites, id];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}
