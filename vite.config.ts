import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl()],
  resolve: {
    alias: {
      'node-fetch': 'isomorphic-fetch',
    }
  },
  server: {
    https: true,
    port: 443,
    host: true,
  },
  preview: {
    https: true,
    port: 443,
    host: true,
  }
})
