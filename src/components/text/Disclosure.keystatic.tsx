import { fields } from '@keystatic/core'
import { wrapper } from '@keystatic/core/content-components'
import { isValidElement, type ReactNode } from 'react'
import { markdocInlineToPhrasingHtml } from '../../utils/markdocInlinePhrasingHtml'

function reactNodeToPlainText(node: ReactNode) {
  if (node == null || typeof node === 'boolean') return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) {
    const parts: string[] = []
    for (const n of node) {
      parts.push(reactNodeToPlainText(n as ReactNode))
    }
    return parts.filter(Boolean).join(' ')
  }
  if (isValidElement(node)) {
    const ch = (node.props as { children?: ReactNode }).children
    if (ch !== undefined) return reactNodeToPlainText(ch)
  }
  return ''
}

const PREVIEW_BODY_MAX_WORDS = 12

function previewBodyTeaser(plain: string) {
  const w = plain.trim().split(/\s+/).filter(Boolean)
  if (w.length <= PREVIEW_BODY_MAX_WORDS) return w.join(' ')
  return `${w.slice(0, PREVIEW_BODY_MAX_WORDS).join(' ')}…`
}

export const DisclosureKeystatic = wrapper({
  label: 'Disclosure',
  schema: {
    title: fields.text({
      label: 'Title',
      description:
        'Click target "Headline". Manual Markdown. Emphasis: **bold**, *italic* (markdown).',
    }),
    defaultOpen: fields.checkbox({
      label: 'Initially expanded',
      defaultValue: false,
    }),
  },
  ContentView: ({ value, children }) => {
    const titleSrc = typeof value.title === 'string' ? value.title : ''
    const titleHtml = titleSrc.trim() ? markdocInlineToPhrasingHtml(titleSrc) : ''
    const bodyPlain = previewBodyTeaser(reactNodeToPlainText(children))
    return (
      <div className="text-xs leading-snug text-neutral-700">
        {titleHtml ? (
          <span
            className="font-semibold text-neutral-900 [&_em]:italic [&_strong]:font-semibold"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: just markdown we control
            dangerouslySetInnerHTML={{ __html: titleHtml }}
          />
        ) : (
          <span className="font-semibold text-neutral-900">Disclosure</span>
        )}
        {bodyPlain ? <span className="text-neutral-600"> — {bodyPlain}</span> : null}
      </div>
    )
  },
})
