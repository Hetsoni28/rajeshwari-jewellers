import { client } from "./client";

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

export async function fetchAllProducts() {
  return await client.fetch(getAllProductsQuery);
}

export async function fetchProductBySlug(slug: string) {
  return await client.fetch(getProductBySlugQuery, { slug });
}
