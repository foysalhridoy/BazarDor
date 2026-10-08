import { Category, Product, FALLBACK_CATEGORIES, FALLBACK_PRODUCTS } from "./data";

const BASE_URL_1 = "https://api.api-store.workers.dev/api/bazardor";
const BASE_URL_2 = "https://api.abcz.workers.dev/api/bazardor";

async function fetchWithFallback<T>(endpoint: string, fallbackData: T): Promise<T> {
  // Try Primary API
  try {
    const res = await fetch(`${BASE_URL_1}${endpoint}`, {
      next: { revalidate: 60 },
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(4000),
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data as T;
      if (data && typeof data === "object") return data as T;
    }
  } catch {
    // Continue to alternative
  }

  // Try Alternative API
  try {
    const res = await fetch(`${BASE_URL_2}${endpoint}`, {
      next: { revalidate: 60 },
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(4000),
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data as T;
      if (data && typeof data === "object") return data as T;
    }
  } catch {
    // Continue to local fallback
  }

  return fallbackData;
}

export async function getCategories(): Promise<Category[]> {
  return fetchWithFallback<Category[]>("/categories", FALLBACK_CATEGORIES);
}

export async function getProducts(category?: string): Promise<Product[]> {
  const endpoint = category ? `/products?category=${encodeURIComponent(category)}` : "/products";
  const fallback = category
    ? FALLBACK_PRODUCTS.filter((p) => p.category === category)
    : FALLBACK_PRODUCTS;

  const products = await fetchWithFallback<Product[]>(endpoint, fallback);
  if (category && products.length > 0) {
    return products.filter((p) => p.category === category);
  }
  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const allProducts = await getProducts();
  const match = allProducts.find(
    (p) => p.slug === slug || String(p.id) === slug
  );

  if (match) return match;

  // Try single endpoint if slug is numeric ID
  try {
    const single = await fetchWithFallback<Product | null>(
      `/products/${encodeURIComponent(slug)}`,
      null
    );
    if (single && (single.slug || single.nameBn)) return single;
  } catch {
    // fallback
  }

  return null;
}
