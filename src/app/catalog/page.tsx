import { Suspense } from "react";
import { fetchAllProducts } from "@/sanity/queries";
import { CatalogClient } from "@/components/organisms/CatalogClient";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Wholesale Gold Jewellery Catalogue",
  description:
    "Browse our wholesale 22K gold jewellery catalogue — necklaces, earrings, rings, bangles, mangalsutra and more, with approximate weights. Enquire on WhatsApp.",
  path: "/catalog",
});

// Revalidate the data every 60 seconds (optional, depends on your needs)
export const revalidate = 60;

export default async function CatalogPage() {
  const products = await fetchAllProducts();

  // CatalogClient reads ?category= from the URL, which requires a Suspense boundary
  return (
    <Suspense>
      <CatalogClient initialProducts={products} />
    </Suspense>
  );
}
