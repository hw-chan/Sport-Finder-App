export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        mobileBackground: 'url("./assets/mobilebg.jpg")',
        tabletBackground: 'url("./assets/tabletbg.jpg")'
      },
    },
    screens: {
      tablet: "640px",
      desktop: "1024px",
      largeDesktop: "1366px"
    },
    fontFamily: {
      lalezar: ["Lalezar", "sans-serif"],
    },
  },
  plugins: [],
};
