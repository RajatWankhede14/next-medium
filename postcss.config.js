module.exports = {
  plugins: {
    tailwindcss: {
      content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
        "./index.html",
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    },
    autoprefixer: {},
  },
};
