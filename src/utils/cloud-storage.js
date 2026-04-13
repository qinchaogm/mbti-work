/**
 * 小程序云存储工具
 * 用于图片的分发和缓存
 */

export const CloudStorage = {
  // 初始化云存储
  init() {
    // #ifdef MP-WEIXIN
    wx.cloud.init({
      env: 'your-env-id', // 替换为你的云环境ID
      traceUser: true,
    })
    // #endif
  },

  // 上传图片到云存储
  uploadImage(file) {
    return new Promise((resolve, reject) => {
      // #ifdef MP-WEIXIN
      wx.cloud.uploadFile({
        cloudPath: `images/${Date.now()}_${file.name}`,
        filePath: file.path,
        success: res => {
          resolve(res.fileID)
        },
        fail: err => {
          reject(err)
        }
      })
      // #endif
    })
  },

  // 从云存储获取图片URL
  getImageURL(fileID) {
    // #ifdef MP-WEIXIN
    return wx.cloud.getTempFileURL({
      fileID: fileID
    })
    // #endif
  },

  // CDN图片优化
  getOptimizedImage(originalUrl, options = {}) {
    const { width = 1920, quality = 75, format = 'webp' } = options
    return `${originalUrl}?imageView2/1/w/${width}/q/${quality}/format/${format}`
  }
}

// 图片缓存策略
export const imageCache = {
  cache: new Map(),
  
  get(key) {
    return this.cache.get(key)
  },
  
  set(key, value) {
    this.cache.set(key, value)
  },
  
  clear() {
    this.cache.clear()
  }
}