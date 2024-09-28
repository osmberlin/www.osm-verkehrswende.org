import { z } from 'astro/zod'

export const CreateMapRouletteChallengeSchema = z.strictObject({
  enabled: z.boolean(),
  checkinComment: z.string(), // "Verkehrszeichen ergänzet #osm_traffic_signs_project #missing_traffic_sign_244 #maproulette",
  checkinSource: z.string(), // "osm_traffic_signs_project",
  defaultBasemap: z.literal(-1), // -1,
  defaultBasemapId: z.literal(''), // "",
  description: z.string(), // "{task_markdown}\\n\\n\\n\\n. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . ",
  difficulty: z.z.union([z.literal(1), z.literal(2), z.literal(3)]), // 2,
  instruction: z.string(), // "Diese Kampagne enthält Wege, die [im Radverkehrsatlas](https://radverkehrsatlas.de/) als Fahrradstraße kategorisiert wurden, jedoch fehlt das zugehörige Verkehrszeichen.",
  // defaultPriority: z.number(),
  highPriorityRule: z.literal('{}'), // z.object({}), // "{}",
  mediumPriorityRule: z.literal('{}'), // z.object({}), // "{}",
  lowPriorityRule: z.literal('{}'), // z.object({}), // "{}",
  name: z.string(), // "test",
  overpassTargetType: z.null(), // null,
  parent: z.number(), // 57664,
  remoteGeoJson: z.string().url(), // "https://radverkehrsatlas.de/api/maproulette/missing_traffic_sign_244?ids=51477",
  tags: z.string(), // "highway",
  dataOriginDate: z.string().datetime(), // "2024-09-29T22:00:00.000Z",
  presets: z.array(z.string()), // [],
  taskStyles: z.array(z.string()), // [],
  infoLink: z.string().url(),
})

export type CreateMapRouletteChallengeType = z.infer<typeof CreateMapRouletteChallengeSchema>

export const UpdateMapRouletteChallengeSchema = CreateMapRouletteChallengeSchema.merge(
  z.object({ id: z.number() }),
)

export type UpdateMapRouletteChallengeType = z.infer<typeof UpdateMapRouletteChallengeSchema>
