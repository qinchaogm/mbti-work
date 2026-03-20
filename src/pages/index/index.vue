<template>
  <view class="home-container">
    <!-- 背景渐变 -->
    <view class="bg-gradient"></view>
    <!-- 装饰性背景形状 -->
    <view class="bg-shape shape-1"></view>
    <view class="bg-shape shape-2"></view>
    <view class="bg-shape shape-3"></view>
    <view class="bg-shape shape-4"></view>
    <!-- 几何装饰线 -->
    <view class="bg-lines">
      <view class="line line-1"></view>
      <view class="line line-2"></view>
      <view class="line line-3"></view>
    </view>
    <!-- 浮动人格标签预览 -->
    <view class="floating-badges">
      <view class="badge-item badge-1">INTJ</view>
      <view class="badge-item badge-2">ENFP</view>
      <view class="badge-item badge-3">ISTJ</view>
    </view>
    
    <view class="content">
      <view class="header-section">
        <view class="app-label-wrap">
          <text class="app-label">职场 MBTI 测试</text>
          <view class="label-dot"></view>
        </view>
        <view class="title-container">
          <text class="title-main">遇见你的</text>
          <text class="title-highlight">职场人格</text>
        </view>
        <view class="divider"></view>
        <text class="subtitle">发现真实自我 · 找到最佳搭子</text>
      </view>
      
      <view class="hero-card">
        <view class="hero-card-inner">
          <view class="hero-icon-wrapper">
            <text class="hero-icon">💼</text>
          </view>
          <view class="hero-text-group">
            <text class="hero-text-title">16种职场角色</text>
            <text class="hero-text-desc">精准测试，只需 3 分钟</text>
          </view>
        </view>
        <view class="hero-card-accent"></view>
      </view>
      
      <view class="action-section">
        <button class="btn-start" hover-class="btn-start-hover" @click="startTest">
          <text class="btn-text">开始探索</text>
          <text class="btn-arrow">→</text>
        </button>
        <text class="footer-tips">已有 10w+ 职场人完成测试</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { useMbtiStore } from '../../store/mbti'

const store = useMbtiStore()

const startTest = () => {
  store.reset()
  uni.navigateTo({
    url: '/pages/question/question?id=1'
  })
}
</script>

<style>
page {
  background-color: #f8f9fa;
}

.home-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #f5f6f8;
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif;
}

.bg-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, #fafbff 0%, #f5f6f8 40%, #f0f2f5 100%);
  z-index: 0;
}

.bg-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 1;
  opacity: 0.75;
  animation: float 14s ease-in-out infinite alternate;
}

@keyframes float {
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(20rpx, -40rpx) scale(1.08); }
  100% { transform: translateY(0) scale(1); }
}

.shape-1 {
  width: 600rpx;
  height: 600rpx;
  background: linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%);
  top: -80rpx;
  right: -120rpx;
}
.shape-2 {
  width: 500rpx;
  height: 500rpx;
  background: linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%);
  bottom: 120rpx;
  left: -120rpx;
  animation-delay: -3s;
}
.shape-3 {
  width: 420rpx;
  height: 420rpx;
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  bottom: -60rpx;
  right: 80rpx;
  animation-delay: -6s;
}
.shape-4 {
  width: 280rpx;
  height: 280rpx;
  background: linear-gradient(135deg, #d4e8f7 0%, #e8f4fc 100%);
  top: 40%;
  left: -60rpx;
  animation-delay: -9s;
}

.bg-lines {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  pointer-events: none;
}

.line {
  position: absolute;
  background: linear-gradient(90deg, transparent, rgba(0,0,0,0.03), transparent);
  height: 1px;
}

.line-1 {
  width: 60%;
  top: 25%;
  left: 0;
  transform: rotate(-15deg);
}

.line-2 {
  width: 50%;
  bottom: 30%;
  right: 0;
  transform: rotate(10deg);
}

.line-3 {
  width: 40%;
  top: 55%;
  right: 10%;
  transform: rotate(-5deg);
}

.floating-badges {
  position: absolute;
  z-index: 3;
  pointer-events: none;
}

.badge-item {
  position: absolute;
  padding: 8rpx 20rpx;
  border-radius: 100rpx;
  font-size: 22rpx;
  font-weight: 600;
  color: rgba(0,0,0,0.3);
  background: rgba(255,255,255,0.6);
  backdrop-filter: blur(8px);
  border: 1rpx solid rgba(255,255,255,0.8);
  animation: badgeFloat 8s ease-in-out infinite;
}

.badge-1 { top: 22%; right: 15%; animation-delay: 0s; }
.badge-2 { top: 45%; left: 8%; animation-delay: -2.5s; }
.badge-3 { bottom: 28%; right: 20%; animation-delay: -5s; }

@keyframes badgeFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12rpx); }
}

.content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 200rpx 48rpx 60rpx;
  box-sizing: border-box;
  justify-content: space-between;
}

.header-section {
  display: flex;
  flex-direction: column;
  margin-top: 40rpx;
}

.app-label-wrap {
  display: flex;
  align-items: center;
  gap: 12rpx;
  margin-bottom: 20rpx;
}

.app-label {
  font-size: 24rpx;
  color: #9e9e9e;
  letter-spacing: 4rpx;
  font-weight: 500;
  text-transform: uppercase;
}

.label-dot {
  width: 8rpx;
  height: 8rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #a1c4fd, #c2e9fb);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

.title-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 30rpx;
}

.title-main {
  font-size: 68rpx;
  color: #212121;
  font-weight: 300;
  line-height: 1.2;
}

.title-highlight {
  font-size: 80rpx;
  color: #1a1a1a;
  font-weight: 800;
  line-height: 1.2;
  background: linear-gradient(120deg, #1a1a1a, #546e7a);
  -webkit-background-clip: text;
  color: transparent;
}

.divider {
  width: 60rpx;
  height: 6rpx;
  background: #212121;
  border-radius: 4rpx;
  margin: 30rpx 0;
}

.subtitle {
  font-size: 30rpx;
  color: #757575;
  letter-spacing: 2rpx;
  font-weight: 400;
}

.hero-card {
  position: relative;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(24px);
  border-radius: 40rpx;
  padding: 50rpx 40rpx;
  margin: 40rpx 0;
  box-shadow: 0 20rpx 60rpx rgba(0, 0, 0, 0.06), 0 0 0 1rpx rgba(255,255,255,0.8) inset;
  overflow: hidden;
}

.hero-card-accent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6rpx;
  background: linear-gradient(90deg, #a1c4fd, #fdcbf1, #ffecd2);
  border-radius: 40rpx 40rpx 0 0;
}

.hero-card-inner {
  display: flex;
  align-items: center;
}

.hero-icon-wrapper {
  width: 100rpx;
  height: 100rpx;
  background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.06);
  margin-right: 30rpx;
  border: 4rpx solid rgba(161,196,253,0.2);
}

.hero-icon {
  font-size: 48rpx;
}

.hero-text-group {
  display: flex;
  flex-direction: column;
}

.hero-text-title {
  font-size: 32rpx;
  color: #333;
  font-weight: 600;
  margin-bottom: 8rpx;
}

.hero-text-desc {
  font-size: 24rpx;
  color: #9e9e9e;
}

/* 底部操作区 */
.action-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.btn-start {
  width: 100%;
  height: 110rpx;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  border-radius: 55rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 16rpx 40rpx rgba(26, 26, 26, 0.25);
  transition: all 0.3s ease;
  padding: 0;
  margin: 0 0 30rpx 0;
}

.btn-start::after {
  border: none;
}

.btn-start-hover {
  transform: scale(0.97);
  box-shadow: 0 8rpx 20rpx rgba(26, 26, 26, 0.15);
}

.btn-text {
  color: #ffffff;
  font-size: 34rpx;
  font-weight: 600;
  letter-spacing: 2rpx;
  margin-right: 12rpx;
}

.btn-arrow {
  color: #ffffff;
  font-size: 34rpx;
  font-weight: 300;
}

.footer-tips {
  font-size: 24rpx;
  color: #bdbdbd;
}
</style>