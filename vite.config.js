import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 5173,
    open: true,
    host: true,
    watch: {
      usePolling: true
    }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        'face-cream': resolve(__dirname, 'pages/face-cream/index.html'),
        'demo': resolve(__dirname, 'pages/demo/index.html'),
        'p602': resolve(__dirname, 'pages/p602/index.html')
      }
    }
  }
});

