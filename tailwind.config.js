module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    spacing: {
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '24px',
      xxl: '32px',
      xxxl: '50px',
    },
    fontFamily: {
      heading: ['Nunito', 'sans-serif'],
      body: ['Doris', 'sans-serif']
    },
    extend: {
      colors: {
        'vivid-blue': '#1871E8',
        'muted-blue': '#4D81B7'
      },
    },
  },
  plugins: [],
}
