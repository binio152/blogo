/** @type {import('tailwindcss').Config} */
module.exports = {
  // Disable dark mode completely
  darkMode: "class", // We use 'class' but never apply the dark class
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        primary: {
          DEFAULT: "#65BBDF",
          light: "#DBF3FF",
          dark: "#4A9FC9",
        },
        // Force light mode colors
        background: "#ffffff",
        foreground: "#171717",
      },
      fontFamily: {
        outfit: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
