import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    ssr: {
      noExternal: [/^@material\//, /^@smui(?:-extra)?\//]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve('/src')
    }
  },
  server: {
    port: 5000
  }
})
