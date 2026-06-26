"use client";

import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "@/components/molecules/ProductCard";
import { Product } from "@/data/products";
import { Heading } from "@/components/atoms/Heading";
import { Button } from "@/components/atoms/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PRODUCTS_PER_PAGE = 24;

// Build a smart page range: [1, ..., 4, 5, 6, ..., 20]
function getPageRange(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const range: (number | "...")[] = [];
  if (current <= 4) {
    range.push(1, 2, 3, 4, 5, "...", total);
  } else if (current >= total - 3) {
    range.push(1, "...", total - 4, total - 3, total - 2, total - 1, total);
  } else {
    range.push(1, "...", current - 1, current, current + 1, "...", total);
  }
  return range;
}

export const CatalogClient = ({ initialProducts }: { initialProducts: Product[] }) => {
  const [activeCategory, setActiveCategory]       = useState("All");
  const [activeSubcategory, setActiveSubcategory] = useState("All");
  const [currentPage, setCurrentPage]             = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen]       = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ── helpers ── */
  const getCategoryCount = (category: string) =>
    category === "All" ? initialProducts.length : initialProducts.filter(p => p.category === category).length;

  const getSubcategoryCount = (sub: string) => {
    const base = activeCategory === "All" ? initialProducts : initialProducts.filter(p => p.category === activeCategory);
    return sub === "All" ? base.length : base.filter(p => p.subcategory === sub).length;
  };

  /* ── data ── */
  const mainCategories = ["All", "Antique", "Female", "Male", "Kids"];

  const subCategories = useMemo(() => {
    if (activeCategory === "Antique") return ["All", "Set", "Jhumar", "Bangles"];
    if (activeCategory === "Female")  return ["All", "Rings", "Earrings", "Necklaces", "MS Lockets", "Pendants", "Dokiya", "Mala", "Bracelet", "Kanchain", "Bali", "Mangalsutra"];
    if (activeCategory === "Male")    return ["All", "Rings", "Pendants", "Rudrakash"];
    if (activeCategory === "Kids")    return ["All", "Rings", "Lucky", "Nazriya"];
    return ["All", "Set", "Jhumar", "Bangles", "Rings", "Earrings", "Necklaces", "MS Lockets", "Pendants", "Dokiya", "Mala", "Bracelet", "Kanchain", "Bali", "Mangalsutra", "Rudrakash", "Lucky", "Nazriya"];
  }, [activeCategory]);

  const filteredProducts = useMemo(() => {
    let f = initialProducts;
    if (activeCategory    !== "All") f = f.filter(p => p.category    === activeCategory);
    if (activeSubcategory !== "All") f = f.filter(p => p.subcategory === activeSubcategory);
    return f;
  }, [activeCategory, activeSubcategory, initialProducts]);

  const totalPages   = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const safePage     = Math.min(currentPage, totalPages);
  const startIndex   = (safePage - 1) * PRODUCTS_PER_PAGE;
  const pageProducts = filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  const pageRange    = getPageRange(safePage, totalPages);

  /* ── navigation ── */
  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top of product grid
    setTimeout(() => {
      gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, []);

  const changeCategory = (cat: string) => {
    setActiveCategory(cat);
    setActiveSubcategory("All");
    setCurrentPage(1);
  };

  const changeSubcategory = (sub: string) => {
    setActiveSubcategory(sub);
    setCurrentPage(1);
  };

  /* ── result label ── */
  const startItem = filteredProducts.length === 0 ? 0 : startIndex + 1;
  const endItem   = Math.min(startIndex + PRODUCTS_PER_PAGE, filteredProducts.length);

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Navbar />

      <div className="pt-28 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 md:px-12 container mx-auto relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16">
          <Heading level={1} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 font-bold tracking-wide leading-tight">
            The Wholesale Masterpiece <br className="hidden sm:block" /> Collection
          </Heading>
        </div>

        {/* Main Category Tabs */}
        <div className="border-b border-gray-200 mb-6 sm:mb-8">
          <div className="flex overflow-x-auto scrollbar-hide pb-0 gap-4 sm:gap-6 md:gap-12 justify-start sm:justify-center px-1">
            {mainCategories.map((cat) => (
              <Button
                variant="custom"
                key={cat}
                onClick={() => changeCategory(cat)}
                className={`text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase whitespace-nowrap transition-colors pb-3 sm:pb-4 border-b-2 min-h-[44px] flex items-end ${
                  activeCategory === cat
                    ? "text-gold-dark border-gold-dark"
                    : "text-gray-400 hover:text-gray-700 border-transparent"
                }`}
              >
                {cat} <span className="text-gray-400 font-normal ml-1">({getCategoryCount(cat)})</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Custom Subcategory Filter Dropdown */}
        <div className="flex justify-center sm:justify-start mb-6 sm:mb-8 md:mb-10 px-1 sm:px-0 relative z-50">
          <div className="relative w-full sm:w-64 max-w-[300px]" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between bg-white border border-[#B38728] text-gray-800 text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase px-4 py-3 sm:py-3.5 focus:outline-none hover:bg-gray-50 transition-colors"
            >
              <span>{activeSubcategory === "All" ? "ALL JEWELRY TYPES" : `${activeSubcategory} (${getSubcategoryCount(activeSubcategory)})`}</span>
              <svg className={`w-3 h-3 fill-current text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 right-0 mt-1 bg-white border border-[#B38728] shadow-lg max-h-60 overflow-y-auto z-[60] scrollbar-thin"
                >
                  {subCategories.map((sub) => (
                    <li
                      key={sub}
                      onClick={() => {
                        changeSubcategory(sub);
                        setIsDropdownOpen(false);
                      }}
                      className={`px-4 py-3 text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase cursor-pointer transition-colors ${
                        activeSubcategory === sub ? "bg-[#B38728] text-white" : "text-gray-700 hover:bg-[#F9F5EE]"
                      }`}
                    >
                      {sub === "All" ? "ALL JEWELRY TYPES" : `${sub} (${getSubcategoryCount(sub)})`}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Results info */}
        <div ref={gridRef} className="flex items-center justify-between mb-6 sm:mb-8 scroll-mt-32">
          <p className="text-[10px] sm:text-xs text-gray-400 tracking-[0.15em] uppercase font-medium">
            {filteredProducts.length === 0
              ? "No products found"
              : `Showing ${startItem}–${endItem} of ${filteredProducts.length} pieces`}
          </p>
          {totalPages > 1 && (
            <p className="text-[10px] sm:text-xs text-gray-400 tracking-[0.15em] uppercase font-medium">
              Page {safePage} of {totalPages}
            </p>
          )}
        </div>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          {pageProducts.length > 0 ? (
            <motion.div
              key={`${activeCategory}-${activeSubcategory}-${safePage}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 md:gap-6 lg:gap-8 mb-12 sm:mb-16 md:mb-20"
            >
              {pageProducts.map((product) => (
                <ProductCard key={product._id || product.slug} product={product} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 text-gray-400 font-light tracking-widest uppercase text-sm"
            >
              No products found in this category.
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center gap-6 mt-4">

            {/* Page buttons */}
            <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">

              {/* Prev */}
              <button
                onClick={() => goToPage(safePage - 1)}
                disabled={safePage === 1}
                className={`flex items-center gap-1 px-3 sm:px-4 py-2.5 text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase border transition-all duration-300 min-h-[44px] min-w-[44px] ${
                  safePage === 1
                    ? "border-gray-200 text-gray-300 cursor-not-allowed"
                    : "border-gray-300 text-gray-600 hover:border-gold hover:text-gold bg-white"
                }`}
                aria-label="Previous page"
              >
                <ChevronLeft size={14} />
                <span className="hidden sm:inline">Prev</span>
              </button>

              {/* Page numbers */}
              {pageRange.map((page, idx) =>
                page === "..." ? (
                  <span
                    key={`ellipsis-${idx}`}
                    className="flex items-center justify-center w-10 h-11 text-gray-400 text-xs select-none"
                  >
                    &hellip;
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => goToPage(page as number)}
                    className={`flex items-center justify-center w-10 h-11 text-[11px] sm:text-xs font-bold tracking-[0.1em] border transition-all duration-300 min-h-[44px] min-w-[40px] ${
                      page === safePage
                        ? "bg-gold border-gold text-brown shadow-[0_4px_14px_rgba(212,175,55,0.35)]"
                        : "border-gray-200 text-gray-500 hover:border-gold hover:text-gold bg-white"
                    }`}
                    aria-label={`Page ${page}`}
                    aria-current={page === safePage ? "page" : undefined}
                  >
                    {page}
                  </button>
                )
              )}

              {/* Next */}
              <button
                onClick={() => goToPage(safePage + 1)}
                disabled={safePage === totalPages}
                className={`flex items-center gap-1 px-3 sm:px-4 py-2.5 text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase border transition-all duration-300 min-h-[44px] min-w-[44px] ${
                  safePage === totalPages
                    ? "border-gray-200 text-gray-300 cursor-not-allowed"
                    : "border-gray-300 text-gray-600 hover:border-gold hover:text-gold bg-white"
                }`}
                aria-label="Next page"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Jump to page — shown when > 10 pages */}
            {totalPages > 10 && (
              <div className="flex items-center gap-3 text-[10px] sm:text-xs text-gray-500 tracking-[0.15em] uppercase">
                <span>Go to page</span>
                <input
                  type="number"
                  min={1}
                  max={totalPages}
                  defaultValue={safePage}
                  key={safePage}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const val = parseInt((e.target as HTMLInputElement).value);
                      if (!isNaN(val) && val >= 1 && val <= totalPages) goToPage(val);
                    }
                  }}
                  className="w-16 border border-gray-300 text-center py-2 text-xs font-bold text-gray-700 focus:outline-none focus:border-gold transition-colors"
                />
                <span className="text-gray-400">of {totalPages}</span>
              </div>
            )}

          </div>
        )}

      </div>

      <Footer />
    </main>
  );
};
