import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './shared/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#000',
        gray: {
          50: '#f5f5f5',
          75: '#ececec',
          100: '#808080',
          200: '#333333b3',
        },
        primary: {
          100: '#007aff',
          200: '#0274ee',
        },
        error: '#ef4444',
      },
      width: {
        auth: '320px',
        modal: '460px',
      },
      maxWidth: {
        container: '1200px',
      },
      maxHeight: {
        modal: '800px',
      },
    },
  },
  plugins: [],
} satisfies Config;
