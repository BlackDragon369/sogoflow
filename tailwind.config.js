/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        soil: {
          light: "#8D6E63",
          DEFAULT: "#5D4037",
          dark: "#3E2723",
        },
        cream: {
          DEFAULT: "#FFF8E7",
          deep: "#F5EDD6",
        },
        plant: {
          light: "#A5D6A7",
          DEFAULT: "#66BB6A",
          dark: "#388E3C",
        },
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', 'serif'],
        sans: ['"Noto Sans SC"', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'soft': '0 8px 32px rgba(93, 64, 55, 0.08)',
        'hover': '0 12px 40px rgba(93, 64, 55, 0.14)',
      },
    },
  },
  plugins: [],
};
