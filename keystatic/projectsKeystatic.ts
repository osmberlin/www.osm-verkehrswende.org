import { fields, singleton } from '@keystatic/core'
import { languagesSelect } from './utils/languagesSelect'

export const contentBase = 'src/content/projects/'
export const keystaticProjectsConfig = singleton({
  label: 'Projekte',
  path: contentBase,
  format: { data: 'json' },
  schema: {
    projects: fields.array(
      fields.object({
        name: fields.slug({ name: { label: 'Name', validation: { isRequired: true } } }),
        enabled: fields.checkbox({ label: 'Aktiv', defaultValue: false }),
        externalProjektPage: fields.url({
          label: 'External Project Page',
          validation: { isRequired: false },
        }),
        header: fields.select({
          label: 'Header',
          options: [
            { label: 'ProjectHeader', value: 'ProjectHeader' },
            { label: 'AboutHeader', value: 'AboutHeader' },
          ],
          defaultValue: 'ProjectHeader',
        }),
        menus: fields.array(
          fields.object({
            label: fields.text({ label: 'Menu Group Label', validation: { isRequired: false } }),
            items: fields.array(
              fields.object({
                label: fields.text({ label: 'Menu Label', validation: { isRequired: true } }),
                href: fields.text({ label: 'Menu Href', validation: { isRequired: true } }),
              }),
              {
                label: 'Menu Item',
                description:
                  'Second level of menu item. External Links get an icon and target="_blank". automatically.',
                itemLabel: (props) => props.fields.label.value,
              },
            ),
          }),
          {
            label: 'Menu Group',
            description: 'First level of menu item. Can have a label but dont havte to.',
            itemLabel: (props) =>
              `${props.fields.label.value ? `${props.fields.label.value}:` : ''} ${props.fields.items.elements.map((i) => `"${i.fields.label.value}"`).join(', ')}`,
          },
        ),
        menuNews: fields.checkbox({ label: 'Show News in Menu', defaultValue: false }),
        additionalFooterLinks: fields.array(
          fields.object({
            label: fields.text({ label: 'Footer Label', validation: { isRequired: true } }),
            href: fields.text({ label: 'Footer Href', validation: { isRequired: true } }),
          }),
          {
            label: 'Additional Footer Link',
            itemLabel: (props) => props.fields.label.value,
          },
        ),
        meta: fields.object({
          title: fields.text({ label: 'Social Sharing Title', validation: { isRequired: false } }),
          description: fields.text({
            label: 'Social Sharing Description',
            validation: { isRequired: false },
          }),
          image: fields.image({
            label: 'Social Sharing Image',
            directory: 'src/content/projects',
            publicPath: '/src/content/projects',
          }),
          imageAlt: fields.text({
            label: 'Social Sharing Image Alt',
            validation: { isRequired: false },
          }),
          language: fields.select({
            label: 'Project Language',
            options: languagesSelect,
            defaultValue: languagesSelect.at(0)!.value,
          }),
        }),
      }),
      {
        label: 'Projekt',
        itemLabel: (props) =>
          `${props.fields.enabled.value ? '🌕' : '🌑'} ${props.fields.name.value.name} (${props.fields.name.value.slug})`,
      },
    ),
  },
})
