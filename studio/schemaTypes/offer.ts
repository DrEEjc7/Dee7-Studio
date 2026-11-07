import { defineField, defineType } from "sanity";

export const offer = defineType({
  name: "offer",
  title: "Service offer",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "problem",
      title: "Problem hook",
      type: "string",
      description: "Problem-first header, e.g. \"Launching something new?\"",
    }),
    defineField({
      name: "forWho",
      title: "Who it's for",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "timeline",
      title: "Timeline",
      type: "string",
      description: "E.g. \"2-3 weeks\"",
    }),
    defineField({
      name: "fromPrice",
      title: "From price",
      type: "string",
      description: "Shown only on the offer page, never on home. E.g. \"From $5,000\"",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "deliverables",
      title: "What you get",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "steps",
      title: "How it works",
      type: "array",
      of: [
        {
          type: "object",
          name: "step",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "text", title: "Text", type: "text", rows: 2 }),
          ],
        },
      ],
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      of: [
        {
          type: "object",
          name: "faqItem",
          fields: [
            defineField({ name: "q", title: "Question", type: "string" }),
            defineField({ name: "a", title: "Answer", type: "text", rows: 3 }),
          ],
        },
      ],
    }),
    defineField({
      name: "cta",
      title: "CTA label",
      type: "string",
      description: "E.g. \"Start Your Sprint\"",
    }),
    defineField({
      name: "featured",
      title: "Featured",
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
  orderings: [
    {
      title: "Sort order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "timeline" },
  },
});
