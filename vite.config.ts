import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
    host: true, // eller specifik IP-adress om så önskas
    port: 3000, // valfri port
  }
})
