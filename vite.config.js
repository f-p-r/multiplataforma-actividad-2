import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // rutas relativas para despliegue en subcarpetas
  server: {
    proxy: {
      '/apifpr': {
        target: 'https://lawebdeperez.es',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
