export const languages = ['en', 'de'] as const

export type LayoutLanguage = keyof typeof languages
