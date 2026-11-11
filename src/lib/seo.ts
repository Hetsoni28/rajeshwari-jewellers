import type { Metadata } from "next";

/**
 * Central SEO configuration: site URL, business details (NAP), and text helpers.
 * Every page's metadata, the sitemap, robots.txt and JSON-LD read from here so they never disagree.
 */

/**
 * Canonical site origin used for canonical tags, the sitemap, robots.txt, Open Graph and JSON-LD.
 * Override with NEXT_PUBLIC_SITE_URL only if the site moves to another domain.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://rajeshwarijewellers.com").replace(/\/+$/, "");

export const SITE_NAME = "Rajeshwari Jewellers";

/** Default description — 155 characters, within the ~160 limit search engines display. */
export const DEFAULT_DESCRIPTION =
  "Wholesale and retail 22K gold ornaments in Ahmedabad — antique, bridal, women's, men's and kids' jewellery. Visit our Shahibaug showroom or enquire online.";

export const DEFAULT_OG_IMAGE = {
  url: "/images/hero_bridal_16x9.jpg",
  width: 1376,
  height: 768,
  alt: "22K gold antique bridal necklace set with matching earrings by Rajeshwari Jewellers",
};

/** Business details (Name, Address, Phone) exactly as shown on the site — keep in sync with Footer/Contact. */
export const BUSINESS = {
  name: SITE_NAME,
  phones: ["+91-98259-53334", "+91-99255-11134", "+91-83206-47040"],
  whatsapp: "+919825953334",
  address: {
    streetAddress: "E-13, Spectrum Tower, Opp. Police Stadium, Shahibaug",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    postalCode: "380004",
    addressCountry: "IN",
  },
  // Mon–Sat 10:30–19:30, Sunday closed (as listed on the Contact page)
  openingHours: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "10:30", closes: "19:30" },
} as const;

export const CATEGORIES = ["Antique", "Female", "Male", "Kids"] as const;

/** Absolute URL for a site path. */
export const absoluteUrl = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/** Collapse whitespace and cut at a word boundary so text fits search/social limits (default 160). */
export function clampText(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.–—-]+$/, "")}…`;
}

/** Turn any text into a clean URL slug: "MS Lockets" → "ms-lockets". */
export const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);

/** Human label for the catalog's category values. */
export const categoryLabel = (category: string) =>
  ({ Female: "Women's", Male: "Men's", Kids: "Kids'", Antique: "Antique" } as Record<string, string>)[category] ?? category;

/** Descriptive, keyword-natural alt text for a product photo (≤125 chars, the practical alt limit). */
export function productAlt(p: { name: string; subcategory?: string; category?: string; approxWeight?: number; imageAlt?: string }) {
  if (p.imageAlt?.trim()) return clampText(p.imageAlt, 125);
  const type = p.subcategory && p.subcategory.toLowerCase() !== p.name.toLowerCase() ? ` ${p.subcategory.toLowerCase()}` : "";
  const weight = p.approxWeight ? `, approx. ${Number(p.approxWeight).toFixed(2)} g` : "";
  const cat = p.category ? ` from the ${categoryLabel(p.category).toLowerCase()} collection` : "";
  return clampText(`${p.name} — 22K gold${type}${cat}${weight}, Rajeshwari Jewellers Ahmedabad`, 125);
}

/** Meta description for a product (≤160 chars), preferring the Sanity SEO field. */
export function productDescription(p: {
  name: string;
  subcategory?: string;
  category?: string;
  approxWeight?: number;
  description?: string;
  seoDescription?: string;
}) {
  if (p.seoDescription?.trim()) return clampText(p.seoDescription);
  const sameAsType = !p.subcategory || p.subcategory.toLowerCase() === p.name.toLowerCase();
  const collection = p.category ? ` from our ${categoryLabel(p.category).toLowerCase()} collection` : "";
  const weight = p.approxWeight ? `, approx. ${Number(p.approxWeight).toFixed(2)} g` : "";
  const what = sameAsType ? `${p.name} in 22K gold${collection}` : `${p.name}, a 22K gold ${p.subcategory!.toLowerCase()}${collection}`;
  const own = p.description?.trim() ? ` ${p.description.trim().replace(/\.?$/, ".")}` : "";
  const core = `${what}${weight}.${own}`;
  // Add the longest closing line that still fits, rather than cutting the product's own words mid-sentence
  const tails = [
    " Wholesale & retail at Rajeshwari Jewellers, Shahibaug, Ahmedabad — enquire on WhatsApp.",
    " Wholesale & retail at Rajeshwari Jewellers, Shahibaug, Ahmedabad.",
    " Wholesale & retail at Rajeshwari Jewellers, Ahmedabad.",
    " Rajeshwari Jewellers, Ahmedabad.",
  ];
  const tail = tails.find((t) => core.length + t.length <= 160) ?? "";
  return clampText(core + tail);
}

type PageSeo = {
  /** Page title (the " | Rajeshwari Jewellers" suffix is added by the root template). Aim for ≤ 60 chars total. */
  title: string;
  /** Meta description — clamped to 160 characters. */
  description: string;
  /** Path of the canonical URL, e.g. "/catalog". */
  path: string;
  image?: { url: string; width?: number; height?: number; alt: string };
  noIndex?: boolean;
  /** Use the title as-is, without the site-name suffix. */
  absoluteTitle?: boolean;
};

/** Full metadata for a page: title, ≤160-char description, canonical URL, Open Graph, Twitter and robots. */
export function pageMetadata({ title, description, path, image = DEFAULT_OG_IMAGE, noIndex, absoluteTitle }: PageSeo): Metadata {
  const desc = clampText(description);
  const socialTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: SITE_NAME,
      url: path,
      title: socialTitle,
      description: desc,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: socialTitle, description: desc, images: [image.url] },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** Serialise JSON-LD safely for a <script type="application/ld+json"> tag. */
export const jsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
