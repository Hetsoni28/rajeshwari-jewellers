import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "./env";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
});

/**
 * Build an optimised Sanity image URL.
 * - auto=format  → serves WebP/AVIF automatically
 * - fit=max      → never upscales; shows full image without cropping
 * - quality=80   → good balance of sharpness and file size
 * - w/h          → resize to exact display dimensions so browser gets the right resolution
 */
export const urlForImage = (source: any, width = 600, height = 600) => {
  if (!source) return null;
  return imageBuilder
    .image(source)
    .auto("format")
    .fit("max")       // NEVER crops — shows full image
    .quality(80)
    .width(width)
    .height(height);
};

/**
 * Tiny thumbnail URL for blur placeholder (32px wide)
 */
export const urlForThumb = (source: any) => {
  if (!source) return null;
  return imageBuilder
    .image(source)
    .auto("format")
    .fit("max")
    .quality(10)
    .width(32)
    .url();
};
