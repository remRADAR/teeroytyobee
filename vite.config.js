import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Only allow the exact forwarded preview hostname for this session. Keep Vite's
// DNS-rebinding protection enabled; never use `allowedHosts: true`.
const forwardedPreviewHost = process.env.MANUS_PREVIEW_HOST?.trim();
const forwardedPreviewHosts = forwardedPreviewHost ? [forwardedPreviewHost] : [];

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    assetsInlineLimit: 2048,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: forwardedPreviewHosts,
  },
  preview: {
    port: 4173,
    allowedHosts: forwardedPreviewHosts,
  },
});
