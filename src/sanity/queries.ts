import { cache } from "react";
import { client } from "./client";
import type { Product } from "@/data/products";

const PRODUCT_FIELDS = `
  _id,
  _updatedAt,
  name,
  "slug": slug.current,
  category,
  subcategory,
  "imageRef": image,
  "image": image.asset->url,
  "imageAlt": image.alt,
  "imageWidth": image.asset->metadata.dimensions.width,
  "imageHeight": image.asset->metadata.dimensions.height,
  "lqip": image.asset->metadata.lqip,
  approxWeight,
  description,
  badge,
  seoTitle,
  seoDescription,
  seoKeywords,
  "ogImage": ogImage.asset->url,
  noIndex
`;

export const getAllProductsQuery = `*[_type == "product" && defined(slug.current)] | order(_createdAt desc) {${PRODUCT_FIELDS}}`;

export const getProductBySlugQuery = `*[_type == "product" && slug.current == $slug][0] {${PRODUCT_FIELDS}}`;

export const fetchAllProducts = cache(async (): Promise<Product[]> => {
  return (await client.fetch<Product[]>(getAllProductsQuery)) ?? [];
});

// cache() dedupes the call made by generateMetadata and the page itself
export const fetchProductBySlug = cache(async (slug: string): Promise<Product | null> => {
  return await client.fetch<Product | null>(getProductBySlugQuery, { slug });
});
