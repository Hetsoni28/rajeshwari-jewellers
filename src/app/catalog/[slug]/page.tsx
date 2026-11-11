import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchAllProducts, fetchProductBySlug } from "@/sanity/queries";
import { ProductDetailsClient } from "./ProductDetailsClient";
import {
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  categoryLabel,
  clampText,
  jsonLd,
  productAlt,
  productDescription,
} from "@/lib/seo";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  if (!product) return { title: "Product not found", robots: { index: false, follow: true } };

  // "Dokiya – 22K Gold Dokiya" reads badly when name and type match, so only add the type when it adds information
  const sameAsType = product.subcategory?.toLowerCase() === product.name.toLowerCase();
  const title = product.seoTitle?.trim() || (sameAsType ? `${product.name} – 22K Gold ${categoryLabel(product.category)} Jewellery` : `${product.name} – 22K Gold ${product.subcategory}`);
  const description = productDescription(product);
  const path = `/catalog/${product.slug}`;
  const imageUrl = product.ogImage || (product.image ? `${product.image}?w=1200&h=630&fit=fill&bg=F8F5F0&auto=format` : undefined);
  const image = imageUrl ? { url: imageUrl, width: 1200, height: 630, alt: productAlt(product) } : undefined;

  return {
    title: clampText(title, 60),
    description,
    keywords: product.seoKeywords?.length ? product.seoKeywords : undefined,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: SITE_NAME,
      url: path,
      title: `${clampText(title, 60)} | ${SITE_NAME}`,
      description,
      images: image ? [image] : undefined,
    },
    twitter: { card: "summary_large_image", title: `${clampText(title, 60)} | ${SITE_NAME}`, description, images: image ? [image.url] : undefined },
    robots: product.noIndex ? { index: false, follow: true } : undefined,
  };
}

export default async function ProductDetailsPage({ params }: Props) {
  const { slug } = await params;
  const [product, allProducts] = await Promise.all([fetchProductBySlug(slug), fetchAllProducts()]);

  // Return a proper 404 instead of a 200 "not found" page
  if (!product) notFound();

  // Other pieces from the same collection (same type first)
  const related = allProducts
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .sort((a, b) => Number(b.subcategory === product.subcategory) - Number(a.subcategory === product.subcategory))
    .slice(0, 4);

  const url = absoluteUrl(`/catalog/${product.slug}`);
  const categoryUrl = absoluteUrl(`/catalog?category=${encodeURIComponent(product.category)}`);

  // Product + breadcrumb structured data. No price is published (rates follow the daily gold price),
  // so no Offer is claimed — the schema only states facts shown on the page.
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${url}#product`,
        name: product.name,
        url,
        description: productDescription(product),
        image: product.image
          ? [{ "@type": "ImageObject", url: product.image, caption: productAlt(product), width: product.imageWidth, height: product.imageHeight }]
          : undefined,
        category: `${categoryLabel(product.category)} jewellery > ${product.subcategory}`,
        material: "22K gold",
        brand: { "@type": "Brand", name: SITE_NAME },
        manufacturer: { "@id": `${SITE_URL}/#business` },
        weight: product.approxWeight
          ? { "@type": "QuantitativeValue", value: Number(product.approxWeight), unitCode: "GRM", unitText: "g (approx.)" }
          : undefined,
        keywords: product.seoKeywords?.join(", "),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Catalog", item: absoluteUrl("/catalog") },
          { "@type": "ListItem", position: 3, name: categoryLabel(product.category), item: categoryUrl },
          { "@type": "ListItem", position: 4, name: product.name, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
      <ProductDetailsClient product={product} related={related} />
    </>
  );
}
