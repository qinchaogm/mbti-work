/**
 * 图片优化工具
 * 将图片转换为更适合小程序格式
 */

export const optimizeImages = () => {
  // 小程序图片优化建议：
  // 1. 使用 jpg 格式（静态背景图）
  // 2. 限制图片尺寸到 1920px 宽度
  // 3. 压缩质量到 70-80%
  // 4. 分割大图片为多个小图片
  
  return {
    // 图片优化配置
    options: {
      maxWidth: 1920,
      quality: 0.75,
      formats: ['jpeg', 'webp'],
      compression: true
    }
  }
}

// 预加载图片配置
export const imagePreload = {
  preloadList: [
    '/static/q1-bg.png',
    '/static/q2-bg.png',
    // 添加需要预加载的图片
  ],
  lazyLoad: true,
  threshold: 200
}