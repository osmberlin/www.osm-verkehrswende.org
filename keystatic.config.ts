import { collection, config, fields } from '@keystatic/core'
import { languages } from '@layouts/types'
import { projectConfigs } from 'src/projectConfigs.const'

const projectsSelect = Object.entries(projectConfigs)
  .map(([key, values]) => {
    if (!values.name) return null
    return {
      label: values.name,
      value: key,
    }
  })
  .filter(Boolean)

const authors = ['Tobias Jordans @tordans', 'Alex Seidel @supaplex030'] as const
const authorSelect = authors
  .map((authorName) => {
    return {
      label: authorName,
      value: authorName,
    }
  })
  .filter(Boolean)

const languagesSelect = languages
  .map((languageName) => {
    return {
      label: languageName,
      value: languageName,
    }
  })
  .filter(Boolean)

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    posts: collection({
      label: 'Blog',
      slugField: 'title',
      path: 'src/content/posts/*/',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        menuTitle: fields.slug({ name: { label: 'Menu title' } }),
        project: fields.select({
          label: 'Project',
          options: projectsSelect,
          defaultValue: 'about',
        }),
        pubDate: fields.datetime({ label: 'Publish date time' }),
        author: fields.select({ label: 'Author', options: authorSelect, defaultValue: authors[0] }),
        canonical_url: fields.url({ label: 'Canonical URL' }),
        inMenu: fields.checkbox({ label: 'Show in Menu', defaultValue: true }),
        showToc: fields.checkbox({ label: 'Show TOC', defaultValue: false }),
        language: fields.select({
          label: 'Language',
          options: languagesSelect,
          defaultValue: languages[0],
        }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
  },
})
