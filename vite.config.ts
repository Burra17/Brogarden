import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// Vite-konfiguration för lokal utveckling och bygget till Cloudflare Pages
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      jpg: {
        quality: 75,
      },
      png: {
        quality: 75,
      },
    }),
  ],
  base: '/',
  build: {
    outDir: 'dist',
  },
});
