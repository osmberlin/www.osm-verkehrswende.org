import NavigationNews from './NavigationNews.astro'
import PageAboutHeader from './page_about/PageAboutHeader.astro'
import PageAboutMenu from './page_about/PageAboutMenu.astro'

export type NavigationProjects = keyof typeof projectToNavigation

// ATTENTION:
// Whenever we add a new project, we need to also add it to
// `src/content/config.ts` which enables adding posts for this project.

export const projectToNavigation = {
  about: {
    label: null,
    header: PageAboutHeader,
    menus: [PageAboutMenu, NavigationNews],
    meta: {
      title: 'OpenStreetMap Verkehrswende',
      description:
        'OSM kann die Verkehrswende begleiten und beschleunigen mit Tagging, Tools und Analysen.',
      imagePath: '/social-sharing.png',
      imageAlt: undefined,
      language: 'de',
    },
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
    meta: {
      title: 'TODO META',
      description: 'TODO META',
      imagePath: '/social-sharing.png',
      imageAlt: '/social-sharing.png',
      language: 'de',
    },
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
    meta: {
      title: 'Parkraum Projekt — OpenStreetMap Verkehrswende',
      description: 'Spezialkarten für Neukölln zum Straßenraum und zur Parkplatzdichte.',
      imagePath: '/social-sharing.png', // TODO
      imageAlt: 'Daten zu Parkplätzen, berechnet auf Basis von OpenStreetMap Daten.',
      language: 'de',
    },
  },
  'bicycle-parking': {
    label: 'Fahrradstellplätze',
    header: { name: 'Fahrradstellplätze', link: '/bicycle-parking' },
    menus: [
      { label: null, items: [{ href: '/bicycle-parking', label: 'Über das Projekt' }] },
      NavigationNews,
    ],
    meta: {
      title: 'TODO META',
      description: 'TODO META',
      imagePath: '/social-sharing.png',
      imageAlt: '/social-sharing.png',
      language: 'de',
    },
  },
  benches: {
    label: 'Bänke',
    header: { name: 'Bänke', link: '/benches' },
    menus: [
      { label: null, items: [{ href: '/benches', label: 'Über das Projekt' }] },
      NavigationNews,
    ],
    meta: {
      title: 'TODO META',
      description: 'TODO META',
      imagePath: '/social-sharing.png',
      imageAlt: '/social-sharing.png',
      language: 'de',
    },
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
    meta: {
      title: 'TODO META',
      description: 'TODO META',
      imagePath: '/social-sharing.png',
      imageAlt: '/social-sharing.png',
      language: 'de',
    },
  },
  unknown: {
    label: null,
    header: PageAboutHeader,
    menus: undefined,
    meta: {
      title: 'OpenStreetMap Verkehrswende',
      description: null,
      imagePath: '/social-sharing.png',
      imageAlt: '/social-sharing.png',
      language: 'de',
    },
  },
}
