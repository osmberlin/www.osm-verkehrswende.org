import { spawnSync } from 'child_process'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

console.log('START')

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const inputFile = path.resolve(__dirname, '../input/cycling_quality_index_epsg4326.geojson')
const outputFile = path.resolve(__dirname, './files_pmtiles/cycling_quality_index.pmtiles')

console.log('Tippecanoe for', inputFile)

const child = spawnSync('tippecanoe', [
  `--output=${outputFile}`,
  '--force',
  '--smallest-maximum-zoom-guess=18', // Smallest maxzoom which is acceptable for our precision requirements, is higher, if tippecanoe guesses a higher maxzoom, it will be used ttps://github.com/felt/tippecanoe#zoom-levels / Automatic --maximum-zoom didn't have the required precision
  '-rg', // If you use -rg, it will guess a drop rate that will keep at most 50,000 features in the densest tile https://github.com/felt/tippecanoe#dropping-a-fixed-fraction-of-features-by-zoom-level
  '--drop-densest-as-needed', // https://github.com/felt/tippecanoe#dropping-a-fraction-of-features-to-keep-under-tile-size-limits
  '--extend-zooms-if-still-dropping', // https://github.com/felt/tippecanoe#zoom-levels
  '--layer=default',
  inputFile,
])

if (child.error) {
  console.log('error:', child.error)
}

if (child.status !== 0) {
  console.log('exitCode:', child.status)
}
