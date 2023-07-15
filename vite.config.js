import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

import zxc from 'vite-jsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), zxc()],
  server: {
    port: 8000
  }
})
