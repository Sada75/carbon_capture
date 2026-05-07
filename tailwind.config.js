/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        carbon: {
          950: '#030712',
          900: '#07111f',
          800: '#0d1c2c',
          700: '#123247',
        },
        climate: {
          cyan: '#34d5ff',
          blue: '#4f7dff',
          mint: '#5dffc7',
          green: '#47d16c',
          lime: '#d5ff6a',
        },
      },
      boxShadow: {
        glow: '0 0 44px rgba(52, 213, 255, 0.28)',
        mint: '0 0 44px rgba(93, 255, 199, 0.22)',
      },
      backgroundImage: {
        'radial-grid':
          'radial-gradient(circle at 20% 20%, rgba(52,213,255,.18), transparent 28%), radial-gradient(circle at 78% 18%, rgba(71,209,108,.16), transparent 26%), linear-gradient(135deg, #030712 0%, #07111f 42%, #091f2b 100%)',
      },
    },
  },
  plugins: [],
};
