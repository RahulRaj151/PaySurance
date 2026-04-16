module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#0a0a0a',
          100: '#1a1a1a',
          200: '#2a2a2a',
          300: '#3a3a3a',
          400: '#4a4a4a',
          500: '#00d4ff', // Electric blue
          600: '#00b8e6',
          700: '#0099cc',
          800: '#007bb3',
          900: '#005c99',
        },
        secondary: {
          50: '#0d1117',
          100: '#161b22',
          200: '#21262d',
          300: '#30363d',
          400: '#484f58',
          500: '#00ff88', // Neon green
          600: '#00e67a',
          700: '#00cc6d',
          800: '#00b35f',
          900: '#009952',
        },
        success: '#00ff88',
        danger: '#ff4444',
        warning: '#ffaa00',
        background: {
          light: '#ffffff',
          dark: '#0a0a0a',
        },
        surface: {
          light: '#f8f9fa',
          dark: '#1a1a1a',
        },
        text: {
          light: '#1a1a1a',
          dark: '#ffffff',
        },
      },
      backgroundImage: {
        'gradient-futuristic': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 100%)',
        'gradient-neon': 'linear-gradient(135deg, #00d4ff 0%, #00ff88 100%)',
      },
    },
  },
  plugins: [],
}
