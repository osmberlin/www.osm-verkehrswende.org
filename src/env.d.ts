/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// Get rid of missleading warning when running `tsc`.
declare module '*.astro'

interface ImportMetaEnv {
  readonly ASTRO_OUTPUT_MODE: 'hybrid' | 'static'
  readonly ASTRO_USE_NETLIFY_ADAPTER: 'true' | 'false'
  readonly PUBLIC_ASTRO_STORAGE_KIND: 'local' | 'github'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
