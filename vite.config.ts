import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true, // This will suppress dependency deprecation warnings
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    // Only expose specific environment variables that are needed
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    // Add other needed variables like this:
    // 'process.env.API_URL': JSON.stringify(process.env.API_URL),
  },
  json: {
    stringify: true,
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        format: 'esm',
        // Cache-busting: Including content hashes in filenames so updates invalidate old cache
        // to ensure users get the latest assets without manual refresh
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
    },
  },
});
