import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}', // ou conforme seu projeto
    './components/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // back: "hsl(var(--back))",
        // text: "hsl(var(--text))",
        // secondary: 'hsl(var(--secondary))',
        // highlight: 'hsl(var(--hightlight))',
        // correct: "hsl(var(--success))",
        // error: "hsl(var(--error))"
        back: "var(--back)",
        text: "var(--text)",
        secondary: 'var(--secondary)',
        hightlight: 'var(--hightlight)',
        correct: "var(--success)",
        error: "var(--error)"
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
