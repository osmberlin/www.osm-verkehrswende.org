import { collection, fields } from '@keystatic/core'
import { mdxComponentsKeystatic } from './components/mdxComponentsKeystatic'
import { authorsSelect } from './utils/authorsSelect'
import { languagesSelect } from './utils/languagesSelect'
import { projectsSelect } from './utils/projectsSelect'

export const contentBase = 'src/content/posts'
export const keystaticPostsConfig = collection({
  label: 'Blog',
  slugField: 'menuTitle',
  path: `${contentBase}/*/`,
  format: { contentField: 'content' },
  entryLayout: 'content',
  columns: ['title', 'pubDate'],
  schema: {
    title: fields.text({ label: 'Title', validation: { isRequired: true } }),
    menuTitle: fields.slug({ name: { label: 'Menu title', validation: { isRequired: true } } }),
    project: fields.select({
      label: 'Project',
      options: projectsSelect,
      defaultValue: projectsSelect.at(0)!.value,
    }),
    pubDate: fields.datetime({ label: 'Publish Date/Time', validation: { isRequired: true } }),
    updatedDatae: fields.datetime({ label: 'Date/Time of last relevant update' }),
    author: fields.select({
      label: 'Author',
      options: authorsSelect,
      defaultValue: authorsSelect.at(0)!.value,
    }),
    inMenu: fields.checkbox({ label: 'Show in Menu', defaultValue: true }),
    noindex: fields.checkbox({ label: 'Noindex for Google', defaultValue: false }),
    language: fields.select({
      label: 'Language',
      options: languagesSelect,
      defaultValue: languagesSelect.at(0)!.value,
    }),
    content: fields.mdx({
      label: 'Content',
      components: mdxComponentsKeystatic,
    }),
    image: fields.image({
      label: 'Social Sharing Image Path',
      description: 'Bild bitte im Format 1200x630px hochladen.',
    }),
    imageAlt: fields.text({ label: 'Social Sharin Image Alt Text' }),
    showToc: fields.checkbox({ label: 'Show TOC', defaultValue: false }),
    canonicalUrl: fields.url({ label: 'Canonical URL', validation: { isRequired: false } }),
  },
})
