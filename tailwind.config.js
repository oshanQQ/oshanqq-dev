module.exports = {
  mode: "jit",
  content: ["./components/**/*.tsx", "./pages/**/*.tsx"],
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      paperMod: [
        "segoe ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Roboto",
        "Oxygen",
        "Ubuntu",
        "Cantarell",
        "open sans",
        "helvetica neue",
        "sans-serif",
      ],
    },
  },
  plugins: [],
};
