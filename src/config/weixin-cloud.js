/**
 * 微信云开发（仅 mp-weixin 生效）
 *
 * 1. 微信开发者工具 → 云开发 → 开通并创建环境
 * 2. 复制「环境 ID」（如 cloud1-xxxxx），填到 WX_CLOUD_ENV_ID
 * 3. 云开发控制台 → 存储 → 新建文件夹（如 mbti）→ 上传 q1-bg.png 等与 src/static 同名的文件
 * 4. 在存储里点开任意文件 → 复制「文件 ID」，其形如：
 *    cloud://环境ID/mbti/q1-bg.png
 *    去掉末尾文件名后即为 WX_CLOUD_FILE_PREFIX（须以 / 结尾）
 *
 * 最后在 assets.js 里把 IMAGE_MODE 改为 'cloud'
 */

/** 云环境 ID，留空则不执行 wx.cloud.init */
export const WX_CLOUD_ENV_ID = ''

/**
 * 云存储文件 ID 前缀（目录），与控制台上传路径一致，须以 / 结尾
 * 例：cloud://cloud1-abc123/mbti/
 */
export const WX_CLOUD_FILE_PREFIX = ''
