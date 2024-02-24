import { spawnSync } from 'child_process'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

console.log('START')

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const inputFile = path.resolve(__dirname, './geojson/cycling_quality_index.geojson')
const outputFile = path.resolve(__dirname, './pmtiles/cycling_quality_index.pmtiles')

console.log('Tippecanoe for', inputFile)

const child = spawnSync('tippecanoe', [
  `--output=${outputFile}`,
  '--force',
  '--maximum-zoom=g', // Automatically choose a maxzoom that should be sufficient to clearly distinguish the features and the detail within each feature https://github.com/felt/tippecanoe#zoom-levels
  '-rg', // If you use -rg, it will guess a drop rate that will keep at most 50,000 features in the densest tile https://github.com/felt/tippecanoe#dropping-a-fixed-fraction-of-features-by-zoom-level
  '--drop-densest-as-needed', // https://github.com/felt/tippecanoe?tab=readme-ov-file#dropping-a-fraction-of-features-to-keep-under-tile-size-limits
  '--extend-zooms-if-still-dropping', // https://github.com/felt/tippecanoe?tab=readme-ov-file#zoom-levels
  '--layer=default',
  inputFile,
])

if (child.error) {
  console.log('error:', child.error)
}

if (child.status !== 0) {
  console.log('exitCode:', child.status)
}
