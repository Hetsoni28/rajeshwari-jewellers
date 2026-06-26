import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { WishlistClient } from "@/components/organisms/WishlistClient";

export default function WishlistPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <WishlistClient />
      <Footer />
    </main>
  );
}
