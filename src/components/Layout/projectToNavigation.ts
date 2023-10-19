import NavigationNews from './NavigationNews.astro'
import AboutHeader from './menu/AboutHeader.astro'
import AboutMenu from './menu/AboutMenu.astro'
import BenchesMenu from './menu/BenchesMenu.astro'
import BicycleParkingMenu from './menu/BicycleParkingMenu.astro'
import BikeindexData from './menu/BikeindexData.astro'
import BikeindexMenu from './menu/BikeindexMenu.astro'
import ParkingMenu from './menu/ParkingMenu.astro'

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
    menu: [BikeindexMenu, BikeindexData, NavigationNews],
    header: { name: 'Bikeindex Project', link: '/bikeindex' },
  },
  parking: { label: 'Parkraum', header: ParkingHeader, menu: [ParkingMenu, NavigationNews] },
  'bicycle-parking': {
    label: 'Fahrradstellplätze',
    menu: [BicycleParkingMenu, NavigationNews],
    header: { name: 'Fahrradstellplätze', link: '/bicycle-parking' },
  benches: {
    label: 'Bänke',
    header: { name: 'Bänke', link: '/benches' },
    menu: [BenchesMenu, NavigationNews],
  },
  },
  unknown: { label: null, header: AboutHeader, menu: undefined },
}
