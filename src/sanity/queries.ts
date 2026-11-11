import { cache } from "react";
import { client } from "./client";
import type { Product } from "@/data/products";

export const getAllProductsQuery = `*[_type == "product"] | order(_createdAt desc) {
  _id,
  name,
  "slug": slug.current,
  category,
  subcategory,
  "imageRef": image,
  "image": image.asset->url,
  "lqip": image.asset->metadata.lqip,
  approxWeight,
  description,
  badge
}`;

export const getProductBySlugQuery = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  category,
  subcategory,
  "imageRef": image,
  "image": image.asset->url,
  "lqip": image.asset->metadata.lqip,
  approxWeight,
  description,
  badge
}`;

export const fetchAllProducts = cache(async (): Promise<Product[]> => {
  return (await client.fetch<Product[]>(getAllProductsQuery)) ?? [];
});

// cache() dedupes the call made by generateMetadata and the page itself
export const fetchProductBySlug = cache(async (slug: string): Promise<Product | null> => {
  return await client.fetch<Product | null>(getProductBySlugQuery, { slug });
});
