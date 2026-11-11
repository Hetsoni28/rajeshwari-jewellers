export type Product = {
  _id: string;
  name: string;
  slug: string;
  category: string;
  subcategory: string;
  // Raw Sanity image object (preferred — enables URL builder optimisation)
  imageRef?: {
    asset: { _ref: string };
    hotspot?: { x: number; y: number; height: number; width: number };
    crop?: { top: number; bottom: number; left: number; right: number };
  };
  // Direct CDN URL (fallback when imageRef not available)
  image?: string;
  // Alt text entered in Sanity for the product photo
  imageAlt?: string;
  // Original photo dimensions (for structured data / social previews)
  imageWidth?: number;
  imageHeight?: number;
  // LQIP base64 blur placeholder
  lqip?: string;
  approxWeight?: number;
  description?: string;
  badge?: string;
  // SEO fields (all optional — sensible defaults are generated when empty)
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
  _updatedAt?: string;
};

// Empty array — all products are fetched from Sanity
export const catalogProducts: Product[] = [];
