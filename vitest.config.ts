import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    globals: true,
    browser: {
      enabled: true,
      provider: 'playwright',
      instances: [
        {
          browser: 'chromium',
          headless: false,
        }
      ],
    },
    include: ['src/**/*.test.ts'],
    exclude: ['src/isolatedApp.test.ts'],
    setupFiles: ['./vitest.setup.ts'],
    reporters: ['verbose'],
    clearMocks: true,
    restoreMocks: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'taggedjs': path.resolve(__dirname, './node_modules/taggedjs')
    }
  },
  server: {
    fs: {
      allow: ['.']
    }
  },
  optimizeDeps: {
    include: ['taggedjs']
  }
})