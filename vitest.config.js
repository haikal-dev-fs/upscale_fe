import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: 'vitest.setup.js',
  },
})
