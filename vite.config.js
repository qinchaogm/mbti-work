import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

/** 构建完成后移除输出目录中的 static（资源已走 CDN 等，不打进小程序包） */
function omitMpStaticOutput() {
  return {
    name: 'omit-mp-static-output',
    apply: 'build',
    enforce: 'post',
    closeBundle() {
      const platform = process.env.UNI_PLATFORM || ''
      if (!platform.startsWith('mp-')) return
      const out = process.env.UNI_OUTPUT_DIR
      if (!out) return
      const staticDir = path.join(out, 'static')
      if (fs.existsSync(staticDir)) {
        fs.rmSync(staticDir, { recursive: true, force: true })
      }
    },
  }
}

/**
 * uni 默认生成的 dist 内 project.config.json 为 minified:false，微信「代码质量」易判为未压缩 JS。
 * 合并项目根目录 project.config.json，并强制开启 minified/postcss。
 */
function mergeMpProjectConfig() {
  return {
    name: 'merge-mp-project-config',
    apply: 'build',
    enforce: 'post',
    closeBundle() {
      const platform = process.env.UNI_PLATFORM || ''
      if (!platform.startsWith('mp-')) return
      const out = process.env.UNI_OUTPUT_DIR
      if (!out) return
      const distPath = path.join(out, 'project.config.json')
      if (!fs.existsSync(distPath)) return
      const rootPath = path.join(process.cwd(), 'project.config.json')
      let root = {}
      try {
        if (fs.existsSync(rootPath)) {
          root = JSON.parse(fs.readFileSync(rootPath, 'utf8'))
        }
      } catch {
        root = {}
      }
      try {
        const dist = JSON.parse(fs.readFileSync(distPath, 'utf8'))
        dist.setting = {
          ...dist.setting,
          ...(root.setting || {}),
          minified: true,
          postcss: true,
        }
        if (root.appid) dist.appid = root.appid
        if (root.libVersion) dist.libVersion = root.libVersion
        // 云开发相关目录（如需使用云函数/云托管等）
        if (root.miniprogramRoot) dist.miniprogramRoot = root.miniprogramRoot
        if (root.cloudfunctionRoot) dist.cloudfunctionRoot = root.cloudfunctionRoot
        if (root.cloudbaseRoot) dist.cloudbaseRoot = root.cloudbaseRoot
        if (root.qcloudRoot) dist.qcloudRoot = root.qcloudRoot
        if (root.packOptions) {
          dist.packOptions = { ...dist.packOptions, ...root.packOptions }
        }
        fs.writeFileSync(distPath, `${JSON.stringify(dist, null, 2)}\n`, 'utf8')
      } catch (e) {
        console.warn('[merge-mp-project-config]', e)
      }
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    mergeMpProjectConfig(),
    uni(),
    omitMpStaticOutput(),
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        passes: 3,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace'],
      },
      format: {
        comments: false,
      },
    },
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
