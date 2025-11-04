// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => {
  const isDev = command === 'serve'
  return {
    base: isDev ? '/' : '/multiplataforma_a2/',
    plugins: [react()],
    server: {
      /* Hemos reconfigurado la API para evitar CORS desde el front-end. El proxy ya no es necesario.
      proxy: {
        '/apifpr': {
          target: 'https://lawebdeperez.es',
          changeOrigin: true,
          secure: false,
        },
      },
      */
    },
  }
})
