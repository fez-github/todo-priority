/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,svelte}"],
  theme: {
    extend: {},
  },
  plugins: ["prettier-plugin-tailwindcss"],
  corePlugins: {
    preflight: false,
  },
};
