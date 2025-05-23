const { getReactNavigationScreensConfig } = require('expo-router/build/getReactNavigationConfig');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./component/**/*.{ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2A68F1'
        },
        success: {
          DEFAULT: '#439A4C'
        },
        danger: {
          DEFAULT: '#FF4F4F'
        },
        sundhar:{
          DEFAULT: '#464647'
        }
      },
    },
  },
  plugins: [],
};
