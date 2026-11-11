import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { CatalogDownloader } from "@/components/organisms/CatalogDownloader";
import { fetchAllProducts } from "@/sanity/queries";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Download Gold Jewellery Catalogue (PDF)",
  description:
    "Download our wholesale gold jewellery catalogue as a print-ready PDF — the full collection or by category: antique, women's, men's and kids' jewellery.",
  path: "/catalog-download",
});

export const revalidate = 60;

export default async function CatalogDownloadPage() {
  const products = await fetchAllProducts();

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-[#F5F5F5]">
      <Navbar />
      
      {/* Client component that handles the actual PDF generation logic and UI */}
      <CatalogDownloader products={products} />

      <Footer />
    </main>
  );
}
