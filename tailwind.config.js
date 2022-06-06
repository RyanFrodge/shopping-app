module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    spacing: {
      sm: '8px',
      smd: "10px",
      md: '12px',
      lg: '16px',
      xl: '24px',
      xxl: '32px',
      xxxl: '50px',
    },
    fontFamily: {
      heading: ['Dosis', 'sans-serif'],
      sans: ['Nunito', 'sans-serif']
    },
    extend: {
      colors: {
        'vivid-blue': '#1871E8',
        'muted-blue': '#4D81B7',
        'blue-gray' : '#5C6269'
      },
    },
  },
  plugins: [],
}
