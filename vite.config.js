import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ command }) => ({
  // En desarrollo servir desde la raíz para evitar que el cliente dev
  // intente cargar recursos de /En-Viaje/ y produzca ERR_CONNECTION_REFUSED
  base: command === 'serve' ? '/' : '/En-Viaje/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // Activar devOptions solo cuando estemos en `vite serve`
      devOptions: {
        enabled: command === 'serve'
      },
      includeAssets: ['icon-192.png', 'icon-512.png'],
      manifest: {
        name: 'En Viaje',
        short_name: 'En Viaje',
        start_url: '/En-Viaje/',
        display: 'standalone',
        background_color: '#ffffff',
        icons: [
          {
            src: '/En-Viaje/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/En-Viaje/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })

  ]
}))
