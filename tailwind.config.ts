/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    screens: {
      xsm: "374px",
    },
    extend: {
      colors: {
        "theme-1": "#D2D4C8",
        "theme-maroon": "#8B2635",
        "theme-3": "#E0E2DB",
        "theme-4": "#2E3532",
        "theme-5": "#D3EFBD",
        "theme-blue": "#050A30",
        "theme-gray": "#E0E2DB",
        "theme-gold": "#FAA916",
        "theme-lavender": "#DAE0F2",
        "theme-white": "#EAEAEA",
      },
      backgroundImage: {
        "home-bg": "url('/src/assets/home-bg.svg')",
        "home-bg-vert": "/url('src/assets/home-bg-vert.svg')",
        "login-bg": "url('/src/assets/login-bg.svg')",
        "user-profile-bg": "url('/src/assets/user-profile-bg.png')",
        "course-bg": "url('/src/assets/course-bg.svg')",
      },
    },
    fontFamily: {
      garet: ["garet"],
      garetheavy: ["garet-heavy"],
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
    darkTheme: "light",
  },
};
