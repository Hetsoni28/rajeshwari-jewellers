import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/** /robots.txt — let search engines crawl the site, keep private/utility routes out. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Sanity Studio, the per-visitor wishlist and Next internals have no search value
        disallow: ["/studio", "/wishlist", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
