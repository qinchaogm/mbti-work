<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
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