"use client";

import { useState } from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import { generateCatalogPdf } from "@/lib/pdfGenerator";
import { PdfCatalogTemplate } from "@/components/templates/PdfCatalogTemplate";
import { Product } from "@/data/products";
import { Spinner } from "@/components/atoms/Spinner";
import { Heading } from "@/components/atoms/Heading";
import { Button } from "@/components/atoms/Button";

export const CatalogDownloader = ({ products }: { products: Product[] }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const getCount = (categoryId: string, subName: string) => {
    if (subName.startsWith("All")) return products.filter(p => p.category.toLowerCase() === categoryId).length;
    return products.filter(p => p.category.toLowerCase() === categoryId && p.subcategory === subName).length;
  };

  const handleDownload = async (category: string, title: string) => {
    setIsGenerating(true);
    setLoadingText(`Generating ${title} PDF...`);
    setActiveCategory(category);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await generateCatalogPdf(category, title);
    } catch (error) {
      console.error("Failed to generate PDF", error);
    } finally {
      setIsGenerating(false);
      setActiveCategory(null);
    }
  };

  const categories = [
    { id: "female", title: "Female", image: "/images/catalog_earrings.png", subs: ["All Female", "Rings", "Earrings", "Necklaces", "MS Lockets", "Pendants", "Dokiya", "Mala", "Bracelet", "Kanchain", "Bali", "Mangalsutra"] },
    { id: "antique", title: "Antique", image: "/images/bridal_necklace_sets.png", subs: ["All Antique", "Set", "Jhumar", "Bangles"] },
    { id: "male", title: "Male", image: "/images/catalog_ring.png", subs: ["All Male", "Rings", "Pendants", "Rudrakash"] },
    { id: "kids", title: "Kids", image: "/images/kids_main_pendant.png", subs: ["All Kids", "Rings", "Lucky", "Nazriya"] },
  ];

  return (
    <div className="relative pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 overflow-hidden">

      {/* Hidden PDF Templates */}
      <div className="absolute top-[-9999px] left-[-9999px] opacity-0 pointer-events-none">
        {activeCategory && <PdfCatalogTemplate category={activeCategory} products={products} />}
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 mb-16 sm:mb-20 md:mb-24 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <Heading level={1} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide mb-4 sm:mb-6">
            Luxury at Your Fingertips
          </Heading>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed tracking-wide font-light mb-8 sm:mb-10 max-w-xl">
            Immerse yourself in the Rajeshwari Heritage. Download our high-resolution, print-ready catalog showcasing our complete collection of handcrafted masterpieces.
          </p>

          <Button
            variant="custom"
            onClick={() => handleDownload("full", "Full_Catalog")}
            disabled={isGenerating}
            className="group relative flex items-center justify-center gap-3 bg-[#B5952F] hover:bg-[#D4AF37] text-white px-6 sm:px-8 py-4 font-bold tracking-[0.1em] uppercase transition-all shadow-lg hover:shadow-xl w-full sm:w-auto overflow-hidden disabled:opacity-80 min-h-[52px]"
          >
            {isGenerating && activeCategory === "full" ? (
              <>
                <Spinner size={20} className="text-white" />
                <span className="text-xs">Generating Full Catalog...</span>
              </>
            ) : (
              <>
                <Download size={20} className="transition-transform group-hover:-translate-y-1 flex-shrink-0" />
                <span className="text-xs">Download Full Catalog PDF</span>
              </>
            )}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
          </Button>
        </div>
      </div>

      {/* Curated Selections */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 mb-16 sm:mb-24 md:mb-32 max-w-6xl">
        <div className="text-center mb-10 sm:mb-16">
          <Heading level={2} className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide mb-3 sm:mb-4">
            Curated Selections
          </Heading>
          <p className="text-gray-500 text-sm font-light">Download specific categories tailored to your interest.</p>
        </div>

          <div className="flex flex-col gap-10 sm:gap-14">
            {categories.map((cat) => (
              <div key={cat.id} className="bg-white shadow-[0_2px_15px_-4px_rgba(0,0,0,0.04)] border border-gray-100/60">
                {/* Header */}
                <div className="px-6 sm:px-8 py-5 border-b border-gray-50/80 bg-white">
                  <Heading level={3} className="text-[#B38728] text-lg sm:text-xl font-bold tracking-[0.15em] uppercase">
                    {cat.title}
                  </Heading>
                </div>
                
                {/* Grid of Download Buttons */}
                <div className="p-6 sm:p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                    {cat.subs.map((sub) => {
                      const downloadId = `${cat.id}_${sub.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
                      const isThisGenerating = isGenerating && activeCategory === downloadId;
                      return (
                        <Button
                          variant="custom"
                          key={sub}
                          onClick={() => handleDownload(downloadId, `${cat.title}_${sub.replace(/\s+/g, '_')}`)}
                          disabled={isGenerating}
                          className="group flex items-center justify-between px-5 py-3.5 border border-gray-100 hover:border-[#D4AF37] hover:shadow-[0_4px_12px_rgba(212,175,55,0.12)] bg-white transition-all text-left disabled:opacity-50 min-h-[52px]"
                        >
                          <span className="text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A] group-hover:text-[#B38728] transition-colors mt-0.5">
                            {sub} <span className="text-gray-400 font-medium ml-1.5">({getCount(cat.id, sub)})</span>
                          </span>
                          {isThisGenerating ? (
                            <Spinner size={15} className="text-[#B5952F] flex-shrink-0" />
                          ) : (
                            <Download size={15} className="text-gray-300 group-hover:text-[#B38728] flex-shrink-0 transition-colors" />
                          )}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
};
