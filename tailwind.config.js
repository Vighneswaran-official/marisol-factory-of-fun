/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          50: '#FAF7F0',
          100: '#F5EFE6',
          200: '#E8DFD1',
          300: '#D7C4B0',
        },
        ink: {
          light: '#5C544E',
          DEFAULT: '#2C2825',
          dark: '#1A1816',
        },
        plum: {
          500: '#6B4670',
          600: '#4D3152',
          700: '#3D2C40',
        },
        coral: {
          400: '#FF8787',
          500: '#FF6B6B',
          600: '#FA5252',
        },
        doodleGold: '#F59E0B',
        doodleTeal: '#14B8A6',
        doodlePink: '#F472B6',
      },
      fontFamily: {
        hand: ['"Patrick Hand"', '"Kalam"', '"Caveat"', 'cursive'],
        display: ['"Outfit"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'sketch': '3px 3px 0px 0px #2C2825',
        'sketch-lg': '5px 5px 0px 0px #2C2825',
        'sketch-xl': '8px 8px 0px 0px #2C2825',
        'paper': '0 4px 20px -2px rgba(61, 44, 64, 0.08)',
      },
      borderRadius: {
        'sketch': '255px 15px 225px 15px/15px 225px 15px 255px',
        'card': '1.25rem',
      },
      keyframes: {
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(-3%)' },
          '50%': { transform: 'translateY(0)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        }
      },
      animation: {
        'bounce-gentle': 'bounceGentle 3s ease-in-out infinite',
        'wiggle': 'wiggle 2s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
