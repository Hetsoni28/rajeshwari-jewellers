"use client";

import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  fadeUpVariant,
  staggerContainerSlow,
  subtleScaleVariant,
  dividerReveal,
  luxuryEasing,
  duration,
} from "@/lib/motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Check, Expand, Heart, Link2, Minus, Phone, Plus, ShieldCheck, Store, Truck, X, ZoomIn, ZoomOut } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { Product } from "@/data/products";
import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";
import { ProductCard } from "@/components/molecules/ProductCard";
import { buildWhatsAppLink } from "@/lib/contact";
import { isSanityCdnUrl, sanityImageLoader } from "@/sanity/loader";
import { productAlt } from "@/lib/seo";

const PLACEHOLDER = "/images/placeholder.svg";

export const ProductDetailsClient = ({ product, related = [] }: { product: Product; related?: Product[] }) => {
  const router = useRouter();
  const { addToWishlist, removeFromWishlist, isInWishlist, isHydrated } = useWishlist();
  const isSaved = isHydrated && isInWishlist(product.slug);

  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const [lightbox, setLightbox] = useState(false);
  const [copied, setCopied] = useState(false);
  const [qty, setQty] = useState(1);
  const [toast, setToast] = useState<string | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [lightboxZoom, setLightboxZoom] = useState<{ x: number; y: number } | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  };

  const closeLightbox = () => {
    setLightbox(false);
    setLightboxZoom(null);
  };

  const changeQty =(next: number) => setQty(Math.min(999, Math.max(1, Math.round(next) || 1)));

  // Mobile: show the sticky action bar once the main buttons have scrolled out of view
  useEffect(() => {
    const el = actionsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setShowStickyBar(!entry.isIntersecting && entry.boundingClientRect.top < 0));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
  }, []);

  // Responsive srcset from Sanity's CDN (uncropped, resized and WebP/AVIF there)
  const photo = product.image ?? PLACEHOLDER;
  const fromSanity = isSanityCdnUrl(photo);
  const loader = fromSanity ? sanityImageLoader : undefined;
  // Sanity asset URLs end in "-<width>x<height>.<ext>" — size the frame to the photo's real shape
  const dims = product.image?.match(/-(\d+)x(\d+)\.\w+$/);
  const photoRatio = dims ? Number(dims[1]) / Number(dims[2]) : 4 / 5;
  const weight = product.approxWeight ? `${Number(product.approxWeight).toFixed(3)} g` : null;

  const enquiryMessage = (pageUrl?: string) =>
    [
      "Hello, I'd like details on this piece from your catalogue:",
      `${product.name} (${product.subcategory}, ${product.category})`,
      weight ? `Approx. weight: ${weight}` : null,
      `Quantity: ${qty} ${qty === 1 ? "piece" : "pieces"}`,
      pageUrl ?? null,
    ]
      .filter(Boolean)
      .join("\n");

  // Same href on server and client (no hydration mismatch); the page link is added at click time
  const enquiry = buildWhatsAppLink(enquiryMessage());
  const openEnquiry = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open(buildWhatsAppLink(enquiryMessage(window.location.href)), "_blank", "noopener,noreferrer");
  };

  const handleSave = () => {
    if (isSaved) {
      removeFromWishlist(product.slug);
      showToast("Removed from your wishlist");
      return;
    }
    addToWishlist({
      id: product.slug,
      title: product.name,
      image: product.image || PLACEHOLDER,
      tag: "22K\nGOLD",
    });
    showToast("Saved to your wishlist");
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: `${product.name} — Rajeshwari Jewellers`, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Share sheet dismissed — nothing to do
    }
  };

  const handleZoomMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setZoom({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  // Lightbox: Escape closes, page doesn't scroll behind it, focus starts on the close button
  useEffect(() => {
    if (!lightbox) return;
    // Remember what opened the dialog so focus can return there on close
    const opener = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightbox(false);
        setLightboxZoom(null);
      }
      // Focus trap: the close button is the dialog's only control, so Tab stays on it
      if (e.key === "Tab") {
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      opener?.focus?.();
    };
  }, [lightbox]);

  const specs: { label: string; value: string }[] = [
    { label: "Collection", value: product.category },
    { label: "Jewellery Type", value: product.subcategory },
    { label: "Gross Weight (Approx.)", value: weight ?? "On request" },
    { label: "Purity", value: "22K" },
  ];

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-[#FAFAFA]">
      <Navbar />

      {/* Top Bar with Back Button & Breadcrumbs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: duration.base, ease: luxuryEasing, delay: 0.3 }}
        className="pt-28 sm:pt-32 md:pt-40 px-4 sm:px-6 md:px-12 container mx-auto relative z-10 mb-6 sm:mb-8 md:mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <button
          // router.back() leaves the site when the product page was opened directly (shared link)
          onClick={() => (window.history.length > 1 ? router.back() : router.push("/catalog"))}
          className="flex min-h-11 items-center gap-2 text-gray-500 hover:text-gold-deep transition-colors duration-300 w-fit group"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase">Back to Catalog</span>
        </button>

        <div className="hidden sm:block">
          <Breadcrumbs
            paths={[
              { label: "Catalog", href: "/catalog" },
              { label: product.category, href: `/catalog?category=${encodeURIComponent(product.category)}` },
              { label: product.name },
            ]}
          />
        </div>
      </motion.div>

      {/* Main Product Area */}
      <div className="px-4 sm:px-6 md:px-12 container mx-auto relative z-10 mb-16 sm:mb-20 md:mb-28">
        <motion.div
          className="flex flex-col lg:flex-row gap-8 sm:gap-10 md:gap-12 lg:gap-16"
          variants={staggerContainerSlow}
          initial="hidden"
          animate="show"
        >
          {/* Left Column — Photo */}
          <motion.div className="w-full lg:w-1/2 flex flex-col gap-3 sm:gap-4 lg:sticky lg:top-28 lg:self-start" variants={subtleScaleVariant}>
            <div
              role="button"
              tabIndex={0}
              aria-label={`Enlarge photo of ${product.name}`}
              onClick={() => setLightbox(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setLightbox(true);
                }
              }}
              onMouseMove={handleZoomMove}
              onMouseLeave={() => setZoom(null)}
              // Frame takes the photo's own aspect ratio, capped at ~80% of screen height
              style={{ aspectRatio: photoRatio, maxWidth: `min(100%, calc(80vh * ${photoRatio}))` }}
              className="group relative w-full mx-auto bg-[#F8F5F0] border border-[#EFE9DF] overflow-hidden cursor-zoom-in"
            >
              <Image
                src={photo}
                alt={productAlt(product)}
                fill
                priority
                loader={loader}
                sizes="(max-width: 1024px) 100vw, 50vw"
                // object-contain: the whole piece is always visible, never cropped
                className="object-contain transition-transform duration-300 ease-out"
                style={zoom ? { transform: "scale(1.9)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
                placeholder={product.lqip ? "blur" : "empty"}
                blurDataURL={product.lqip}
              />

              <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 bg-white/90 px-3 py-1.5 text-[9px] font-bold tracking-[0.18em] uppercase text-gray-500 shadow-sm transition-opacity group-hover:opacity-0">
                <Expand size={11} strokeWidth={2} />
                <span className="hidden sm:inline">Hover to zoom ·</span> Tap to enlarge
              </span>
            </div>

            <p className="text-[10px] sm:text-[11px] text-gray-400 tracking-wide">
              Actual piece photographed. Colour may vary slightly with screen settings.
            </p>
          </motion.div>

          {/* Right Column — Product Info */}
          <motion.div className="w-full lg:w-1/2 flex flex-col pt-0 sm:pt-2 md:pt-4" variants={staggerContainerSlow}>
            <motion.p variants={fadeUpVariant} className="text-[10px] font-bold tracking-[0.25em] text-gold-deep uppercase mb-3 sm:mb-4">
              {product.subcategory}
              <span className="mx-2 text-gold/60" aria-hidden="true">·</span>
              <span className="text-gray-400">{product.category} Collection</span>
            </motion.p>

            <motion.h1
              variants={fadeUpVariant}
              className="text-3xl sm:text-4xl lg:text-5xl font-cinzel text-[#1A1A1A] font-bold mb-4 sm:mb-5 leading-tight"
            >
              {product.name}
            </motion.h1>

            <motion.div variants={dividerReveal} className="h-px w-14 sm:w-16 bg-gold mb-6 sm:mb-8 origin-left" />

            {product.description && (
              <motion.p variants={fadeUpVariant} className="text-gray-600 leading-relaxed text-sm sm:text-[15px] font-light mb-8 max-w-xl">
                {product.description}
              </motion.p>
            )}

            {/* Specification */}
            <motion.dl variants={fadeUpVariant} className="mb-8 border-t border-[#EAE3D6]">
              {specs.map((spec) => (
                <div key={spec.label} className="flex items-baseline justify-between gap-6 py-3.5 border-b border-[#EAE3D6]">
                  <dt className="text-[9px] sm:text-[10px] font-bold tracking-[0.18em] text-gray-400 uppercase">{spec.label}</dt>
                  <dd className="font-cinzel text-sm sm:text-base text-[#1A1A1A] text-right tabular-nums">{spec.value}</dd>
                </div>
              ))}
            </motion.dl>

            {/* Trade note */}
            <motion.div variants={fadeUpVariant} className="mb-8 sm:mb-10 bg-[#F9F5EE] border-l-2 border-gold-dark/50 px-4 sm:px-5 py-4">
              <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-gold-deep mb-1.5">Pricing &amp; Availability</p>
              <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed">
                Priced on the day&apos;s gold rate with making charges itemised on the invoice. Weight is approximate —
                our trade desk confirms exact weight and stock before you order.
              </p>
            </motion.div>

            {/* Quantity — included in the WhatsApp enquiry */}
            <motion.div variants={fadeUpVariant} className="mb-4 flex items-center justify-between gap-4">
              <label htmlFor="enquiry-qty" className="text-[9px] sm:text-[10px] font-bold tracking-[0.18em] uppercase text-gray-400">
                Quantity <span className="normal-case tracking-normal font-normal text-gray-400">(pieces)</span>
              </label>
              <div className="flex items-stretch border border-gray-300 bg-white h-11">
                <button
                  type="button"
                  onClick={() => changeQty(qty - 1)}
                  disabled={qty <= 1}
                  aria-label="Decrease quantity"
                  className="w-11 flex items-center justify-center text-gray-600 hover:text-gold-deep disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus size={14} strokeWidth={1.8} />
                </button>
                <input
                  id="enquiry-qty"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={999}
                  value={qty}
                  onChange={(e) => changeQty(Number(e.target.value))}
                  className="w-14 border-x border-gray-200 text-center font-cinzel text-base text-[#1A1A1A] tabular-nums focus:outline-none focus:bg-[#F9F5EE] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <button
                  type="button"
                  onClick={() => changeQty(qty + 1)}
                  disabled={qty >= 999}
                  aria-label="Increase quantity"
                  className="w-11 flex items-center justify-center text-gray-600 hover:text-gold-deep disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus size={14} strokeWidth={1.8} />
                </button>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div ref={actionsRef} variants={fadeUpVariant} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <motion.button
                onClick={handleSave}
                aria-pressed={isSaved}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: duration.fast, ease: luxuryEasing }}
                className={`flex-1 border px-4 sm:px-6 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 flex items-center justify-center gap-2.5 min-h-13 ${
                  isSaved
                    ? "bg-gold-deep text-white border-gold-deep"
                    : "bg-white text-[#1A1A1A] border-gray-300 hover:border-gold-dark hover:text-gold-deep"
                }`}
              >
                <Heart size={15} strokeWidth={1.6} className={isSaved ? "fill-current" : ""} />
                {isSaved ? "Saved to Wishlist" : "Save to Wishlist"}
              </motion.button>

              <motion.a
                href={enquiry}
                onClick={openEnquiry}
                target="_blank"
                rel="noreferrer"
                whileTap={{ scale: 0.98 }}
                transition={{ duration: duration.fast, ease: luxuryEasing }}
                className="flex-1 bg-[#1A1A1A] text-white border border-[#1A1A1A] text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-gold-dark hover:border-gold-dark transition-colors duration-300 flex items-center justify-center gap-2.5 min-h-13 shadow-lg"
              >
                Inquire on WhatsApp
              </motion.a>
            </motion.div>

            <motion.div variants={fadeUpVariant} className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-[10px] font-bold tracking-[0.18em] uppercase text-gray-500">
              <a href="tel:+919825953334" className="inline-flex min-h-11 items-center gap-2 hover:text-gold-deep transition-colors">
                <Phone size={13} strokeWidth={1.8} /> +91 98259 53334
              </a>
              <button type="button" onClick={handleShare} className="inline-flex min-h-11 items-center gap-2 hover:text-gold-deep transition-colors">
                {copied ? <Check size={13} strokeWidth={2} /> : <Link2 size={13} strokeWidth={1.8} />}
                <span aria-live="polite">{copied ? "Link copied" : "Share this piece"}</span>
              </button>
            </motion.div>

            {/* Assurances — facts stated elsewhere on the site */}
            <motion.ul variants={fadeUpVariant} className="mt-8 grid grid-cols-3 border-y border-[#EAE3D6] divide-x divide-[#EAE3D6]">
              {[
                { icon: ShieldCheck, title: "Certified Purity", note: "22K gold" },
                { icon: Store, title: "Showroom", note: "Shahibaug, Ahmedabad" },
                { icon: Truck, title: "Trade Supply", note: "Across India" },
              ].map(({ icon: Icon, title, note }) => (
                <li key={title} className="flex flex-col items-center text-center gap-1.5 px-2 py-4">
                  <Icon size={18} strokeWidth={1.4} className="text-gold-deep" />
                  <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.15em] uppercase text-[#1A1A1A]">{title}</span>
                  <span className="text-[10px] sm:text-[11px] text-gray-400 leading-tight">{note}</span>
                </li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>
      </div>

      {/* More from the collection — only when there are other pieces */}
      {related.length > 0 && (
        <section className="px-4 sm:px-6 md:px-12 container mx-auto mb-16 sm:mb-20 md:mb-28">
          <div className="flex items-end justify-between gap-4 border-b border-gray-200 pb-4 mb-8 sm:mb-10">
            <h2 className="font-cinzel text-xl sm:text-2xl md:text-3xl text-[#1A1A1A]">More from the {product.category} Collection</h2>
            <Link
              href={`/catalog?category=${encodeURIComponent(product.category)}`}
              className="shrink-0 text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-gold-deep hover:text-brown transition-colors"
            >
              View all &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 md:gap-6 lg:gap-8">
            {related.map((p) => (
              <ProductCard key={p._id || p.slug} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${product.name} — enlarged photo`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-100 bg-[#1A1210]/95 flex items-center justify-center p-4 sm:p-10"
            onClick={closeLightbox}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={closeLightbox}
              aria-label="Close enlarged photo"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 flex h-11 w-11 items-center justify-center border border-white/30 text-white hover:bg-white hover:text-brown transition-colors"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
            <motion.div
              initial={{ scale: 0.97 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.97 }}
              className={`relative w-full h-full max-w-5xl overflow-hidden ${lightboxZoom ? "cursor-zoom-out" : "cursor-zoom-in"}`}
              onClick={(e) => {
                e.stopPropagation();
                if (lightboxZoom) {
                  setLightboxZoom(null);
                } else {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setLightboxZoom({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
                }
              }}
              onMouseMove={(e) => {
                if (!lightboxZoom) return;
                const rect = e.currentTarget.getBoundingClientRect();
                setLightboxZoom({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
              }}
            >
              <Image
                src={photo}
                alt={productAlt(product)}
                fill
                loader={loader}
                sizes="100vw"
                className="object-contain transition-transform duration-300 ease-out"
                style={lightboxZoom ? { transform: "scale(2.2)", transformOrigin: `${lightboxZoom.x}% ${lightboxZoom.y}%` } : undefined}
              />
            </motion.div>
            <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center gap-2 pointer-events-none">
              <p className="flex items-center gap-1.5 text-[9px] font-bold tracking-[0.2em] uppercase text-white/50">
                {lightboxZoom ? <ZoomOut size={12} /> : <ZoomIn size={12} />}
                {lightboxZoom ? "Tap to zoom out · Move to explore" : "Tap the photo to zoom in"}
              </p>
              <p className="font-cinzel text-sm tracking-[0.2em] text-white/70">
                {product.name}
                {weight && <span className="text-white/40"> · {weight}</span>}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile sticky actions — appear once the main buttons scroll out of view */}
      <AnimatePresence>
        {showStickyBar && !lightbox && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3, ease: luxuryEasing }}
            className="lg:hidden fixed inset-x-0 bottom-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#EAE3D6] shadow-[0_-10px_30px_-15px_rgba(62,39,35,0.3)] px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
          >
            <div className="flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <p className="font-cinzel text-sm text-[#1A1A1A] truncate">{product.name}</p>
                <p className="text-[10px] text-gray-500 tabular-nums">
                  {weight ?? "Weight on request"} · Qty {qty}
                </p>
              </div>
              <button
                type="button"
                onClick={handleSave}
                aria-pressed={isSaved}
                aria-label={isSaved ? "Remove from wishlist" : "Save to wishlist"}
                className={`h-11 w-11 shrink-0 flex items-center justify-center border transition-colors ${
                  isSaved ? "bg-gold-deep border-gold-deep text-white" : "border-gray-300 text-gray-600"
                }`}
              >
                <Heart size={16} strokeWidth={1.6} className={isSaved ? "fill-current" : ""} />
              </button>
              <a
                href={enquiry}
                onClick={openEnquiry}
                target="_blank"
                rel="noreferrer"
                className="h-11 shrink-0 px-5 flex items-center justify-center bg-[#1A1A1A] text-white text-[10px] font-bold tracking-[0.18em] uppercase"
              >
                Inquire
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-24 lg:bottom-8 z-60 flex justify-center px-4">
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.25 }}
              className="pointer-events-auto flex items-center gap-4 bg-[#1A1A1A] text-white pl-4 pr-3 py-3 shadow-xl"
            >
              <span className="flex items-center gap-2 text-xs">
                <Check size={14} className="text-gold" /> {toast}
              </span>
              {isSaved && (
                <Link href="/wishlist" className="text-[10px] font-bold tracking-[0.18em] uppercase text-gold hover:text-gold-light">
                  View Wishlist
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </main>
  );
};
