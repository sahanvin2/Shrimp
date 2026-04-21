/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}', './lib/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        shrimp: {
          50: '#FFF0F0',
          100: '#FFD6D6',
          400: '#FF6B6B',
          500: '#FF4444',
          600: '#E63030',
          900: '#1A0000',
        },
        purple: {
          400: '#A78BFA',
          500: '#7C3AED',
          600: '#6D28D9',
        },
        surface: {
          DEFAULT: '#141418',
          raised: '#1E1E24',
          overlay: '#28282F',
          border: '#2E2E36',
        },
        bg: { DEFAULT: '#0A0A0F' },
        text: { primary: '#F0F0F5', secondary: '#9999AA', muted: '#55555F' },
      },
      fontFamily: {
        sans: ['Inter Variable', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.35s ease forwards',
        'slide-in': 'slideIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'pulse-ring': 'pulseRing 1.4s ease infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-8px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseRing: {
          '0%': { boxShadow: '0 0 0 0 rgba(255,107,107,0.4)' },
          '70%': { boxShadow: '0 0 0 12px rgba(255,107,107,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(255,107,107,0)' },
        },
      },
    },
  },
  plugins: [],
};
