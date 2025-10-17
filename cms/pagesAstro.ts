import { defineCollection, z } from 'astro:content'
import { contentBase } from './pagesKeystatic'
import { loader } from './utils/loader'

export const astroPagesDefinition = defineCollection({
  loader: loader(contentBase, 'mdx'),
  schema: ({ image }) =>
    z.object({
      identifier: z.string(),
      title: z.string(),
      pageTitle: z.string(),
      pageSubtitle: z.string(),
      description: z.string().optional(),
      noindex: z.boolean(),
      language: z.string(),
      socialSharingImage: image().optional(),
      imageAlt: z.string().optional(),
    }),
})
