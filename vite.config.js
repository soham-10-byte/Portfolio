import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    // Three.js lazy chunk is expected to be large; raise warning threshold
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Keep Three.js ecosystem in its own split chunk (lazy-loaded)
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
  },
});
