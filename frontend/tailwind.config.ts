import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#00f2ff',
                    dark: '#00B8D9',
                    light: '#33E0FF',
                },
                background: {
                    DEFAULT: '#0d1117',
                    secondary: '#161b22',
                    tertiary: '#1c2128',
                    card: '#21262d',
                },
                accent: {
                    cyan: '#00f2ff',
                    red: '#ff4757',
                    purple: '#A855F7',
                },
                border: {
                    DEFAULT: 'rgba(255, 255, 255, 0.1)',
                    bright: 'rgba(0, 242, 255, 0.3)',
                }
            },
            fontFamily: {
                mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'monospace'],
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-in-out',
                'slide-up': 'slideUp 0.3s ease-out',
                'slide-down': 'slideDown 0.3s ease-out',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
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
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
            boxShadow: {
                'neon': '0 0 15px rgba(0, 242, 255, 0.3)',
                'neon-strong': '0 0 30px rgba(0, 242, 255, 0.5)',
            }
        },
    },
    plugins: [],
};

export default config;
