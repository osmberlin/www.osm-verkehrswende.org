import * as turf from '@turf/turf'
import { exec } from 'child_process'
import { create } from 'domain'
import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

// Use the first command-line argument as the input filename
const argsInputFile = process.argv[2]
console.log('START WITH', argsInputFile)
if (!argsInputFile) {
  console.error(
    'Please provide an input filename as a command-line argument, e.g. "node routing.js cycling_quality_index_epsg4326.geojson"',
  )
  process.exit(1)
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const inputFile = path.resolve(__dirname, './geojson/', argsInputFile)

// Read
const inputRaw = fs.readFileSync(inputFile, 'utf8')
const inputJson = JSON.parse(inputRaw)

const routingWeightFallback = 10
const routingSzenarios = new Map([
  [
    'lts1', // children
    {
      lts1factor: 1,
      lts2factor: 5,
      lts3factor: 10,
      lts4factor: 20,
    },
  ],
  [
    'lts2',
    {
      lts1factor: 1,
      lts2factor: 5,
      lts3factor: 20,
      lts4factor: 20,
    },
  ],
  [
    'lts3',
    {
      lts1factor: 1,
      lts2factor: 5,
      lts3factor: 10,
      lts4factor: 20,
    },
  ],
  [
    'lts4', // Kampfradler
    {
      lts1factor: 1,
      lts2factor: 2,
      lts3factor: 2,
      lts4factor: 3,
    },
  ],
])

for (const [routingSzenarioName, routingSzenarioWeight] of routingSzenarios) {
  const inputFilename = path.basename(inputFile)
  const outputFile = path.resolve(
    __dirname,
    './geojson/',
    `routing_${inputFilename}_${routingSzenarioName}.geojson`,
  )

  // Transform
  // Group features by properties.id
  const groupedFeatures = {}
  for (const feature of inputJson.features) {
    // Some features should not be routed, but – for now – our script is not happy about missing sides, so we rewrite the stress_level to something that wont be routed
    if (feature.properties.filter_usable === 0) {
      feature.properties.stress_level = 99
    }

    const key = feature.properties.id
    if (!groupedFeatures[key]) {
      groupedFeatures[key] = []
    }
    groupedFeatures[key].push(feature)
  }

  // For each group, find the centerline feature (with side: NULL) and update its forward_cost/backward_cost
  const results = []
  for (const properties of Object.values(groupedFeatures)) {
    const left = properties.find((feature) => feature.properties.side === 'left')
    const left_lts = left ? left.properties.stress_level : null
    const centerline = properties.find((feature) => feature.properties.side === null)
    const centerline_lts = centerline ? centerline.properties.stress_level : null
    const right = properties.find((feature) => feature.properties.side === 'right')
    const right_lts = right ? right.properties.stress_level : null

    const resultSource = centerline || left || right
    const resultGeometry = resultSource.geometry
    const resultProperties = {
      id: resultSource.properties.id,
      name: resultSource.properties.name,
    }

    if (!centerline) {
      // Note: That never happens apparently
      resultProperties.DEBUG_linestring = 'Centerline was missing, used left or right instead'
    }

    const pickCost = (centerCost, sideCost) => {
      if (centerCost === null) return sideCost
      if (sideCost === null) return centerCost
      return Math.min(centerCost, sideCost)
    }
    resultProperties.forward_cost = pickCost(centerline_lts, right_lts)
    resultProperties.backward_cost = pickCost(centerline_lts, left_lts)

    // Apply routing szenario weight
    const weightFactor =
      routingSzenarioWeight[`lts${resultProperties.forward_cost}factor`] || routingWeightFallback
    resultProperties.forward_cost = weightFactor * resultProperties.forward_cost
    resultProperties.backward_cost = weightFactor * resultProperties.backward_cost

    resultProperties.DEBUG_weight_factor = weightFactor
    resultProperties.DEBUG_forward_cost = `center:${JSON.stringify(centerline_lts)}; right:${JSON.stringify(right_lts)}`
    resultProperties.DEBUG_backward_cost = `center:${JSON.stringify(centerline_lts)}; left:${JSON.stringify(left_lts)}`

    results.push(turf.lineString(resultGeometry.coordinates, resultProperties))
  }

  const outputGeosjon = turf.featureCollection(results)

  // Write
  fs.writeFileSync(path.join(outputFile), JSON.stringify(outputGeosjon, undefined, 2))

  // DONE
  console.log('DONE')
  // exec(`open ${path.resolve(__dirname, './geojson/')}`)
  // exec(`open "https://dabreegster.github.io/route_snapper/import.html"`)
  console.log(
    'Now, take this file and create the route graph from it by uploading it on https://dabreegster.github.io/route_snapper/import.html',
  )
  if (inputFilename.includes('test')) {
    exec(
      `open http://geojson.io/#data=data:application/json,${encodeURIComponent(JSON.stringify(outputGeosjon))}`,
    )
  }
}
