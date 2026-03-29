import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // 1. Adjust the warning limit (e.g., to 1000kB)
    chunkSizeWarningLimit: 1000,

    // 2. Use Rolldown options for better chunking
    rolldownOptions: {
      output: {
        codeSplitting: {
          // This helps split node_modules into separate chunks
          groups: [
            {
              test: /node_modules/,
              name: 'vendor',
            },
          ],
        },
      },
    },
  },
})
