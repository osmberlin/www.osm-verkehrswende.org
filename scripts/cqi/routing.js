import * as turf from '@turf/turf'
import { exec } from 'child_process'
import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

console.log('START')

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const inputFile = path.resolve(__dirname, './geojson/cycling_quality_index_epsg4326.geojson')
const outputPath = path.resolve(__dirname, './geojson/')

// Read
const inputRaw = fs.readFileSync(inputFile, 'utf8')
const inputJson = JSON.parse(inputRaw)

// Transform
// Group features by properties.id
const groupedFeatures = {}
for (const feature of inputJson.features) {
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

  resultProperties.forward_cost = Math.max(centerline_lts, right_lts)
  resultProperties.backward_cost = Math.max(centerline_lts, left_lts)

  resultProperties.DEBUG_forward_cost = [centerline_lts, right_lts].join(';')
  resultProperties.DEBUG_backward_cost = [centerline_lts, left_lts].join(';')

  // Testcase: way/881155243 uses the "shared road", not the separate bike lane which is horrible
  // Testcase: way/36738527 uses the "cycle track" which is better than the road
  resultProperties.forward_infrastructure =
    right_lts > centerline_lts ? right.properties.way_type : centerline.properties.way_type
  resultProperties.backward_infrastructure =
    left_lts > centerline_lts ? left.properties.way_type : centerline.properties.way_type

  results.push(turf.lineString(resultGeometry.coordinates, resultProperties))
}

const outputGeosjon = turf.featureCollection(results)

// Write
fs.writeFileSync(
  path.join(outputPath, 'routing_cycling_quality_index.geojson'),
  JSON.stringify(outputGeosjon, undefined, 2),
)

// DONE
console.log('DONE')
exec(`open ${path.resolve(__dirname, './geojson/')}`)
exec(`open "https://dabreegster.github.io/route_snapper/import.html"`)
console.log(
  'Now, take this file and create the route graph from it by uploading it on https://dabreegster.github.io/route_snapper/import.html',
)
