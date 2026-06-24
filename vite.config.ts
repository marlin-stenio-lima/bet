import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5050,
    strictPort: true,
    proxy: {
      '/api/cakto': {
        target: 'https://api.cakto.com.br',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/cakto/, '')
      }
    }
  }
})
