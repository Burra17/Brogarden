import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite-konfiguration för lokal utveckling och bygget till Cloudflare Pages.
// Bilderna optimeras efter bygget av scripts/optimizeImages.mjs.
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
  },
});
