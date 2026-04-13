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
          // 简化分包策略
          'vue-vendor': ['vue', 'pinia'],
          'utils': ['utils/**'],
          // 不分页面包，保持简单
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
