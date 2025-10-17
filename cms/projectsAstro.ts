import { languages } from '@layouts/languages'
import { defineCollection, z, type CollectionEntry } from 'astro:content'
import { contentBase } from './projectsKeystatic'
import { loader } from './utils/loader'

export type TProjectConfig = CollectionEntry<'projects'>['data']['projects'][number]

export const astroProjectsDefinition = defineCollection({
  loader: loader(contentBase, 'json'),
  schema: ({ image }) =>
    z.object({
      projects: z.array(
        z.object({
          enabled: z.boolean(),
          name: z.object({ name: z.string(), slug: z.string() }),
          externalProjektPage: z.string().optional(),
          header: z.enum(['ProjectHeader', 'AboutHeader']),
          menus: z
            .array(
              // Menu Group
              z.object({
                label: z.string().nullish(),
                // Menu Items
                items: z.array(z.object({ href: z.string(), label: z.string() })),
              }),
            )
            .nullish(),
          menuNews: z.boolean(),
          additionalFooterLinks: z
            .array(z.object({ href: z.string(), label: z.string() }))
            .optional(),
          meta: z.object({
            title: z.string(),
            description: z.string().nullish(),
            image: image().nullish(),
            imageAlt: z.string().nullish(),
            language: z.enum(languages),
          }),
        }),
      ),
    }),
})
