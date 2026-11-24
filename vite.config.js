import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main:     resolve(__dirname, 'index.html'),
        login:    resolve(__dirname, 'login.html'),
        excom:    resolve(__dirname, 'excom.html'),
        admin:    resolve(__dirname, 'admin.html'),
        profile:  resolve(__dirname, 'profile.html'),
        events:   resolve(__dirname, 'events.html'),
        awards:   resolve(__dirname, 'awards.html'),
        letter:   resolve(__dirname, 'request-letter.html'),
        chapters: resolve(__dirname, 'chapters.html'),
        roster:   resolve(__dirname, 'roster.html'),
        trackers: resolve(__dirname, 'trackers.html'),
      }
    }
  },
  server: {
    port: 5173,
    open: '/login.html'
  }
});
