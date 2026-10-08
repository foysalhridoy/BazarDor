import { Category, Product, FALLBACK_CATEGORIES, FALLBACK_PRODUCTS } from "./data";

const BASE_URL_1 = "https://api.api-store.workers.dev/api/bazardor";
const BASE_URL_2 = "https://api.abcz.workers.dev/api/bazardor";

// In-Memory Stale-While-Revalidate Cache for 0ms navigation
let cachedCategories: Category[] = FALLBACK_CATEGORIES;
let cachedProducts: Product[] = FALLBACK_PRODUCTS;
let lastCategoriesFetch = 0;
let lastProductsFetch = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

// Quick asynchronous background sync
async function syncRemoteData() {
  const now = Date.now();

  // Sync categories in background if stale
  if (now - lastCategoriesFetch > CACHE_TTL_MS) {
    lastCategoriesFetch = now;
    fetchWithFallback<Category[]>("/categories", cachedCategories)
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) cachedCategories = data;
      })
      .catch(() => {});
  }

  // Sync products in background if stale
  if (now - lastProductsFetch > CACHE_TTL_MS) {
    lastProductsFetch = now;
    fetchWithFallback<Product[]>("/products", cachedProducts)
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) cachedProducts = data;
      })
      .catch(() => {});
  }
}

async function fetchWithFallback<T>(endpoint: string, fallbackData: T): Promise<T> {
  // Fast 1200ms timeout so user is never blocked
  try {
    const res = await fetch(`${BASE_URL_1}${endpoint}`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(1200),
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data as T;
      if (data && typeof data === "object") return data as T;
    }
  } catch {
    // Try alternative API quickly
    try {
      const res = await fetch(`${BASE_URL_2}${endpoint}`, {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(1200),
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data as T;
        if (data && typeof data === "object") return data as T;
      }
    } catch {
      // Return fallback
    }
  }

  return fallbackData;
}

export async function getCategories(): Promise<Category[]> {
  // Trigger background refresh without blocking
  syncRemoteData();
  return cachedCategories;
}

export async function getProducts(category?: string): Promise<Product[]> {
  // Trigger background refresh without blocking
  syncRemoteData();

  if (category) {
    const filtered = cachedProducts.filter((p) => p.category === category);
    if (filtered.length > 0) return filtered;
  }
  return cachedProducts;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  syncRemoteData();

  const match = cachedProducts.find(
    (p) => p.slug === slug || String(p.id) === slug
  );

  if (match) return match;

  // Quick fallback check
  const fallbackMatch = FALLBACK_PRODUCTS.find(
    (p) => p.slug === slug || String(p.id) === slug
  );
  return fallbackMatch || null;
}
