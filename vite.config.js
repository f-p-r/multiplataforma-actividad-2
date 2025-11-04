// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => {
  const isDev = command === 'serve'
  return {
    base: isDev ? '/' : '/multiplataforma_a2/',
    plugins: [react()],
    server: {
      proxy: {
        '/apifpr': {
          target: 'https://lawebdeperez.es',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
})
