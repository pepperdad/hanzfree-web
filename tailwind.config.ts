import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      width: {
        '1/2-12': 'calc(50% - 12px)',
        '1/2-20': 'calc(50% - 20px)',
      },
      minHeight: {
        'screen-230': 'calc(100vh - 230px);',
      },
    },
  },
  plugins: [],
};
export default config;
