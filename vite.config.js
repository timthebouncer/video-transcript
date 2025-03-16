import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {mockApi} from "@wymjs/vite-mock-api";
import UnoCSS from 'unocss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),UnoCSS(),mockApi({
    // mock 檔案存方的相對路徑目錄名，預設：mock-api
    dir: 'mock-api',
  }),],
})
