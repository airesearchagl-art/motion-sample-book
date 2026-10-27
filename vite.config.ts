import { resolve } from 'node:path'
import { defineConfig } from 'vite'

// 見本帳（index.html）と使い方ページ（guide.html）の2ページ構成
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        guide: resolve(import.meta.dirname, 'guide.html'),
      },
    },
  },
})
