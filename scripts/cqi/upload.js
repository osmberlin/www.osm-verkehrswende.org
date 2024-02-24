import { S3 } from '@aws-sdk/client-s3'
import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const s3 = new S3({
  region: 'eu-central-1',
})
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

console.log('START', __filename, 'Uploading all files from ./pmtiles to S3 bucket atlas-tiles')

const pmtilesFiles = fs
  .readdirSync(path.resolve(__dirname, './pmtiles'))
  .filter((file) => path.extname(file) === '.pmtiles')

for (const file of pmtilesFiles) {
  const Key = file
  const filePath = path.resolve(__dirname, './pmtiles', file)
  const Body = fs.readFileSync(filePath)
  const ContentType = 'application/x-protobuf'

  s3.putObject({ Bucket: 'atlas-tiles', Key, Body, ContentType }, (err, _data) => {
    if (err) {
      console.error(err)
      return
    }
    const previewUrl = `https://atlas-tiles.s3.eu-central-1.amazonaws.com/${file}`
    console.log('INFO', `Test-URL: https://protomaps.github.io/PMTiles/?url=${previewUrl}`)
  })
}
