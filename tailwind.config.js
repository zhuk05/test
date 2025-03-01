module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#1a1a1a',
          800: '#2d2d2d',
          700: '#404040',
        },
      },
    },
  },
  plugins: [],
};
