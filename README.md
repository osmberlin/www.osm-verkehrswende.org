# osm-verkehrswende.org website

osm-verkehrswende.org is a project hub that documents the different activities of the "Verkehrswende" community.

Learn more…

- https://www.osm-verkehrswende.org/
- https://wiki.openstreetmap.org/wiki/Berlin/Verkehrswende
- Join our next meetup

## Meetups

We have monthly meetups – usually in German, but we are happy to switch to English. The next meetup will be announced [on our Wiki page](https://wiki.openstreetmap.org/wiki/Berlin/Verkehrswende).

## Development

This project is build with [Astro](https://astro.build/), using `.astro` files whenever possible and Markdown or MDX for blog posts and pages. Dynamic pages like maps are build in React.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/blog)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/blog)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/blog/devcontainer.json)

### CMS

We use [Keystatic](https://keystatic.com/) to edit some of the content.

- [CMS-Website](https://osm-verkehrswende-keystatic.netlify.app/keystatic) (Can only be used by users that have permissions to this Github repo)
- [Netlify-Backend for the CMS](https://app.netlify.com/sites/osm-verkehrswende-keystatic/overview) (Managed by @tordans)

### Add a new project

- Create a new project folder in `/pages`
- Update the project slug in `pages/PROJECT/posts/[...slug].astro`
- Add the project via Keystatic in `src/content/projects/index.json`
- (The project keys will be [extractd automatically](keystatic/scripts/README.md).)
