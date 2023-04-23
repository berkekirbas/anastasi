/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        orange: "hsl(26, 100%, 55%)",
        paleorange: "hsl(25, 100%, 94%)",
        darkblue: "hsl(220, 13%, 13%)",
        dark_grayish_blue: "hsl(219, 9%, 45%)",
        grayish_blue: "hsl(220, 14%, 75%)",
        lightgrayblue: "hsl(223, 64%, 98%)",
        attribution: "hsl(228, 45%, 44%)",
      },
      fontFamily: {
        body: ["Kumbh Sans"],
      },
      keyframes: {
        slidein: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        zoom: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        slidein: "slidein .08s ease-in-out",
        zoom: "zoom .15s ease-in-out",
      },
      boxShadow: {
        "3xl": "0 0 0 10000px rgba(0,0,0,0.75)",
      },
    },
  },
  plugins: [],
};
