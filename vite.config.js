import { defineConfig } from 'vite'
import compression from 'vite-plugin-compression'

export default defineConfig({
  root: 'src',
  base: '/',
  publicDir: '../public',
  plugins: [
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240,
      filter: (file) => !file.endsWith('.map')
    })
  ],
  build: {
    outDir: '../dist',
    assetsInlineLimit: 4096,
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: ({ name }) => {
          if (name && name.endsWith('.css')) return 'assets/[name]-[hash][extname]'
          return 'assets/[name]-[hash][extname]'
        },
        manualChunks: {
          vendor: ['lazysizes', 'dompurify']
        }
      }
    }
  },
  server: {
    port: 5173,
    strictPort: true
  }
})
