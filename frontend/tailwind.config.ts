import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--color-background))",
        foreground: "hsl(var(--color-foreground))",
        card: "hsl(var(--color-card))",
        "card-foreground": "hsl(var(--color-card-foreground))",
        popover: "hsl(var(--color-popover))",
        "popover-foreground": "hsl(var(--color-popover-foreground))",
        primary: "hsl(var(--color-primary))",
        "primary-foreground": "hsl(var(--color-primary-foreground))",
        secondary: "hsl(var(--color-secondary))",
        "secondary-foreground": "hsl(var(--color-secondary-foreground))",
        muted: "hsl(var(--color-muted))",
        "muted-foreground": "hsl(var(--color-muted-foreground))",
        accent: "hsl(var(--color-accent))",
        "accent-foreground": "hsl(var(--color-accent-foreground))",
        destructive: "hsl(var(--color-destructive))",
        "destructive-foreground": "hsl(var(--color-destructive-foreground))",
        border: "hsl(var(--color-border))",
        input: "hsl(var(--color-input))",
        ring: "hsl(var(--color-ring))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        orbitron: ["var(--font-orbitron)", "monospace"],
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config