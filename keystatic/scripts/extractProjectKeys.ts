import * as fs from 'fs'
import * as path from 'path'

const inputFilePath = path.resolve(__dirname, '../../src/content/projects/index.json')
const outputFilePath = path.resolve(__dirname, '../extractedProjectKeys.ts')
console.log('inputFilePath', inputFilePath)
console.log('outputFilePath', outputFilePath)
const rawData = fs.readFileSync(inputFilePath, 'utf8')
const data = JSON.parse(rawData) as any

const slugs = data.projects.map((project: any) => project.name.slug) as string[]

const tsContent = `
// (!) This file is auto-generated
// See keystatic/scripts/README.md for more

export const extractedProjectKeys = ${JSON.stringify(slugs, null, 2)} as const;
`
fs.writeFileSync(outputFilePath, tsContent, 'utf8')

console.log(`Extracted project keys (${slugs.length}) have been written to ${outputFilePath}`)
