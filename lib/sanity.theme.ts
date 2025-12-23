import { buildLegacyTheme } from 'sanity'

const props = {
  '--my-white': '#fff',
  '--my-black': '#1d2327', // Warna Sidebar WP
  '--wp-blue': '#2271b1',  // Warna Biru WP
  '--my-red': '#db4437',
  '--my-yellow': '#f4b400',
  '--my-green': '#0f9d58',
}

export const myTheme = buildLegacyTheme({
  /* Base colors */
  '--black': props['--my-black'],
  '--white': props['--my-white'],

  /* Brand */
  '--brand-primary': props['--wp-blue'],
  '--default-button-primary-color': props['--wp-blue'],
  '--default-button-success-color': props['--my-green'],
  '--default-button-warning-color': props['--my-yellow'],
  '--default-button-danger-color': props['--my-red'],

  /* Navbar */
  '--main-navigation-color': props['--my-black'],
  '--main-navigation-color--inverted': props['--my-white'],
})