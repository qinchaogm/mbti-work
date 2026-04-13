import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
  ],
  build: {
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          // 分包策略
          'vendor': ['vue', 'pinia'],
          'pages': ['pages/**', 'components/**'],
          'utils': ['utils/**'],
        }
      }
    }
  },
  define: {
    // 去除开发环境代码
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env.UNI_PLATFORM': JSON.stringify('mp-weixin')
  }
})
