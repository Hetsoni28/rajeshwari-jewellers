import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @ts-ignore - Supress typing error for newer Next.js config field
  allowedDevOrigins: ['192.168.1.10', '192.168.1.10:3000'],
  images: {
    qualities: [25, 50, 75, 90, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
