/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light", "dark", "synthwave"],
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography"), require("@tailwindcss/forms")],
}