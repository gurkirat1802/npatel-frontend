import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    minify: true,
    sourcemap: false,
    target: 'modules',
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  }
})
