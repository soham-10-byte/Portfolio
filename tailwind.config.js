/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Direct hex colors for perfect Tailwind alpha/opacity support (e.g. text-c400/90, bg-c800/80)
        c900: '#111715',
        c800: '#1B2420',
        c700: '#29342E',
        c600: '#3D4B42',
        c400: '#B5C4B4',
        c300: '#D0D8CE',
        c100: '#F2F1E9',

        // Shadcn utility variables
        background: '#111715',
        foreground: '#F2F1E9',
        card: {
          DEFAULT: '#1B2420',
          foreground: '#F2F1E9',
        },
        muted: {
          DEFAULT: '#29342E',
          foreground: '#B5C4B4',
        },
        border: '#3D4B42',
        accent: {
          DEFAULT: '#B5C4B4',
          foreground: '#111715',
        },
        primary: {
          DEFAULT: '#F2F1E9',
          foreground: '#111715',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['DM Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'card': '32px',
        'pill': '9999px',
      },
      boxShadow: {
        'mint-glow': '0 14px 36px rgba(0, 0, 0, 0.18)',
        'mint-glow-sm': '0 8px 24px rgba(0, 0, 0, 0.14)',
        'mint-glow-lg': '0 20px 52px rgba(0, 0, 0, 0.2)',
        'mint-circle': '0 0 90px rgba(181, 196, 180, 0.18)',
      },
      lineHeight: {
        'tighter': '0.95',
      },
      letterSpacing: {
        'tightest': '-0.03em',
        'tracked': '0.08em',
      },
    },
  },
  plugins: [],
};
