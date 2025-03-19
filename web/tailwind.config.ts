import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					"1": "hsl(var(--chart-1))",
					"2": "hsl(var(--chart-2))",
					"3": "hsl(var(--chart-3))",
					"4": "hsl(var(--chart-4))",
					"5": "hsl(var(--chart-5))",
				},
				sidebar: {
					DEFAULT: "hsl(var(--sidebar-background))",
					foreground: "hsl(var(--sidebar-foreground))",
					primary: "hsl(var(--sidebar-primary))",
					"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
					accent: "hsl(var(--sidebar-accent))",
					"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
					border: "hsl(var(--sidebar-border))",
					ring: "hsl(var(--sidebar-ring))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				wiggle: {
					"0%, 100%": { transform: "rotate(0deg)" },
					"25%": { transform: "rotate(8deg)" },
					"50%": { transform: "rotate(-8deg)" },
					"75%": { transform: "rotate(8deg)" },
				},
				"float-random": {
					"0%": { transform: "translate(0px, 0px) rotate(0deg)" },
					"20%": { transform: "translate(-20px, 15px) rotate(40deg)" },
					"40%": { transform: "translate(20px, -10px) rotate(-20deg)" },
					"60%": { transform: "translate(-15px, -20px) rotate(10deg)" },
					"80%": { transform: "translate(15px, 10px) rotate(-40deg)" },
					"100%": { transform: "translate(0px, 0px) rotate(0deg)" },
				},
				"fade-in": {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				"slide-in": {
					"0%": { opacity: "0", transform: "translateX(-10px)" },
					"100%": { opacity: "1", transform: "translateX(0)" },
				},
				"slide-up": {
					"0%": { opacity: "0", transform: "translateY(20px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				"spin-reverse": {
					"0%": { transform: "rotate(0deg)" },
					"100%": { transform: "rotate(-360deg)" },
				},
				"bounce-delayed": {
					"0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
					"40%": { transform: "translateY(-8px)" },
					"60%": { transform: "translateY(-4px)" },
				},
				loading: {
					"0%": { width: "0%" },
					"50%": { width: "60%" },
					"75%": { width: "75%" },
					"90%": { width: "90%" },
					"100%": { width: "100%" },
				},
				blink: {
					"0%, 100%": { opacity: "1" },
					"50%": { opacity: "0" },
				},
				glitch: {
					"0%": { transform: "translate(0)" },
					"20%": { transform: "translate(-3px, 3px)" },
					"40%": { transform: "translate(-3px, -3px)" },
					"60%": { transform: "translate(3px, 3px)" },
					"80%": { transform: "translate(3px, -3px)" },
					"100%": { transform: "translate(0)" },
				},
				scanline: {
					"0%": { transform: "translateY(0%)" },
					"100%": { transform: "translateY(100%)" },
				},
				pixelate: {
					"0%": { filter: "brightness(1)" },
					"50%": { filter: "brightness(1.2)" },
					"100%": { filter: "brightness(1)" },
				},
			},
			animation: {
				wiggle: "wiggle 0.5s ease-in-out",
				"float-random": "float-random 20s ease-in-out infinite",
				"fade-in": "fade-in 0.5s ease-out forwards",
				"slide-in": "slide-in 0.5s ease-out forwards",
				"slide-up": "slide-up 0.5s ease-out forwards",
				"spin-slow": "spin 3s linear infinite",
				"spin-reverse": "spin-reverse 3s linear infinite",
				"bounce-delay-1": "bounce-delayed 1s ease-in-out infinite",
				"bounce-delay-2": "bounce-delayed 1s ease-in-out 0.2s infinite",
				"bounce-delay-3": "bounce-delayed 1s ease-in-out 0.4s infinite",
				blink: "blink 1s steps(1) infinite",
				glitch: "glitch 0.35s ease-in-out alternate infinite",
				scanline: "scanline 8s linear infinite",
				pixelate: "pixelate 2s ease-in-out infinite",
			},
			fontFamily: {
				pixel: ["VT323", "monospace"],
				retro: ["Chakra Petch", "sans-serif"],
				arcade: ["Press Start 2P", "cursive"],
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
