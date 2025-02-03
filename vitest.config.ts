import path from 'node:path'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import { defineConfig } from 'vitest/config'

dotenv.config({ path: '.env' })
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    environmentMatchGlobs: [['src/test/api/**', 'node']],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
