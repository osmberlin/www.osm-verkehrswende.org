import { languages } from '@layouts/languages'
import { defineCollection, z } from 'astro:content'
import { contentBase } from './campaignsKeystatic'
import { extractedProjectKeys } from './extractedProjectKeys'
import { loader } from './utils/loader'

export const AstroCampaignSchema = z.object({
  name: z.string(),
  menuTitle: z.string(),
  project: z.enum(extractedProjectKeys),
  pubDate: z
    .string()
    .or(z.date())
    .transform((val) => new Date(val)),
  author: z.string(),
  inMenu: z.boolean(),
  language: z.enum(languages).optional(),
  maprouletteChallenge: z.object({
    id: z.number().nullable(),
    enabled: z.boolean(),
    name: z.string(),
    remoteGeoJson: z.string().url(),
    checkinComment: z.string(),
    checkinSource: z.string(),
  }),
})

export type AstroCampaignType = z.infer<typeof AstroCampaignSchema> & { content: string }

export const astroCampaignsDefinition = defineCollection({
  loader: loader(contentBase, 'json'),
  schema: () => AstroCampaignSchema,
})
