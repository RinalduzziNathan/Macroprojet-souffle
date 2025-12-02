// vite.config.js
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: 'public',                    // ton ancien site est dans public/
  publicDir: false,                  // important : on ne veut PAS copier public/ en double
  build: {
    outDir: resolve(__dirname, 'dist'),   // sort dans ../dist
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, 'public/index.html')  // force l'entréesouffle
    }
  },
  server: {
    port: 5173
  }
})