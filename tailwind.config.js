/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FACEBC',
        background: '#E2DED4',
        sidebarBackground: '#F9F8F6',
        anotherColor: '#F9E9E2',
        active: '#D3F0E2',
        inactive: '#F9E9E2',
        cardRose: '#F9EBE5',
        cardBackground: '#F8F7F6',
        normalRose: '#FCE6DD',
        beigeFirst: '#F8F7F4',
        beigeSelected: '#F6EDEA',
        whiteBrown: '#EAE7DF',
        beigeBorder: '#DED6D3',
        greenPastel: '#E4F2EB',
        beigeTransparent: '#F1F0ED',
        blackStat: '#413F3B',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['cupcake'],
  },
}
