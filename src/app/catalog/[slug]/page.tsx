import { fetchProductBySlug } from "@/sanity/queries";
import { ProductDetailsClient } from "./ProductDetailsClient";

export const revalidate = 60;

export default async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = await fetchProductBySlug(resolvedParams.slug);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <h1 className="text-2xl font-cinzel text-gray-500">Product not found</h1>
      </main>
    );
  }

  return <ProductDetailsClient product={product} />;
}
