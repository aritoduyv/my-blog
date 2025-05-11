/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Atlassian Sans"', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#0052CC',
          light: '#4C9AFF',
          dark: '#0747A6',
        },
        secondary: {
          DEFAULT: '#6554C0',
          light: '#8777D9',
          dark: '#403294',
        },
        accent: {
          DEFAULT: '#00B8D9',
          light: '#79E2F2',
          dark: '#008DA6',
        },
        neutral: {
          50: '#F4F5F7',
          100: '#EBECF0',
          200: '#DFE1E6',
          300: '#C1C7D0',
          400: '#A5ADBA',
          500: '#8993A4',
          600: '#6B778C',
          700: '#505F79',
          800: '#344563',
          900: '#172B4D',
        },
        success: {
          DEFAULT: '#36B37E',
          light: '#57D9A3',
          dark: '#006644',
        },
        warning: {
          DEFAULT: '#FFAB00',
          light: '#FFE380',
          dark: '#FF8B00',
        },
        error: {
          DEFAULT: '#FF5630',
          light: '#FF8F73',
          dark: '#DE350B',
        },
      },
      spacing: {
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
      },
      borderRadius: {
        'sm': '3px',
        'md': '4px', 
        'lg': '8px',
        'xl': '12px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.neutral.900'),
            a: {
              color: theme('colors.primary.DEFAULT'),
              '&:hover': {
                color: theme('colors.primary.light'),
              },
            },
            h1: {
              color: theme('colors.neutral.900'),
              fontWeight: '600',
            },
            h2: {
              color: theme('colors.neutral.900'),
              fontWeight: '600',
            },
            h3: {
              color: theme('colors.neutral.900'),
              fontWeight: '600',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
};