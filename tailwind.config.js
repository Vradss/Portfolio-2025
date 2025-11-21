/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // Breakpoints responsive optimizados
      screens: {
        'xs': '320px',   // Mobile pequeño
        'sm': '640px',   // Mobile grande
        'md': '768px',   // Tablet
        'lg': '1024px',  // Laptop
        'xl': '1280px',  // Desktop
        '2xl': '1536px', // Desktop grande
        '3xl': '1920px', // Full HD
      },
      // Espaciado responsive
      spacing: {
        'xs': 'clamp(0.5rem, 2vw, 1rem)',
        'sm': 'clamp(1rem, 3vw, 1.5rem)',
        'md': 'clamp(1.5rem, 4vw, 2rem)',
        'lg': 'clamp(2rem, 5vw, 3rem)',
        'xl': 'clamp(3rem, 6vw, 4rem)',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      // Tipografía responsive
      fontSize: {
        'xs': ['clamp(0.75rem, 2vw, 0.875rem)', { lineHeight: '1.5' }],
        'sm': ['clamp(0.875rem, 2.5vw, 1rem)', { lineHeight: '1.5' }],
        'base': ['clamp(1rem, 3vw, 1.125rem)', { lineHeight: '1.6' }],
        'lg': ['clamp(1.125rem, 3.5vw, 1.25rem)', { lineHeight: '1.6' }],
        'xl': ['clamp(1.25rem, 4vw, 1.5rem)', { lineHeight: '1.5' }],
        '2xl': ['clamp(1.5rem, 5vw, 2rem)', { lineHeight: '1.4' }],
        '3xl': ['clamp(2rem, 6vw, 2.5rem)', { lineHeight: '1.3' }],
        '4xl': ['clamp(2.5rem, 7vw, 3rem)', { lineHeight: '1.2' }],
        '5xl': ['clamp(3rem, 8vw, 4rem)', { lineHeight: '1.1' }],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
