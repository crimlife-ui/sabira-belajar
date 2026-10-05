import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages menyajikan aplikasi dari subpath /sabira-belajar/
  base: process.env.GITHUB_ACTIONS ? '/sabira-belajar/' : '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Sabira Belajar - Edukasi Huruf, Angka & Berhitung',
        short_name: 'Sabira Belajar',
        description:
          'Aplikasi edukasi anak usia dini: huruf, angka, berhitung & hijaiyah. Bebas iklan, 100% offline.',
        lang: 'id',
        dir: 'ltr',
        start_url: '.',
        scope: '.',
        display: 'standalone',
        orientation: 'any',
        theme_color: '#ec4899',
        background_color: '#e0f2fe',
        icons: [
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
      },
    }),
  ],
})
