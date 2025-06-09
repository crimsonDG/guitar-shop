import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Тільки для production збірки
  base: process.env.NODE_ENV === 'production' ? '/guitar-shop/' : '/',
  resolve: {
    alias: {
      '@': '/src',
      '@/components': '/src/components',
      '@/pages': '/src/pages',
      '@/types': '/src/types',
      '@/utils': '/src/utils',
    },
  },
  // Налаштування для статичних файлів
  assetsInclude: ['/*.png', '/.jpg', '**/.jpeg', '/*.gif', '/*.svg'],
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  }
})