import NavigationNews from './NavigationNews.astro'
import AboutHeader from './menu/AboutHeader.astro'
import AboutMenu from './menu/AboutMenu.astro'
import BenchesHeader from './menu/BenchesHeader.astro'
import BenchesMenu from './menu/BenchesMenu.astro'
import BicycleParkingHeader from './menu/BicycleParkingHeader.astro'
import BicycleParkingMenu from './menu/BicycleParkingMenu.astro'
import BikeindexData from './menu/BikeindexData.astro'
import BikeindexHeader from './menu/BikeindexHeader.astro'
import BikeindexMenu from './menu/BikeindexMenu.astro'
import ParkingHeader from './menu/ParkingHeader.astro'
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
  about: { label: null, header: AboutHeader, menu: [AboutMenu, NavigationNews] },
  bikeindex: {
    label: 'BikeIndex',
    header: BikeindexHeader,
    menu: [BikeindexMenu, BikeindexData, NavigationNews],
  },
  parking: { label: 'Parkraum', header: ParkingHeader, menu: [ParkingMenu, NavigationNews] },
  'bicycle-parking': {
    label: 'Fahrradstellplätze',
    header: BicycleParkingHeader,
    menu: [BicycleParkingMenu, NavigationNews],
  },
  benches: { label: 'Bänke', header: BenchesHeader, menu: [BenchesMenu, NavigationNews] },
  unknown: { label: null, header: AboutHeader, menu: undefined },
}
