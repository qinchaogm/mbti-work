<script>
// #ifdef MP-WEIXIN
import { WX_CLOUD_ENV_ID } from './config/weixin-cloud'
// #endif

export default {
  onLaunch: function () {
    console.log('App Launch')
    // #ifdef MP-WEIXIN
    // 初始化云开发后可直接使用 cloud:// 文件ID 作为图片 src
    if (WX_CLOUD_ENV_ID && typeof wx !== 'undefined' && wx.cloud && wx.cloud.init) {
      wx.cloud.init({ env: WX_CLOUD_ENV_ID, traceUser: true })
    }
    // #endif
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style>
/* 微信小程序全局样式 */
page {
  background-color: #fafafa;
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif;
  color: #333;
  -webkit-font-smoothing: antialiased;
}

view, text, button, image {
  box-sizing: border-box;
}

button::after {
  border: none;
}
</style>