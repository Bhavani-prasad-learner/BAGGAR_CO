import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      // 1. ADDED BACKGROUND IMAGES HERE
      backgroundImage: {
'brand-mesh': 'radial-gradient(circle at 50% 0%, var(--brand-second-green-3) 30%, transparent 75%), linear-gradient(to bottom, var(--brand-second-green-1) 0%, var(--brand-second-green-2) 100%)',
  'brand-mesh-premium': 'radial-gradient(circle at 20% 20%, var(--brand-green-3) 20%, transparent 50%), linear-gradient(115deg, var(--brand-green-1) 0%, var(--brand-green-2) 100%)',
  // 2. Added Bagarra Noise: Reference to your root variable for the felt/grain texture
  'bagarra-noise': 'var(--bagaara-noise)',

  // 3. Keep your gold text gradient for your headings
  'brand-gold-text': 'linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c)',
  'brand-gold-metallic': 'linear-gradient(to right, var(--brand-gold-mid), var(--brand-gold-shine), var(--brand-gold-base), var(--brand-gold-light), var(--brand-gold-deep))',
		
      },
      // 2. MERGED ALL COLORS INTO ONE BLOCK
      colors: {
        
        
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        restaurant: {
          primary: '#FF4500',
          secondary: '#2D2D2D',
          accent: '#FFA500',
          light: '#FFF6E9',
          dark: '#1A1A1A'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        warness: ['Warnes', 'cursive'],
        sans: ['Inter', 'sans-serif'],
        quin: ['Quintessential', 'serif'],
		    'cinzel': ['Cinzel', 'serif'],
        'lora': ['Lora', 'serif'],
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;