import type { ImageLoaderProps } from "next/image";

/**
 * next/image loader for Sanity CDN URLs.
 * Lets next/image build a responsive srcset while Sanity does the resizing and format choice
 * (WebP/AVIF via auto=format) — no round-trip through Next's own image optimiser.
 * fit=max never crops and never upscales beyond the original photo.
 */
export const sanityImageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 80));
  url.searchParams.set("fit", "max");
  url.searchParams.set("auto", "format");
  return url.toString();
};

export const isSanityCdnUrl = (src?: string) => !!src && src.startsWith("https://cdn.sanity.io/");
