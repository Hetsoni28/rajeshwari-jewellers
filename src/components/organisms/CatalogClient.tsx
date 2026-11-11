"use client";

import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "@/components/molecules/ProductCard";
import { Product } from "@/data/products";
import { Heading } from "@/components/atoms/Heading";
import { Check, ChevronDown, ChevronLeft, ChevronRight, Download, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { buildWhatsAppLink } from "@/lib/contact";

const PRODUCTS_PER_PAGE = 24;

const MAIN_CATEGORIES = ["All", "Antique", "Female", "Male", "Kids"];
const ALL_SUBCATEGORIES = ["Set", "Jhumar", "Bangles", "Rings", "Earrings", "Necklaces", "MS Lockets", "Pendants", "Dokiya", "Mala", "Bracelet", "Kanchain", "Bali", "Mangalsutra", "Rudrakash", "Lucky", "Nazriya"];

const SUBCATEGORIES_BY_CATEGORY: Record<string, string[]> = {
  Antique: ["Set", "Jhumar", "Bangles"],
  Female: ["Rings", "Earrings", "Necklaces", "MS Lockets", "Pendants", "Dokiya", "Mala", "Bracelet", "Kanchain", "Bali", "Mangalsutra"],
  Male: ["Rings", "Pendants", "Rudrakash"],
  Kids: ["Rings", "Lucky", "Nazriya"],
};

const matchIgnoreCase = (list: string[], value: string | null) =>
  value ? list.find((item) => item.toLowerCase() === value.trim().toLowerCase()) : undefined;

// Resolve ?category= / ?sub= from links across the site (e.g. "female", "Earrings")
function resolveInitialFilters(category: string | null, sub: string | null) {
  const mainMatch = matchIgnoreCase(MAIN_CATEGORIES, category);
  // ?category= may also name a jewellery type, e.g. /catalog?category=Earrings
  const subMatch = matchIgnoreCase(ALL_SUBCATEGORIES, sub) ?? (mainMatch ? undefined : matchIgnoreCase(ALL_SUBCATEGORIES, category));
  return { category: mainMatch ?? "All", subcategory: subMatch ?? "All" };
}

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

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

/** Small faceted-stone divider used under the page title. */
const Divider = () => (
  <div className="flex items-center justify-center gap-3" aria-hidden="true">
    <span className="h-px w-12 sm:w-16 bg-linear-to-r from-transparent to-gold/70" />
    <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 text-gold">
      <path d="M6 0 12 6 6 12 0 6Z" fill="currentColor" />
    </svg>
    <span className="h-px w-12 sm:w-16 bg-linear-to-l from-transparent to-gold/70" />
  </div>
);

export const CatalogClient = ({ initialProducts }: { initialProducts: Product[] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [currentPage, setCurrentPage]             = useState(1);
  const searchParams = useSearchParams();
  const initialFilters = resolveInitialFilters(searchParams.get("category"), searchParams.get("sub"));
  const [activeCategory, setActiveCategory]       = useState(initialFilters.category);
  const [activeSubcategory, setActiveSubcategory] = useState(initialFilters.subcategory);

  // Re-sync filters when navigating between catalog links (same component instance)
  const paramsKey = searchParams.toString();
  const [lastParamsKey, setLastParamsKey] = useState(paramsKey);
  if (paramsKey !== lastParamsKey) {
    setLastParamsKey(paramsKey);
    setActiveCategory(initialFilters.category);
    setActiveSubcategory(initialFilters.subcategory);
    setCurrentPage(1);
  }
  const gridRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen]       = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownListRef = useRef<HTMLUListElement>(null);

  /** Arrow keys / Home / End move between the enabled options (WAI-ARIA menu pattern). */
  const handleListKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    const options = Array.from(dropdownListRef.current?.querySelectorAll<HTMLButtonElement>("button:not([disabled])") ?? []);
    if (!options.length) return;
    const index = options.indexOf(document.activeElement as HTMLButtonElement);
    let next: number | null = null;
    if (event.key === "ArrowDown") next = index < options.length - 1 ? index + 1 : 0;
    if (event.key === "ArrowUp") next = index > 0 ? index - 1 : options.length - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = options.length - 1;
    if (event.key === "Tab") setIsDropdownOpen(false);
    if (next !== null) {
      event.preventDefault();
      options[next].focus();
    }
  };

  // Close the type menu on outside click or Escape
  useEffect(() => {
    if (!isDropdownOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
        dropdownButtonRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    // Focus the currently selected option when the menu opens
    const frame = requestAnimationFrame(() => {
      const list = dropdownListRef.current;
      (list?.querySelector<HTMLButtonElement>('[aria-checked="true"]') ?? list?.querySelector<HTMLButtonElement>("button:not([disabled])"))?.focus();
    });
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isDropdownOpen]);

  /* ── counts ── */
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: initialProducts.length };
    for (const p of initialProducts) counts[p.category] = (counts[p.category] ?? 0) + 1;
    return counts;
  }, [initialProducts]);

  const subcategoryCounts = useMemo(() => {
    const base = activeCategory === "All" ? initialProducts : initialProducts.filter((p) => p.category === activeCategory);
    const counts: Record<string, number> = { All: base.length };
    for (const p of base) counts[p.subcategory] = (counts[p.subcategory] ?? 0) + 1;
    return counts;
  }, [activeCategory, initialProducts]);

  /* ── data ── */
  const subCategories = useMemo(
    () => ["All", ...(SUBCATEGORIES_BY_CATEGORY[activeCategory] ?? ALL_SUBCATEGORIES)],
    [activeCategory]
  );

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
  // Keep filters in the URL so a filtered view can be shared and the back button works
  const syncUrl = useCallback(
    (category: string, sub: string) => {
      const params = new URLSearchParams();
      if (category !== "All") params.set("category", category);
      if (sub !== "All") params.set("sub", sub);
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, router]
  );

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
    syncUrl(cat, "All");
  };

  const changeSubcategory = (sub: string) => {
    setActiveSubcategory(sub);
    setCurrentPage(1);
    syncUrl(activeCategory, sub);
  };

  const clearFilters = () => changeCategory("All");

  /* ── labels ── */
  const startItem = filteredProducts.length === 0 ? 0 : startIndex + 1;
  const endItem   = Math.min(startIndex + PRODUCTS_PER_PAGE, filteredProducts.length);
  const hasFilters = activeCategory !== "All" || activeSubcategory !== "All";
  const selectionLabel = [activeCategory !== "All" ? activeCategory : null, activeSubcategory !== "All" ? activeSubcategory : null]
    .filter(Boolean)
    .join(" · ");

  const enquiryLink = buildWhatsAppLink(
    hasFilters
      ? `Hello, I'm looking for ${selectionLabel} designs from your wholesale catalogue. Could you share what is currently available?`
      : "Hello, I would like to see your current wholesale designs."
  );

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-[#FAFAFA]">
      <Navbar />

      <div className="pt-28 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 md:px-12 container mx-auto relative z-10">

        {/* ── Header ── */}
        <header className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-14">
          <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.32em] uppercase text-gold-deep mb-4 sm:mb-5">
            Wholesale Catalogue
          </p>
          <Heading level={1} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-5 sm:mb-6 font-bold tracking-wide leading-tight">
            The Wholesale Masterpiece <br className="hidden sm:block" /> Collection
          </Heading>
          <Divider />
          <p className="mt-5 sm:mt-6 text-sm text-gray-500 font-light leading-relaxed">
            {plural(initialProducts.length, "design", "designs")} in the catalogue
            <span className="mx-2 text-gold" aria-hidden="true">·</span>
            weights shown are approximate
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-7 gap-y-0 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase">
            <Link href="/catalog-download" className="group inline-flex min-h-11 items-center gap-2 text-brown hover:text-gold-deep transition-colors">
              <Download size={13} strokeWidth={1.8} className="transition-transform group-hover:translate-y-0.5" />
              <span className="border-b border-current/30 pb-0.5">PDF Catalogue</span>
            </Link>
            <a href={enquiryLink} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 text-brown hover:text-gold-deep transition-colors">
              <span className="border-b border-current/30 pb-0.5">Ask for Current Stock</span>
            </a>
          </div>
        </header>

        {/* ── Main Category Tabs ── */}
        <nav aria-label="Collections" className="border-b border-gray-200 mb-6 sm:mb-8">
          <div className="flex overflow-x-auto scrollbar-hide gap-6 sm:gap-8 md:gap-12 justify-start sm:justify-center px-1">
            {MAIN_CATEGORIES.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => changeCategory(cat)}
                  aria-pressed={active}
                  className={`relative shrink-0 min-h-12 flex items-end gap-1.5 pb-3 sm:pb-4 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase whitespace-nowrap transition-colors duration-300 ${
                    active ? "text-gold-deep" : "text-gray-400 hover:text-gray-700"
                  }`}
                >
                  {cat === "All" ? "All Designs" : cat}
                  <span className={`text-[9px] sm:text-[10px] font-semibold tracking-normal tabular-nums ${active ? "text-gold-deep/70" : "text-gray-300"}`}>
                    {categoryCounts[cat] ?? 0}
                  </span>
                  {active && (
                    <motion.span
                      layoutId="catalog-tab-underline"
                      className="absolute left-0 right-0 -bottom-px h-0.5 bg-gold-dark"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* ── Toolbar: type filter + result count ── */}
        <div
          ref={gridRef}
          className="relative z-40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 scroll-mt-32"
        >
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full sm:w-72" ref={dropdownRef}>
              <span id="type-filter-label" className="sr-only">Jewellery type</span>
              <button
                ref={dropdownButtonRef}
                type="button"
                onClick={() => setIsDropdownOpen((open) => !open)}
                aria-haspopup="menu"
                aria-expanded={isDropdownOpen}
                aria-controls="type-filter-menu"
                onKeyDown={(e) => {
                  if ((e.key === "ArrowDown" || e.key === "ArrowUp") && !isDropdownOpen) {
                    e.preventDefault();
                    setIsDropdownOpen(true);
                  }
                }}
                aria-labelledby="type-filter-label type-filter-value"
                className={`w-full flex items-center justify-between gap-3 bg-white border px-4 h-12 text-left transition-colors ${
                  isDropdownOpen ? "border-gold-dark" : "border-[#B38728]/60 hover:border-[#B38728]"
                }`}
              >
                <span className="flex flex-col leading-tight">
                  <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.25em] uppercase text-gray-400">Jewellery Type</span>
                  <span id="type-filter-value" className="text-[11px] sm:text-xs font-bold tracking-[0.12em] uppercase text-gray-800">
                    {activeSubcategory === "All" ? "All Types" : activeSubcategory}
                  </span>
                </span>
                <ChevronDown size={16} strokeWidth={1.6} className={`text-gray-500 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.ul
                    id="type-filter-menu"
                    ref={dropdownListRef}
                    role="menu"
                    aria-label="Jewellery type"
                    onKeyDown={handleListKeyDown}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 right-0 mt-1.5 bg-white border border-[#B38728]/60 shadow-[0_18px_40px_-18px_rgba(62,39,35,0.35)] max-h-72 overflow-y-auto z-60 py-1.5"
                  >
                    {subCategories.map((sub) => {
                      const count = subcategoryCounts[sub] ?? 0;
                      const selected = activeSubcategory === sub;
                      const empty = count === 0 && sub !== "All" && !selected;
                      return (
                        <li key={sub} role="none">
                          <button
                            type="button"
                            role="menuitemradio"
                            aria-checked={selected}
                            disabled={empty}
                            onClick={() => {
                              changeSubcategory(sub);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left text-[11px] sm:text-xs font-semibold tracking-[0.12em] uppercase transition-colors ${
                              selected
                                ? "bg-[#F9F5EE] text-gold-deep"
                                : empty
                                  ? "text-gray-300 cursor-not-allowed"
                                  : "text-gray-700 hover:bg-[#F9F5EE]"
                            }`}
                          >
                            <span className="flex items-center gap-2.5">
                              <span className="w-3.5 shrink-0">{selected && <Check size={14} strokeWidth={2} />}</span>
                              {sub === "All" ? "All Types" : sub}
                            </span>
                            <span className="text-[10px] font-medium tracking-normal tabular-nums text-gray-400">{count}</span>
                          </button>
                        </li>
                      );
                    })}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* Active filters */}
            {hasFilters && (
              <div className="flex flex-wrap items-center gap-2">
                {activeCategory !== "All" && (
                  <button
                    type="button"
                    onClick={() => changeCategory("All")}
                    className="inline-flex items-center gap-1.5 h-8 pl-3 pr-2 bg-white border border-gray-200 text-[10px] font-bold tracking-[0.15em] uppercase text-gray-600 hover:border-gold-dark hover:text-gold-deep transition-colors"
                    aria-label={`Remove filter: ${activeCategory}`}
                  >
                    {activeCategory} <X size={12} />
                  </button>
                )}
                {activeSubcategory !== "All" && (
                  <button
                    type="button"
                    onClick={() => changeSubcategory("All")}
                    className="inline-flex items-center gap-1.5 h-8 pl-3 pr-2 bg-white border border-gray-200 text-[10px] font-bold tracking-[0.15em] uppercase text-gray-600 hover:border-gold-dark hover:text-gold-deep transition-colors"
                    aria-label={`Remove filter: ${activeSubcategory}`}
                  >
                    {activeSubcategory} <X size={12} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={clearFilters}
                  className="h-8 px-1 text-[10px] font-bold tracking-[0.15em] uppercase text-gray-400 underline-offset-4 hover:text-gold-deep hover:underline"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          <p className="text-[10px] sm:text-xs text-gray-400 tracking-[0.15em] uppercase font-medium tabular-nums" aria-live="polite">
            {filteredProducts.length === 0
              ? "0 pieces"
              : totalPages > 1
                ? `${startItem}–${endItem} of ${filteredProducts.length} pieces · Page ${safePage} of ${totalPages}`
                : plural(filteredProducts.length, "piece", "pieces")}
          </p>
        </div>

        {/* ── Product Grid ── */}
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
              {pageProducts.map((product, i) => (
                <ProductCard key={product._id || product.slug} product={product} priority={safePage === 1 && i < 4} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mx-auto max-w-2xl bg-white border border-[#EFE9DF] px-6 py-14 sm:px-14 sm:py-16 text-center mb-12 sm:mb-16"
            >
              <svg viewBox="0 0 48 48" className="mx-auto mb-6 h-10 w-10 text-gold" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                <path d="M24 6 38 18 24 42 10 18Z" />
                <path d="M10 18h28M18 18l6-12 6 12M18 18l6 24 6-24" opacity="0.6" />
              </svg>
              <h2 className="font-cinzel text-xl sm:text-2xl text-[#1A1A1A] mb-3">
                {hasFilters ? `No ${selectionLabel} designs listed yet` : "The catalogue is being updated"}
              </h2>
              <p className="text-sm text-gray-500 font-light leading-relaxed max-w-md mx-auto mb-8">
                Not every design in our showroom is online. Message our trade desk and we&apos;ll share what is
                currently in stock{hasFilters ? ` for ${selectionLabel}` : ""}.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={enquiryLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center h-12 px-8 bg-gold text-brown text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-gold-light transition-colors shadow-[0_6px_18px_-8px_rgba(212,175,55,0.8)]"
                >
                  Ask on WhatsApp
                </a>
                {hasFilters && initialProducts.length > 0 && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex items-center justify-center h-12 px-8 border border-gray-300 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-700 hover:border-gold-dark hover:text-gold-deep transition-colors"
                  >
                    View All {plural(initialProducts.length, "Design", "Designs")}
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <nav aria-label="Pagination" className="flex flex-col items-center gap-6 mt-4">

            {/* Page buttons */}
            <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">

              {/* Prev */}
              <button
                onClick={() => goToPage(safePage - 1)}
                disabled={safePage === 1}
                className={`flex items-center gap-1 px-3 sm:px-4 py-2.5 text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase border transition-all duration-300 min-h-11 min-w-11 ${
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
                    className={`flex items-center justify-center w-10 h-11 text-[11px] sm:text-xs font-bold tracking-widest border transition-all duration-300 min-h-11 min-w-10 tabular-nums ${
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
                className={`flex items-center gap-1 px-3 sm:px-4 py-2.5 text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase border transition-all duration-300 min-h-11 min-w-11 ${
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
              <label className="flex items-center gap-3 text-[10px] sm:text-xs text-gray-500 tracking-[0.15em] uppercase">
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
              </label>
            )}

          </nav>
        )}

      </div>

      <Footer />
    </main>
  );
};
