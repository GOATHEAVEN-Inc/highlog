import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'

// 로컬 개발에선 nginx 없이 Vite 자체 프록시로 두 백엔드를 묶는다.
// - /api/*  → Spring (8080)
// - /ai/*   → FastAPI (8000)
// 프론트는 VITE_API_URL=""로 설정해 상대경로로 요청하면, 여기서 라우팅된다.
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/ai': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        // SSE 스트림이 압축으로 끊기지 않도록
        // (FastAPI는 chunked text/event-stream 응답)
      },
    },
  },
})
