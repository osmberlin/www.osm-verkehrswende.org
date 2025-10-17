import { collection, fields } from '@keystatic/core'
import { mdxComponentsKeystatic } from './components/mdxComponentsKeystatic'
import { languagesSelect } from './utils/languagesSelect'

export const contentBase = 'src/content/pages'
export const keystaticPagesConfig = collection({
  label: 'Pages',
  slugField: 'identifier',
  path: `${contentBase}/*/`,
  format: { contentField: 'content' },
  entryLayout: 'content',
  columns: ['title', 'language'],
  schema: {
    identifier: fields.slug({
      name: {
        label: 'Identifier',
        description: 'Unique identifier for this page (e.g., "mapillary_home", "index_home")',
        validation: { isRequired: true },
      },
    }),
    title: fields.text({
      label: 'Document Title',
      validation: { isRequired: true },
    }),
    pageTitle: fields.text({
      label: 'Page Title',
      description: 'Main headline title for the page',
      validation: { isRequired: true },
    }),
    pageSubtitle: fields.text({
      label: 'Page Subtitle',
      description: 'Subtitle text for the page',
      validation: { isRequired: true },
    }),
    description: fields.text({
      label: 'Document Description',
    }),
    noindex: fields.checkbox({ label: 'Noindex for Google', defaultValue: false }),
    language: fields.select({
      label: 'Language',
      options: languagesSelect,
      defaultValue: languagesSelect.at(0)!.value,
    }),
    socialSharingImage: fields.image({
      label: 'Social Sharing Image',
      description: 'Bild bitte im Format 1200x630px hochladen.',
      directory: 'src/content/pages',
      publicPath: '/src/content/pages',
    }),
    imageAlt: fields.text({ label: 'Social Sharin Image Alt Text' }),
    content: fields.mdx({
      label: 'Content',
      components: mdxComponentsKeystatic('pages'),
      // Astro does not allow to configure max image sizes for Content components.
      // Instead we rely on our custom image components.
      options: { image: false },
    }),
  },
})
