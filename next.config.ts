import type { NextConfig } from "next";

const ONE_YEAR = 60 * 60 * 24 * 365;
const ONE_WEEK = 60 * 60 * 24 * 7;

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.10", "192.168.1.10:3000"],
  // Remove the "X-Powered-By: Next.js" header
  poweredByHeader: false,
  images: {
    // AVIF first (smallest), WebP fallback; the optimiser picks per browser
    formats: ["image/avif", "image/webp"],
    qualities: [25, 50, 75, 80, 90, 100],
    // Optimised images are cached for a week on the server/CDN
    minimumCacheTTL: ONE_WEEK,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        // Static photos, logo and icons rarely change — let browsers and CDNs keep them.
        // stale-while-revalidate means a replaced file still updates within a day.
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: `public, max-age=${ONE_WEEK}, stale-while-revalidate=86400` }],
      },
      {
        // Videos are not used on any page; if linked later they are cached but never preloaded
        source: "/videos/:path*",
        headers: [{ key: "Cache-Control", value: `public, max-age=${ONE_YEAR}, immutable` }],
      },
    ];
  },
};

export default nextConfig;
