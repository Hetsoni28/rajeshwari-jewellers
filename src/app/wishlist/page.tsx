import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { WishlistClient } from "@/components/organisms/WishlistClient";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Your Wishlist",
  description: "Your saved gold jewellery pieces from Rajeshwari Jewellers. Share the list with our trade desk to check wholesale availability and rates.",
  path: "/wishlist",
  noIndex: true,
});

export default function WishlistPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-white">
      <Navbar />
      <WishlistClient />
      <Footer />
    </main>
  );
}
