module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'shadowBox': '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
        'shadowBoxHover': '0 10px 10px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22)',
        'countdownBarShadowBox': '0 1px 5px #000, 0 1px 0 #444',
      }
    },
  },
  plugins: [],
}