import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Vite-konfiguration för lokal utveckling och bygget till Cloudflare Pages.
// Bilderna optimeras efter bygget av scripts/optimizeImages.mjs.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  build: {
    outDir: 'dist',
  },
});
