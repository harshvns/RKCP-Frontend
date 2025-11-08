import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    open: true,
    proxy: {
      '/api': {
        target: 'https://rkcp-score.vercel.app',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path
      },
      '/health': {
        target: 'https://rkcp-score.vercel.app',
        changeOrigin: true,
        secure: true
      }
    }
  }
})

