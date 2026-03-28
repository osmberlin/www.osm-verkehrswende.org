import type { Config, Node } from '@markdoc/markdoc'
import Markdoc from '@markdoc/markdoc'

const { nodes } = Markdoc

/**
 * Default Markdoc HTML uses `<article>` / `<p>`. For phrasing-only contexts (`<summary>`, etc.)
 * we omit those wrappers (falsy `render` = emit children only).
 */
const markdocConfigForPhrasingHtml = {
  nodes: {
    document: { ...nodes.document, render: '' },
    paragraph: {
      ...nodes.paragraph,
      render: '',
      transform(node: Node, config: Config) {
        const children = node.transformChildren(config)
        const ch = Array.isArray(children) ? children.flat() : [children]
        return [...ch, ' ']
      },
    },
  },
} satisfies { nodes: Config['nodes'] }

/**
 * Inline Markdoc/Markdown-style source (`**strong**`, `*em*`, `~~strike~~`, …) → phrasing HTML
 * (no block wrappers). Empty/whitespace → `''`. Throws if non-empty source fails to parse/render.
 */
export function markdocInlineToPhrasingHtml(source: string) {
  const trimmed = source?.trim() ?? ''
  if (!trimmed) return ''
  const ast = Markdoc.parse(trimmed)
  const transformed = Markdoc.transform(ast, markdocConfigForPhrasingHtml)
  return Markdoc.renderers.html(transformed).replace(/\s+/g, ' ').trim()
}
