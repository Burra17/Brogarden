import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Konfiguration som hanterar både lokal utveckling och GitHub Pages
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // Använd '/' lokalt, men '/Brogarden/' när vi bygger för produktion
  base: mode === 'production' ? '/Brogarden/' : '/',
  build: {
    outDir: 'dist',
  },
}));