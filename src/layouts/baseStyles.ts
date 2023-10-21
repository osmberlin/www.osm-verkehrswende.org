import { twJoin } from 'tailwind-merge'

export const menuActiveClasses =
  'border-teal-600 bg-emerald-50 hover:bg-emerald-50 cursor-text font-semibold'

export const proseBase = twJoin(
  'prose prose-blue',
  '[--tw - prose - bullets: _gray]',
  'prose-code:rounded prose-code:bg-neutral-100 prose-code:box-decoration-clone prose-code:py-1 prose-code:px-1.5 prose-code:text-neutral-800 prose-code:before:content-none prose-code:after:content-none',
)

export const proseSection = twJoin(
  proseBase,
  'prose-lg mb-20 prose-headings:text-sky-700 prose-headings:mb-1',
)
