"use client";

import React from "react";
import Image from "next/image";

import { Product } from "@/data/products";
import { LogoSVG } from "@/components/atoms/LogoSVG";

interface PdfCatalogTemplateProps {
  category: string;
  products: Product[];
}

export const PdfCatalogTemplate = ({ category, products }: PdfCatalogTemplateProps) => {
  const isFull = category === "full";
  
  // Parse the activeCategory ID
  // It's either "full" or "{categoryId}_all_{categoryId}" or "{categoryId}_{subcategory}"
  let filteredProducts = products;
  
  if (!isFull) {
    const parts = category.split('_');
    const catId = parts[0];
    
    // Check if it's "all"
    if (category.includes('_all_')) {
      filteredProducts = products.filter(p => p.category.toLowerCase() === catId);
    } else {
      // Subcategory filter. category string looks like "antique_set" 
      // where sub is "Set". Let's reconstruct the subcategory name if possible
      // or match by lowercase
      const subNamePrefix = parts.slice(1).join('_');
      filteredProducts = products.filter(p => 
        p.category.toLowerCase() === catId && 
        p.subcategory.toLowerCase().replace(/[^a-z0-9]/g, '_') === subNamePrefix
      );
    }
  }

  // Format category name for display
  const title = isFull 
    ? "Full Collection Archive" 
    : category.replace(/_all_.*/, '').replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());

  type Section = { title: string; products: Product[] };
  let sections: Section[] = [];

  if (isFull) {
    const grouped = filteredProducts.reduce((acc, p) => {
      const cat = p.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(p);
      return acc;
    }, {} as Record<string, Product[]>);
    
    const categoryKeys = Object.keys(grouped).sort((a, b) => {
      if (a.toLowerCase() === 'female') return -1;
      if (b.toLowerCase() === 'female') return 1;
      return a.localeCompare(b);
    });

    categoryKeys.forEach(cat => {
      sections.push({
        title: cat.toUpperCase() + " COLLECTION",
        products: grouped[cat]
      });
    });
  } else {
    sections.push({
      title: title.toUpperCase(),
      products: filteredProducts
    });
  }

  let globalPageIndex = 1;

  return (
    <div id="pdf-catalog-container" className="w-[794px] min-h-[1123px] bg-[#ffffff] flex flex-col font-sans">
      
      {/* Cover Page */}
      <div className="w-[794px] h-[1123px] relative flex flex-col items-center justify-center p-12 overflow-hidden border-[12px] border-[#ffffff] outline outline-1 outline-[#e5e7eb]">
        
        {/* Clean Background */}
        <div className="absolute inset-0 z-0 bg-[#ffffff]">
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/90" />
        </div>

        {/* Elegant Frame */}
        <div className="absolute inset-8 border-2 border-[#D4AF37] z-10 pointer-events-none" />
        <div className="absolute inset-10 border border-[#D4AF37]/40 z-10 pointer-events-none" />
        
        {/* Decorative corner brackets */}
        <div className="absolute top-6 left-6 w-12 h-12 border-t-[3px] border-l-[3px] border-[#D4AF37] z-10" />
        <div className="absolute top-6 right-6 w-12 h-12 border-t-[3px] border-r-[3px] border-[#D4AF37] z-10" />
        <div className="absolute bottom-6 left-6 w-12 h-12 border-b-[3px] border-l-[3px] border-[#D4AF37] z-10" />
        <div className="absolute bottom-6 right-6 w-12 h-12 border-b-[3px] border-r-[3px] border-[#D4AF37] z-10" />
        
        {/* Top Shop Name in Golden Font */}
        <div className="absolute top-16 left-0 w-full z-20 flex flex-col items-center text-center">
          <h1 className="font-cinzel text-5xl tracking-[0.3em] text-[#D4AF37] font-bold ml-[0.3em]">
            RAJESHWARI
          </h1>
          <p className="text-xs tracking-[0.6em] uppercase text-[#B5952F] mt-2 font-bold ml-[0.6em]">
            Jewellers
          </p>
        </div>
        
        {/* Content Wrapper */}
        <div className="relative z-20 flex flex-col items-center justify-center w-full h-full pb-20">
          
          {/* Brand Logo - Enlarged since it contains the text */}
          <div className="mb-20 flex flex-col items-center justify-center text-center">
            <div className="relative w-48 h-48 rounded-full shadow-[0_10px_40px_rgb(0,0,0,0.15)] bg-white p-2">
              <div className="relative w-full h-full rounded-full overflow-hidden border-[3px] border-[#D4AF37]">
                <LogoSVG size="custom" className="w-full h-full scale-105" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-16 opacity-80">
            <div className="w-16 h-[1px] bg-[#D4AF37]" />
            <div className="w-2 h-2 rotate-45 bg-[#D4AF37]" />
            <div className="w-16 h-[1px] bg-[#D4AF37]" />
          </div>

          {/* Title */}
          <div className="bg-white/70 px-16 py-10 rounded-sm backdrop-blur-md border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.06)] text-center w-full max-w-xl">
            <h2 className="font-cinzel text-4xl text-[#1A1A1A] leading-tight tracking-[0.15em] font-bold">
              {isFull ? "THE HERITAGE COLLECTION" : title.toUpperCase()}
            </h2>
            <p className="text-[#B5952F] uppercase tracking-[0.4em] text-[11px] mt-6 font-bold">
              Exclusive Edition
            </p>
          </div>
        </div>
        
        <div className="absolute bottom-16 left-0 w-full z-20 flex flex-col items-center gap-3">
          <div className="w-12 h-[1px] bg-[#D4AF37] mb-2 opacity-60" />
          <p className="text-[11px] text-[#6b7280] tracking-[0.3em] uppercase font-bold">Wholesale Catalog</p>
          <p className="text-[9px] text-[#9ca3af] tracking-[0.4em] uppercase font-medium">Private & Confidential</p>
        </div>
      </div>

      {/* Catalog Pages - Auto Paginated by Section */}
      {sections.map((section, sectionIdx) => {
        const pagesCount = Math.ceil(section.products.length / 4);
        if (pagesCount === 0) return null;
        
        return Array.from({ length: pagesCount }).map((_, pageIndex) => {
          const pageItems = section.products.slice(pageIndex * 4, (pageIndex + 1) * 4);
          const currentPageNum = globalPageIndex++;
          
          return (
            <div key={`${sectionIdx}-${pageIndex}`} className="w-[794px] h-[1123px] bg-[#ffffff] p-16 relative shrink-0 overflow-hidden">
              
              {/* Header */}
              <div className="flex justify-between items-end border-b-2 border-[#D4AF37] pb-4 mb-12">
                <div>
                  <h3 className="font-cinzel text-3xl font-bold tracking-wider text-[#1A1A1A]">{section.title}</h3>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#D4AF37] shadow-sm">
                      <LogoSVG size="custom" className="w-full h-full scale-105" />
                    </div>
                    <div className="flex flex-col items-start">
                      <h1 className="font-cinzel text-2xl tracking-[0.2em] text-[#D4AF37] font-bold">RAJESHWARI</h1>
                      <p className="text-[9px] tracking-[0.6em] uppercase text-[#B5952F] font-bold mt-0.5">Jewellers</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-2 gap-x-12 gap-y-16">
                {pageItems.map((item, idx) => (
                  <div key={idx} className="flex flex-col">
                    <div className="w-full aspect-square relative bg-[#f9fafb] border border-[#f3f4f6] p-4 mb-4">
                      <Image 
                        src={item.image || "/images/placeholder.jpg"}
                        alt={item.name}
                        fill
                        quality={100}
                        unoptimized={true}
                        crossOrigin="anonymous"
                        className="object-contain p-6"
                      />
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-cinzel font-bold text-2xl text-[#1A1A1A]">{item.name}</h4>
                      </div>
                      <div className="text-right flex flex-col justify-end">
                        <p className="text-xs text-[#6b7280] tracking-wider mb-0.5">Approx. Wt.</p>
                        <p className="text-xl font-bold text-[#D4AF37]">{item.approxWeight ? `${Number(item.approxWeight).toFixed(3)}g` : 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="absolute bottom-12 left-16 right-16 border-t border-[#e5e7eb] pt-6 flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <p className="text-xs uppercase tracking-widest text-[#9ca3af]">Rajeshwari Jewellers Wholesale</p>
                  <p className="text-xs text-[#9ca3af]">+91 98259 53334 | rajeshwarijewellers13@gmail.com</p>
                </div>
                <div className="text-sm tracking-widest text-[#d1d5db] font-cinzel">
                  Page {currentPageNum}
                </div>
              </div>

            </div>
          );
        });
      })}

    </div>
  );
};
