import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { CatalogDownloader } from "@/components/organisms/CatalogDownloader";
import { fetchAllProducts } from "@/sanity/queries";

export const revalidate = 60;

export default async function CatalogDownloadPage() {
  const products = await fetchAllProducts();

  return (
    <main className="min-h-screen bg-[#F5F5F5]">
      <Navbar />
      
      {/* Client component that handles the actual PDF generation logic and UI */}
      <CatalogDownloader products={products} />

      <Footer />
    </main>
  );
}
