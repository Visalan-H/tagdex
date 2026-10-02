import { defineCollection, reference } from "astro:content";
import { file } from "astro/loaders";
import { z } from "astro/zod";

const families = defineCollection({
  loader: file("data/elements.json", {
    parser: (text) => JSON.parse(text).families,
  }),
  schema: z.object({
    label: z.string(),
    analog: z.string(),
    summary: z.string(),
  }),
});

const elements = defineCollection({
  loader: file("data/elements.json", {
    parser: (text) =>
      JSON.parse(text).elements.map((el: { tag: string }) => ({ id: el.tag, ...el })),
  }),
  schema: z.object({
    n: z.number().int().positive(),
    tag: z.string(),
    symbol: z.string().regex(/^[A-Z0-9][a-z0-9]?$/),
    name: z.string(),
    family: reference("families"),
    void: z.boolean(),
    role: z.string().nullable(),
    since: z.enum(["HTML 2.0", "HTML 3.2", "HTML 4.0", "HTML5", "Living Standard", "Browser extension"]),
    attrs: z.array(z.string()),
    replacement: z.string().optional(),
    summary: z.string(),
    tip: z.string(),
  }),
});

export const collections = { families, elements };
