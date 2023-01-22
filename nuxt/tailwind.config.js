/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      colors: {
        primary: { DEFAULT: '#FFC800', dark: '#67540a' , light : "#f7de85" },
        tm: {
          black: '#232E3B',
          gray: { extlight: '#c3c3c3' , ligth: '#AFAFAE', dark: '#3F3F3F' },
        },
      },
      fontFamily: {
        yekan: 'Yekan Bakh',
        lato:['Lato' ,  'sans-serif']
      },
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--gradient-color-stops))',
        }
      
    },
  },
  plugins: [],
}
