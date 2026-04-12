import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT || 3000,
    allowedHosts: ['harford-b.onrender.com', 'localhost'],
  },
})
