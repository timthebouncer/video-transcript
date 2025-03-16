import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {mockApi} from "@wymjs/vite-mock-api";
import UnoCSS from 'unocss/vite'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(),UnoCSS(),mockApi({
//     // mock 檔案存方的相對路徑目錄名，預設：mock-api
//     dir: 'mock-api',
//   }),],
// })

export default defineConfig(({ command }) => {
  const config = {
    plugins: [react(),UnoCSS(),mockApi({
      // mock 檔案存方的相對路徑目錄名，預設：mock-api
      dir: 'mock-api',
    }),],
    server: {
      proxy: {}
    }
  };

  if (command === 'serve') {
    config.plugins.push(
        mockApi({
          mockPath: 'mock-api',
        })
    );
  }
  else {
    config.server.proxy = {
      '/api': {
        target: '/',
        changeOrigin: true,
      }
    };
  }

  return config;
});