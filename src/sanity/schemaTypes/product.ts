import { defineField, defineType } from "sanity";

export const productSchema = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
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
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "approxWeight",
      title: "Approx Weight (in grams)",
      type: "number",
      description: "Enter weight in decimals (e.g. 12.5)",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
      description: "Optional badge text like 'New', 'Bestseller'",
    }),
  ],
});
