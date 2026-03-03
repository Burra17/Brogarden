import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// Konfiguration som hanterar både lokal utveckling och GitHub Pages
export default defineConfig(({ mode }) => ({
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
}));
