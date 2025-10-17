import { fields } from '@keystatic/core'
import { block } from '@keystatic/core/content-components'

export const keystaticButtonConfig = block({
  label: 'Button',
  schema: {
    label: fields.text({ label: 'Label', validation: { isRequired: true } }),
    href: fields.url({ label: 'URL', validation: { isRequired: true } }),
    newWindow: fields.checkbox({
      label: 'In neuem Fenster öffnen',
      defaultValue: true,
    }),
  },
  ContentView: (props) => {
    return (
      <a href={props.value.href!} target={props.value.newWindow ? '_blank' : '_self'}>
        {props.value.label} ({props.value.href}){' '}
        {props.value.newWindow ? '(neues Fenster)' : '(gleiches Fenster)'}
      </a>
    )
  },
})
