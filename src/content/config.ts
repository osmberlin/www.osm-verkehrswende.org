import { defineCollection, z } from 'astro:content'

const postCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    project: z.enum([
      'about',
      'mapswipe',
      'benches',
      'bicycle-parking',
      'cqi',
      'mapillary',
      'parking',
      'unkown',
    ]),
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    updatedDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val))
      .optional(), // Note: implemented but unused ATM
    author: z.string(),
    inMenu: z.boolean(),
    menuTitle: z.string(),
    menuHighlight: z.string().optional(), // TODO Do we still need this?
    canonicalUrl: z.string().url().optional(),
    language: z.enum(['de', 'en']).optional(),
    imagePath: z.string().optional(),
    imageAlt: z.string().optional(),
    showToc: z.boolean().optional(), // TODO Do we need this?
    noindex: z.boolean().optional(),
  }),
})

export const collections = {
  posts: postCollection,
}
