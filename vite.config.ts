import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Ersätt 'REPO_NAMN' med namnet på ditt repository på GitHub
// T.ex. om ditt repo heter "brogarden-web", ska det stå base: '/brogarden-web/'
export default defineConfig({
  plugins: [react()],
  base: '/Brogarden/', 
  build: {
    outDir: 'dist',
  },
});