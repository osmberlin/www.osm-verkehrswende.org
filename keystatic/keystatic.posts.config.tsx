import { collection, fields } from '@keystatic/core'
import { languages } from '@layouts/languages'
import { defineCollection, z } from 'astro:content'
import { extractedProjectKeys } from './extractedProjectKeys'
import { mdxComponentsKeystatic } from './mdxComponents'
import { authorsSelect } from './utils/authorsSelect'
import { languagesSelect } from './utils/languagesSelect'
import { projectsSelect } from './utils/projectsSelect'

export const astroPostsDefinition = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    project: z.enum(extractedProjectKeys),
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
    language: z.enum(languages).optional(),
    imagePath: z.string().optional(),
    imageAlt: z.string().optional(),
    showToc: z.boolean().optional(), // TODO Do we need this?
    noindex: z.boolean().optional(),
  }),
})

export const keystaticPostsConfig = collection({
  label: 'Blog',
  slugField: 'menuTitle',
  path: 'src/content/posts/*/',
  format: { contentField: 'content' },
  entryLayout: 'content',
  schema: {
    title: fields.text({ label: 'Title', validation: { isRequired: true } }),
    menuTitle: fields.slug({ name: { label: 'Menu title', validation: { isRequired: true } } }),
    project: fields.select({
      label: 'Project',
      options: projectsSelect,
      defaultValue: projectsSelect.at(0)!.value,
    }),
    pubDate: fields.datetime({ label: 'Publish Date/Time' }),
    updatedDatae: fields.datetime({ label: 'Date/Time of last relevant update' }),
    author: fields.select({
      label: 'Author',
      options: authorsSelect,
      defaultValue: authorsSelect.at(0)!.value,
    }),
    inMenu: fields.checkbox({ label: 'Show in Menu', defaultValue: true }),
    noindex: fields.checkbox({ label: 'Noindex for Google', defaultValue: false }),
    language: fields.select({
      label: 'Language',
      options: languagesSelect,
      defaultValue: languagesSelect.at(0)!.value,
    }),
    content: fields.mdx({
      label: 'Content',
      components: mdxComponentsKeystatic,
    }),
    imagePath: fields.image({
      label: 'Social Sharing Image Path',
      description: 'Bild bitte im Format 1200x630px hochladen.',
    }),
    imageAlt: fields.text({ label: 'Social Sharin Image Alt Text' }),
    showToc: fields.checkbox({ label: 'Show TOC', defaultValue: false }),
    canonical_url: fields.url({ label: 'Canonical URL', validation: { isRequired: false } }),
  },
})
