import { fetchAllProducts } from "@/sanity/queries";
import { CatalogClient } from "@/components/organisms/CatalogClient";

// Revalidate the data every 60 seconds (optional, depends on your needs)
export const revalidate = 60;

export default async function CatalogPage() {
  const products = await fetchAllProducts();
  
  return <CatalogClient initialProducts={products} />;
}
