# About

We decided to create a singleton for the projects so we have one json file and we can easily change the order of projects via Keystatic.

That means, however, that we cannot use the fields.relation helper and we cannot extract a list of keys from Astro.

To work around, we create our own list of projectKeys:

- We use https://www.kitql.dev/docs/tools/03_vite-plugin-watch-and-run to watch the projects/index.json
- We run the script in this folder
- We create extractedProjectKeys.ts with the list of project keys
