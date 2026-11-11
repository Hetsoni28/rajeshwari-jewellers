import type { Metadata } from "next";

// The CMS editor must never appear in search results
export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
