import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/career-recommendation': 'http://localhost:8000',
      '/personalised-learning-path': 'http://localhost:8000'
    }
  }
});