import { defineField, defineType } from "sanity";

/** Clean URL slug: lowercase words joined by hyphens ("MS Lockets 22K" → "ms-lockets-22k"). */
const slugify = (input: string) =>
  input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);

export const productSchema = defineType({
  name: "product",
  title: "Product",
  type: "document",
  groups: [
    { name: "details", title: "Details", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      group: "details",
      description: "Shown as the page's main heading (H1). Be specific, e.g. \"Antique Temple Necklace Set\".",
      validation: (rule) => rule.required().max(70),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      group: ["details", "seo"],
      description: "The page address: /catalog/<slug>. Lowercase words joined by hyphens. Avoid changing it after publishing.",
      options: {
        source: "name",
        maxLength: 96,
        slugify,
      },
      validation: (rule) =>
        rule.required().custom((value) => {
          const current = value?.current;
          if (!current) return true;
          return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(current) || "Use lowercase letters, numbers and single hyphens only";
        }),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "details",
      options: {
        list: [
          { title: "Antique", value: "Antique" },
          { title: "Female", value: "Female" },
          { title: "Male", value: "Male" },
          { title: "Kids", value: "Kids" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subcategory",
      title: "Subcategory",
      type: "string",
      group: "details",
      options: {
        list: [
          { title: "Set", value: "Set" },
          { title: "Jhumar", value: "Jhumar" },
          { title: "Bangles", value: "Bangles" },
          { title: "Rings", value: "Rings" },
          { title: "Earrings", value: "Earrings" },
          { title: "Necklaces", value: "Necklaces" },
          { title: "MS Lockets", value: "MS Lockets" },
          { title: "Pendants", value: "Pendants" },
          { title: "Dokiya", value: "Dokiya" },
          { title: "Mala", value: "Mala" },
          { title: "Bracelet", value: "Bracelet" },
          { title: "Kanchain", value: "Kanchain" },
          { title: "Bali", value: "Bali" },
          { title: "Mangalsutra", value: "Mangalsutra" },
          { title: "Rudrakash", value: "Rudrakash" },
          { title: "Lucky", value: "Lucky" },
          { title: "Nazriya", value: "Nazriya" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      group: "details",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description:
            "Describe the photo for Google Images and screen readers, e.g. \"22K gold dokiya necklace with three fine chains on a maroon display bust\". Max 125 characters.",
          validation: (rule) => rule.required().max(125).warning("Alt text helps image search — please describe the piece"),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "approxWeight",
      title: "Approx Weight (in grams)",
      type: "number",
      group: "details",
      description: "Enter weight in decimals (e.g. 12.5)",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      group: "details",
      rows: 4,
    }),
    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
      group: "details",
      description: "Optional badge text like 'New', 'Bestseller'",
    }),

    /* ── SEO ── */
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      group: "seo",
      description: "Title shown in Google results. Leave empty to use the product name. Ideal: 50–60 characters (\" | Rajeshwari Jewellers\" is added automatically).",
      validation: (rule) => rule.max(60).warning("Longer titles get cut off in search results"),
    }),
    defineField({
      name: "seoDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      group: "seo",
      description: "Summary shown under the title in Google. Leave empty to generate one automatically. Ideal: 120–160 characters.",
      validation: (rule) => rule.max(160).warning("Descriptions over 160 characters get cut off"),
    }),
    defineField({
      name: "seoKeywords",
      title: "Focus Keywords",
      type: "array",
      of: [{ type: "string" }],
      group: "seo",
      options: { layout: "tags" },
      description: "2–5 phrases buyers would search for, e.g. \"22k gold dokiya\", \"gold necklace wholesale ahmedabad\". Use them naturally in the name, description and alt text.",
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: "ogImage",
      title: "Social Sharing Image",
      type: "image",
      group: "seo",
      description: "Optional image for WhatsApp/Facebook link previews (1200×630 works best). Defaults to the product image.",
    }),
    defineField({
      name: "noIndex",
      title: "Hide from search engines",
      type: "boolean",
      group: "seo",
      initialValue: false,
      description: "Turn on only for pieces that shouldn't appear in Google (e.g. discontinued items).",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "subcategory", media: "image" },
  },
});
