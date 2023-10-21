import NavigationNews from './NavigationNews.astro'
import AboutHeader from './menu/AboutHeader.astro'
import AboutMenu from './menu/AboutMenu.astro'

export type NavigationProjects = keyof typeof projectToNavigation

// This dupliation is required to get `src/content/config.ts` going
export const navigationProjects = [
  'about',
  'benches',
  'bicycle-parking',
  'bikeindex',
  'mapillary',
  'parking',
  'unkown',
] as const

export const projectToNavigation = {
  about: {
    label: null,
    header: AboutHeader,
    menus: [AboutMenu, NavigationNews],
  },
  bikeindex: {
    label: 'BikeIndex',
    header: { name: 'Bikeindex Project', link: '/bikeindex' },
    menus: [
      {
        label: null,
        items: [
          { href: '/bikeindex', label: 'Über das Projekt' },
          { href: '/bikeindex/participate', label: 'Mitmachen' },
        ],
      },
      {
        label: 'Datensätze',
        items: [
          { href: '/bikeindex/data/category', label: 'Führungsform' },
          { href: '/bikeindex/data/width', label: 'Breite' },
          { href: '/bikeindex/data/surfacequality', label: 'Oberfläche' },
          { href: '/bikeindex/data/separation', label: 'Schutz' },
        ],
      },
      NavigationNews,
    ],
  },
  parking: {
    label: 'Parkraum',
    header: { name: 'Parkraumanalyse', link: '/parking' },
    menus: [
      {
        label: null,
        items: [
          { href: '/parking', label: 'Über das Projekt' },
          { href: '/parking/project-prototype-neukoelln/report', label: 'Methodenbericht' },
          { href: '/parking/participate', label: 'Mitmachen' },
          { href: '/parking/faq', label: 'FAQ' },
        ],
      },
      NavigationNews,
    ],
  },
  'bicycle-parking': {
    label: 'Fahrradstellplätze',
    header: { name: 'Fahrradstellplätze', link: '/bicycle-parking' },
    menus: [
      { label: null, items: [{ href: '/bicycle-parking', label: 'Über das Projekt' }] },
      NavigationNews,
    ],
  },
  benches: {
    label: 'Bänke',
    header: { name: 'Bänke', link: '/benches' },
    menus: [
      { label: null, items: [{ href: '/benches', label: 'Über das Projekt' }] },
      NavigationNews,
    ],
  },
  mapillary: {
    label: 'Mapillary',
    header: { name: 'Mapillary Missing Streets', link: '/mapillary' },
    menus: [
      {
        label: null,
        items: [
          { href: '/mapillary', label: 'Über das Projekt' },
          { href: '/mapillary/map', label: 'Karte' },
        ],
      },
      NavigationNews,
    ],
  },
  unknown: {
    label: null,
    header: AboutHeader,
    menus: undefined,
  },
}
