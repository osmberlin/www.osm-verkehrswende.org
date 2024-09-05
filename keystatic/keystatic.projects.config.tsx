import { fields, singleton } from '@keystatic/core'
import { languages } from '@layouts/languages'
import { defineCollection, z, type CollectionEntry } from 'astro:content'
import { languagesSelect } from './utils/languagesSelect'

export type TProjectConfig = CollectionEntry<'projects'>['data']['projects'][number]

export const astroProjectsDefinition = defineCollection({
  type: 'data',
  schema: z.object({
    projects: z.array(
      z.object({
        enabled: z.boolean(),
        name: z.object({ name: z.string(), slug: z.string() }),
        externalProjektPage: z.string().optional(),
        header: z.enum(['ProjectHeader', 'AboutHeader']),
        menus: z
          .array(
            // Menu Group
            z.object({
              label: z.string().nullish(),
              // Menu Items
              items: z.array(z.object({ href: z.string(), label: z.string() })),
            }),
          )
          .nullish(),
        menuNews: z.boolean(),
        additionalFooterLinks: z
          .array(z.object({ href: z.string(), label: z.string() }))
          .optional(),
        meta: z.object({
          title: z.string(),
          description: z.string().nullish(),
          imagePath: z.object({ value: z.string() }),
          imageAlt: z.string().nullish(),
          language: z.enum(languages),
        }),
      }),
    ),
  }),
})

export const keystaticProjectsConfig = singleton({
  label: 'Projekte',
  path: 'src/content/projects/',
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
              `${props.fields.label.value} (${props.fields.items.elements.map((i) => `"${i.fields.label}"`).join(', ')})`,
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
          // Docs https://keystatic.com/docs/fields/conditional
          imagePath: fields.conditional(
            fields.checkbox({ label: 'Fallback Social Sharing Image', defaultValue: true }),
            {
              // Docs https://keystatic.com/docs/fields/path-reference
              true: fields.pathReference({
                label: 'Fallback Social Sharing Image Path',
                pattern: 'public/**/*',
              }),
              false: fields.image({
                label: 'Social Sharing Image',
              }),
            },
          ),
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
