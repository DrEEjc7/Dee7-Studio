import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "industry",
      title: "Industry",
      type: "string",
      description: "E.g. SaaS / Analytics, HealthTech, E-commerce",
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "highlight",
      title: "Highlight",
      type: "string",
      description:
        "Honest short descriptor shown on the tile, e.g. \"Award winner\", \"10-page system\"",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "url",
      title: "Live site URL",
      type: "url",
      description: "Only when the shipped site is still live and still Dee7's design",
    }),
    defineField({
      name: "image",
      title: "Cover image",
      type: "image",
      description: "Project mockup or screenshot shown on the ink plate",
    }),
    defineField({
      name: "featured",
      title: "Featured on home page",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      description: "Lower numbers appear first",
      initialValue: 100,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "industry", media: "image" },
  },
});
