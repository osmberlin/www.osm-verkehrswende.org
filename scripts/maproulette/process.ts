import { maprouletteChallengeUrl } from '@components/campaigns/maprouletteChallengeUrl'
import { z } from 'astro/zod'
import { Glob } from 'bun'
import { startOfDay } from 'date-fns'
import type { AstroCampaignType } from 'keystatic/keystatic.campaigns.config'
import invariant from 'tiny-invariant'
import { defaultChallenge } from './default.const'
import {
  CreateMapRouletteChallengeSchema,
  UpdateMapRouletteChallengeSchema,
  type CreateMapRouletteChallengeType,
  type UpdateMapRouletteChallengeType,
} from './schema'

function dataCreateChallenge({ slug, ...astroCampaignData }: { slug: string } & AstroCampaignType) {
  const challengeData: CreateMapRouletteChallengeType = {
    ...defaultChallenge,
    name: astroCampaignData.name,
    infoLink: `https://www.osm-verkehrswende.org/traffic-signs/campaigns/${slug}`,
    remoteGeoJson: astroCampaignData.maprouletteChallenge.remoteGeoJson,
    enabled: astroCampaignData.maprouletteChallenge.enabled,
    description: astroCampaignData.content,
    checkinComment: astroCampaignData.maprouletteChallenge.checkinComment,
    checkinSource: astroCampaignData.maprouletteChallenge.checkinSource,
    dataOriginDate: startOfDay(new Date()).toISOString(), // Atlas data is always fresh
  }
  return CreateMapRouletteChallengeSchema.parse(challengeData)
}

function dataUpdateChallenge({ slug, ...astroCampaignData }: { slug: string } & AstroCampaignType) {
  invariant(
    astroCampaignData.maprouletteChallenge.id,
    'challenge.id is required dataUpdateChallenge',
  )

  const challengeData: UpdateMapRouletteChallengeType = {
    ...dataCreateChallenge({ slug, ...astroCampaignData }),
    id: astroCampaignData.maprouletteChallenge.id,
  }
  return UpdateMapRouletteChallengeSchema.parse(challengeData)
}

async function updateChallenge(challenge: UpdateMapRouletteChallengeType) {
  const response = await fetch(`https://maproulette.org/api/v2/challenge/${challenge.id}`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      apiKey: process.env.MAPROULETTE_KEY!,
    },
    body: JSON.stringify(challenge),
  })

  if (!response.ok) {
    const error = `Failed to update challenge: ${response.statusText}`
    console.error(error, await response.json(), response)
    throw new Error(error)
  }

  const data = await response.json()
  // console.log('Challenge updated', data)
  return data
}

async function createChallenge(challenge: CreateMapRouletteChallengeType) {
  const response = await fetch('https://maproulette.org/api/v2/challenge', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      apiKey: process.env.MAPROULETTE_KEY!,
    },
    body: JSON.stringify(challenge),
  })

  if (!response.ok) {
    const error = `Failed to create challenge: ${response.statusText}`
    console.error(error, await response.json(), response)
    throw new Error(error)
  }

  const data = await response.json()
  // console.log('Challenge created', data)
  return data
}

async function main() {
  const campaignsFolder = './src/content/campaigns'
  const glob = new Glob('**/*/index.json')
  const campaignPaths = glob.scan(campaignsFolder)

  for await (const campaignPath of campaignPaths) {
    console.log('  HANDLE', campaignPath)
    const [slug] = campaignPath.split('/')
    const filePath = `${campaignsFolder}/${campaignPath}`
    const json = await Bun.file(filePath).json()
    const action = json.maprouletteChallenge.id ? 'UPDATE' : 'CREATE'

    switch (action) {
      case 'CREATE':
        const createData = dataCreateChallenge({ slug, ...json })
        const challenge = await createChallenge(createData)
        // Write back the ID into the given Keystatic Content file
        const { id } = z.object({ id: z.number() }).parse(challenge)
        json.maprouletteChallenge.id = id
        await Bun.write(filePath, JSON.stringify(json, undefined, 2))
        console.log('    CREATED campaing', maprouletteChallengeUrl(id))
        break
      case 'UPDATE':
        const updateData = dataUpdateChallenge({ slug, ...json })
        await updateChallenge(updateData)
        console.log('    UPDATED campaing', maprouletteChallengeUrl(updateData.id))
        break
    }
  }
}

console.log('STARTING maproulette/process')
main()
