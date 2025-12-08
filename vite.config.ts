import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Konfiguration för GitHub Pages
// base måste matcha namnet på ditt repository
export default defineConfig({
  plugins: [react()],
  base: '/Brogarden/', 
  build: {
    outDir: 'dist',
  },
});