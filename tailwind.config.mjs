/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'primary': {
          black: '#0A0A0A',
          red: '#DC2626',
          silver: '#71717A',
          gold: '#D4AF37',
          'dark-gray': '#1F2937',
        },
        'accent': {
          'silver-light': '#A1A1AA',
          'gold-light': '#E6C547',
          'red-dark': '#B91C1C',
        },
        'neutral': {
          white: '#FFFFFF',
          'off-white': '#F9FAFB',
          'gray-light': '#F3F4F6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-silver': 'linear-gradient(135deg, #71717A 0%, #52525B 100%)',
        'gradient-gold': 'linear-gradient(135deg, #D4AF37 0%, #B8941F 100%)',
        'gradient-red': 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0A0A0A 0%, #1F2937 100%)',
      },
    },
  },
  plugins: [],
}