"use client";

import React, { createContext, useCallback, useContext, useMemo, useSyncExternalStore, ReactNode } from "react";

export type WishlistItem = {
  id: string;
  title: string;
  image: string;
  tag: string;
};

type WishlistContextType = {
  items: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  isHydrated: boolean;
};

const STORAGE_KEY = "rajeshwari_wishlist";
const EMPTY: WishlistItem[] = [];

/* ── Tiny localStorage-backed store (safe when storage is unavailable) ── */
let cache: WishlistItem[] | null = null;
const listeners = new Set<() => void>();

function readItems(): WishlistItem[] {
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    cache = Array.isArray(parsed) ? (parsed as WishlistItem[]) : [];
  } catch (e) {
    console.error("Failed to read wishlist from local storage", e);
    cache = [];
  }
  return cache;
}

function writeItems(items: WishlistItem[]) {
  cache = items;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error("Failed to save wishlist to local storage", e);
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Keep multiple open tabs in sync
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      cache = null;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const noopSubscribe = () => () => {};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  // Server render (and hydration) uses the empty list, then switches to stored items
  const items = useSyncExternalStore(subscribe, readItems, () => EMPTY);
  const isHydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);

  const addToWishlist = useCallback((item: WishlistItem) => {
    const current = readItems();
    if (current.some((i) => i.id === item.id)) return;
    writeItems([...current, item]);
  }, []);

  const removeFromWishlist = useCallback((id: string) => {
    writeItems(readItems().filter((i) => i.id !== id));
  }, []);

  const isInWishlist = useCallback((id: string) => items.some((i) => i.id === id), [items]);

  const value = useMemo(
    () => ({ items, addToWishlist, removeFromWishlist, isInWishlist, isHydrated }),
    [items, addToWishlist, removeFromWishlist, isInWishlist, isHydrated]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
