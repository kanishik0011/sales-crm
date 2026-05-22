import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
<<<<<<< HEAD
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
=======
>>>>>>> 1d48f48e2e39823c8e88aae47a8e413e700c9488
  },
});
