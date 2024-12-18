/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}', // Pastikan jalur ini benar
  ],
  theme: {
    extend: {
      colors:{
        "ikasda-primary": "#00668A",
        "ikasda-secondary": "#004E71"
      }
    },
    fontFamily:{
      Roboto:["Roboto", "sans-serif"]
    },
    container:{
      padding:"2rem"
    }
  },
  plugins: [],
}

