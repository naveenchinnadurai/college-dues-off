module.exports = {
  content: ["./app/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
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
      },
    },
  },
  plugins: [],
}
