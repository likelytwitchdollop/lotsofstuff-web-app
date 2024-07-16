import type { Config } from 'tailwindcss'
const defaultTheme = require('tailwindcss/defaultTheme')

import Colors from './src/utils/constants/Colors'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        '3xs': '320px',
        '2xs': '375px',
        xs: '425px',
      },
      fontFamily: {
        sans: ['var(--font-jost)', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'gray-100': Colors['gray-100'],
        'gray-200': Colors['gray-200'],
        'gray-300': Colors['gray-300'],
        backdrop: 'rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}
export default config
