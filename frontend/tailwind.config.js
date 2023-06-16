/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '480px',
      md: '900px',
      // md: '768px',
      lg: '976px',
      xl: '1440px',
      xxl: '1536px',
    },
    extend: {
      colors: {
        primary: {
          main: '#339AA5',
          surface: '#D6EBED',
          border: '#BBDDE1',
          hover: '#2A8089',
          focus: '#339aa533',
          pressed: '#194D52',
        },
        red: {
          main: '#CB3A31',
          surface: '#FFF4F2',
          border: '#EEB4B0',
          hover: '#BD251C',
          focus: 'rgba(203, 58, 49, 0.20)',
          pressed: '#731912',
        },
        yellow: {
          main: '#CD7B2E',
          surface: '#FFF9F2',
          border: '#EECEB0',
          hover: '#BF6919',
          focus: 'rgba(205, 123, 46, 0.20)',
          pressed: '#734011',
        },
        dark: {
          main: '#1a1a1a',
          shadow: '#0f0f0f',
          surface: '#373737'
        },
        grey: {
          100: "#FFFFFF",
          200: "#F5F5F5",
          300: "#EDEDED",
          400: "#E0E0E0",
          500: "#C2C2C2",
          600: "#9E9E9E",
          700: "#757575",
          800: "#616161",
          900: "#404040",
          1000: "#0A0A0A",
        }
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
  important: true,
}