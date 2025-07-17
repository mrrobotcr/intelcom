/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'primary': {
          black: '#0A0A0A',
          red: '#DC2626',
          silver: '#6B7280', // Improved contrast: #71717A → #6B7280
          gold: '#CA8A04', // Improved contrast: #D4AF37 → #CA8A04
          'dark-gray': '#1F2937',
        },
        'accent': {
          'silver-light': '#9CA3AF', // Improved contrast: #A1A1AA → #9CA3AF
          'gold-light': '#D97706', // Improved contrast: #E6C547 → #D97706
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
        serif: ['Montserrat', 'sans-serif'], // Changed from 'display' to 'serif' for consistency
      },
      backgroundImage: {
        'gradient-silver': 'linear-gradient(135deg, #6B7280 0%, #52525B 100%)',
        'gradient-gold': 'linear-gradient(135deg, #CA8A04 0%, #A16207 100%)',
        'gradient-red': 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0A0A0A 0%, #1F2937 100%)',
      },
    },
  },
  plugins: [],
}