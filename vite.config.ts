import { resolve } from 'node:path'
import { defineConfig } from 'vite'

// 見本帳（index.html）、使い方ページ（guide.html）、構成づくりの詳しい手順（story-guide.html）の3ページ構成
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        guide: resolve(import.meta.dirname, 'guide.html'),
        storyGuide: resolve(import.meta.dirname, 'story-guide.html'),
      },
    },
  },
})
