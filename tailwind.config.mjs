/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['articulat-cf', 'sans-serif'], // Custom font for body
        heading: ['Rajdhani', 'serif'], // Custom font for headings
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        },
        flamingo: {
          50: '#ffe8de',
          100: '#ffc2b0',
          200: '#ff9c7e',
          300: '#ff754c',
          400: '#ff4f1a',
          500: '#e63500',
          600: '#b42800',
          700: '#811c00',
          800: '#4f0f00',
          900: '#210200',
        }
      },
      transitionTimingFunction: {
        'in-quad': 'cubic-bezier(.55, .085, .68, .53)',
        'in-cubic': 'cubic-bezier(.550, .055, .675, .19)',
        'in-quart': 'cubic-bezier(.895, .03, .685, .22)',
        'in-quint': 'cubic-bezier(.755, .05, .855, .06)',
        'in-expo': 'cubic-bezier(.95, .05, .795, .035)',
        'in-circ': 'cubic-bezier(.6, .04, .98, .335)',
        
        'out-quad': 'cubic-bezier(.25, .46, .45, .94)',
        'out-cubic': 'cubic-bezier(.215, .61, .355, 1)',
        'out-quart': 'cubic-bezier(.165, .84, .44, 1)',
        'out-quint': 'cubic-bezier(.23, 1, .32, 1)',
        'out-expo': 'cubic-bezier(.19, 1, .22, 1)',
        'out-circ': 'cubic-bezier(.075, .82, .165, 1)',
        
        'in-out-quad': 'cubic-bezier(.455, .03, .515, .955)',
        'in-out-cubic': 'cubic-bezier(.645, .045, .355, 1)',
        'in-out-quart': 'cubic-bezier(.77, 0, .175, 1)',
        'in-out-quint': 'cubic-bezier(.86, 0, .07, 1)',
        'in-out-expo': 'cubic-bezier(1, 0, 0, 1)',
        'in-out-circ': 'cubic-bezier(.785, .135, .15, .86)',
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
}
