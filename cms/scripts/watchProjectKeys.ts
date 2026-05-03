/**
 * Separate process from Vite/Astro (`bun run dev:watch-project-keys` or via `bun run dev`).
 * Debounced watch on Keystatic’s projects index.json → regenerates extracted keys (see README here).
 */
import { spawn } from 'node:child_process'
import { watch } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const target = resolve(root, 'src/content/projects/index.json')

let debounceTimer: NodeJS.Timeout | undefined

function runExtract() {
  spawn('bun', ['run', 'extract-project-keys'], {
    cwd: root,
    stdio: 'inherit',
  })
}

// oxlint-disable-next-line no-console
console.error(`[watch-project-keys] ${target}`)
watch(target, { persistent: true }, () => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(runExtract, 300)
})
