import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        enHome: resolve(__dirname, 'en/index.html'),
        enRooms: resolve(__dirname, 'en/rooms.html'),
        enContacts: resolve(__dirname, 'en/contacts.html'),
        ruHome: resolve(__dirname, 'ru/index.html'),
        ruRooms: resolve(__dirname, 'ru/rooms.html'),
        ruContacts: resolve(__dirname, 'ru/contacts.html')
      }
    }
  }
});
