import type { MetadataRoute } from "next";
import { fetchAllProducts } from "@/sanity/queries";
import { absoluteUrl } from "@/lib/seo";

// Rebuild the sitemap at most once an hour so new Sanity products appear automatically
export const revalidate = 3600;

/** /sitemap.xml — every public page plus each published product (with its image for Google Images). */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/catalog"), lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: absoluteUrl("/collections"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/catalog-download"), lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  let productPages: MetadataRoute.Sitemap = [];
  try {
    const products = await fetchAllProducts();
    productPages = products
      .filter((p) => p.slug && !p.noIndex)
      .map((p) => ({
        url: absoluteUrl(`/catalog/${p.slug}`),
        lastModified: p._updatedAt ? new Date(p._updatedAt) : now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
        images: p.image ? [p.image] : undefined,
      }));
  } catch {
    // Sanity unreachable — still serve the static pages
  }

  return [...staticPages, ...productPages];
}
