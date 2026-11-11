import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchProductBySlug } from "@/sanity/queries";
import { ProductDetailsClient } from "./ProductDetailsClient";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  if (!product) return { title: "Product not found | Rajeshwari Jewellers" };
  return {
    title: `${product.name} | Rajeshwari Jewellers`,
    description: product.description || `${product.name} — ${product.subcategory} from the ${product.category} collection.`,
  };
}

export default async function ProductDetailsPage({ params }: Props) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  // Return a proper 404 instead of a 200 "not found" page
  if (!product) notFound();

  return <ProductDetailsClient product={product} />;
}
