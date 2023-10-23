import NavigationNews from './layouts/Navigation/NavigationNews.astro'
import PageAboutHeader from './layouts/Navigation/page_about/PageAboutHeader.astro'
import PageAboutMenu from './layouts/Navigation/page_about/PageAboutMenu.astro'

export type NavigationProjects = keyof typeof projectConfigs

// ATTENTION:
// Whenever we add a new project, we need to also add it to
// `src/content/config.ts` which enables adding posts for this project.

export const projectConfigs = {
  about: {
    enabled: true,
    name: null,
    root: '/',
    customHeader: PageAboutHeader,
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
  parking: {
    enabled: true,
    name: 'Parkraum',
    root: 'https://parkraum.osm-verkehrswende.org/',
    menus: undefined,
    meta: undefined,
    // menus: [
    //   {
    //     label: null,
    //     items: [
    //       { href: '/parking/', label: 'Über das Projekt' },
    //       { href: '/parking/project-prototype-neukoelln/report/', label: 'Methodenbericht' },
    //       { href: '/parking/participate/', label: 'Mitmachen' },
    //       { href: '/parking/faq/', label: 'FAQ' },
    //     ],
    //   },
    //   NavigationNews,
    // ],
    // meta: {
    //   title: 'Parkraum Projekt — OpenStreetMap Verkehrswende',
    //   description: 'Spezialkarten für Neukölln zum Straßenraum und zur Parkplatzdichte.',
    //   imagePath: '/social-sharing.png', // TODO
    //   imageAlt: 'Daten zu Parkplätzen, berechnet auf Basis von OpenStreetMap Daten.',
    //   language: 'de',
    // },
  },
  'bicycle-parking': {
    enabled: true,
    name: 'Fahrradstellplätze',
    root: '/bicycle-parking',
    menus: [
      {
        label: null,
        items: [
          { href: '/bicycle-parking/', label: 'Über das Projekt' },
          { href: 'https://bikeparking.lorenz.lu/missingmap/Berlin/', label: 'Datenabgleich' },
          { href: 'https://bikeparking.lorenz.lu/parkingmap/', label: 'Karte' },
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
  benches: {
    enabled: false,
    name: 'Bänke',
    root: '/benches',
    menus: [
      { label: null, items: [{ href: '/benches/', label: 'Über das Projekt' }] },
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
  bikeindex: {
    enabled: false,
    name: 'BikeIndex',
    root: '/bikeindex',
    menus: [
      {
        label: null,
        items: [
          { href: '/bikeindex/', label: 'Über das Projekt' },
          { href: '/bikeindex/participate/', label: 'Mitmachen' },
        ],
      },
      {
        label: 'Datensätze',
        items: [
          { href: '/bikeindex/data/category/', label: 'Führungsform' },
          { href: '/bikeindex/data/width/', label: 'Breite' },
          { href: '/bikeindex/data/surfacequality/', label: 'Oberfläche' },
          { href: '/bikeindex/data/separation/', label: 'Schutz' },
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
  mapillary: {
    enabled: true,
    name: 'Mapillary Missing Streets',
    root: '/mapillary',
    menus: [
      {
        label: true,
        items: [
          { href: '/mapillary/', label: 'Über das Projekt' },
          { href: '/mapillary/map/', label: 'Karte' },
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
    enabled: false,
    name: null,
    root: '/',
    customHeader: PageAboutHeader,
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
