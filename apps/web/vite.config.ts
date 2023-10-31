import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const packageJson = require('./package.json')

const { dependencies } = packageJson

function renderChunks(deps: Record<string, string>) {
  let chunks = {}
  Object.keys(deps).forEach(key => {
    if (
      [
        'react',
        'react-router-dom',
        'react-dom',
        '@types/react-beautiful-dnd',
      ].includes(key)
    )
      return
    chunks[key] = [key]
  })
  return chunks
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 2500,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-router-dom', 'react-dom'],
          ...renderChunks(dependencies),
        },
      },
    },
  },
  server: {
    port: 8910,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5094',
        changeOrigin: true,
      },
    },
  },
  preview: {
    port: 8910,
  },
  optimizeDeps: {
    exclude: ['@types/react-beautiful-dnd'],
  },
})
