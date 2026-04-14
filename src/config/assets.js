import { WX_CLOUD_FILE_PREFIX, WX_CLOUD_ENV_ID } from './weixin-cloud'

/**
 * 图片资源模式：
 * - 'cdn'：使用下方 IMAGE_CDN_BASE（需配置 request/downloadFile 合法域名）
 * - 'cloud'：使用微信云存储 fileID 前缀（需在 weixin-cloud.js 配置 WX_CLOUD_FILE_PREFIX）
 */
export const IMAGE_MODE = 'cdn'

/** jsDelivr，需配置 request/downloadFile 合法域名：cdn.jsdelivr.net */
export const IMAGE_CDN_BASE =
  'https://cdn.jsdelivr.net/gh/qinchaogm/mbti-work@main/src/static/'

/**
 * 返回图片 src：
 * - cloud 模式返回：cloud://<envId>/<dir>/<file>
 * - cdn 模式返回：https://...
 */
export function imageFile(name) {
  if (IMAGE_MODE === 'cloud') {
    // envId 由 App.vue 里 wx.cloud.init 设置；此处仅保证前缀存在
    if (WX_CLOUD_ENV_ID && WX_CLOUD_FILE_PREFIX) {
      return `${WX_CLOUD_FILE_PREFIX}${name}`
    }
  }
  return `${IMAGE_CDN_BASE}${name}`
}
