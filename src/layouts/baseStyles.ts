import { twJoin } from 'tailwind-merge'

export const menuActiveClasses =
  'border-teal-600 bg-emerald-50 hover:bg-emerald-50 cursor-text font-semibold'

export const proseBase = twJoin(
  'prose prose-blue',
  // <ul>
  '[--tw-prose-bullets:_gray]',
  // <code>
  'prose-code:rounded prose-code:bg-neutral-100 prose-code:box-decoration-clone prose-code:py-1 prose-code:px-1.5 prose-code:text-neutral-800 prose-code:before:content-none prose-code:after:content-none',
  // <blockquote>
  'prose-blockquote:bg-gray-100 prose-blockquote:p-4 prose-blockquote:pb-2',
)

export const proseHeadings = twJoin(
  // <h#> anchor position
  'prose-headings:scroll-mt-10',
  // <h1>
  'prose-h1:text-sky-700 prose-h1:mt-16 prose-h1:mb-3 first:prose-h1:mt-0',
  // <h2>
  'prose-h2:mt-16 prose-h2:mb-4',
  // <h3>
  'prose-h3:mt-8 prose-h3:mb-4',
)
