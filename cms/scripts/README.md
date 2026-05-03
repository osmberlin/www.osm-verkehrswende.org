# About

We decided to create a singleton for the projects so we have one json file and we can easily change the order of projects via Keystatic.

That means, however, that we cannot use the fields.relation helper and we cannot extract a list of keys from Astro.

To work around, we create our own list of projectKeys:

- In dev, **`bun run dev`** runs **`astro dev`** and **`cms/scripts/watchProjectKeys.ts`** in parallel via **`bun run --parallel`** (same as **`dev:astro`** + **`dev:watch-project-keys`**). Watching runs **outside** Vite/Astro so we do not add extra `FSWatcher` listeners to the dev server.
- **`watchProjectKeys`** debounces changes to **`src/content/projects/index.json`** and runs **`bun run extract-project-keys`**.
- **`extract-project-keys`** (`cms/scripts/extractProjectKeys.ts`) writes **`cms/extractedProjectKeys.ts`**.

Run **`bun run extract-project-keys`** manually after editing projects when not using **`bun run dev`**.
