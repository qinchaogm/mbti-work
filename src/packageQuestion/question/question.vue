<template>
  <view class="question-container">
    <!-- 简约进度条 -->
    <view class="header-nav">
      <view class="progress-wrapper">
        <view class="progress-text">
          <text class="current-num">{{ currentId }}</text>
          <text class="total-num">/{{ totalQuestions }}</text>
        </view>
        <view class="progress-bar">
          <view class="progress" :style="{ width: progressPercent + '%' }"></view>
        </view>
      </view>
    </view>
    
    <!-- 场景背景图区域 -->
    <view class="scene-banner">
      <image class="scene-bg" :src="currentQuestion.bgUrl" mode="aspectFill"></image>
      <view class="scene-overlay"></view>
    </view>
    
    <!-- 内容区域：题目卡片 -->
    <view class="content-area">
      <view class="question-card" :class="{ 'fade-out': !showCard, 'fade-in': showCard }">
        <view class="tag-label">Scenario {{ currentId }}</view>
        <view class="q-title">{{ currentQuestion.title }}</view>
        <view class="q-scene">{{ currentQuestion.scene }}</view>
        
        <view class="options-container">
          <view 
            class="option-item" 
            v-for="(opt, index) in currentQuestion.options" 
            :key="index"
            hover-class="option-hover"
            @click="selectOption(opt)"
          >
            <view class="option-letter">{{ String.fromCharCode(65 + index) }}</view>
            <text class="option-text">{{ opt.text }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useMbtiStore } from '../../store/mbti'

const store = useMbtiStore()
const currentId = ref(1)
const showCard = ref(true)

onLoad((options) => {
  if (options.id) {
    currentId.value = parseInt(options.id)
  }
})

const currentQuestion = computed(() => {
  return store.questions.find(q => q.id === currentId.value) || store.questions[0]
})

const totalQuestions = computed(() => store.questions.length)

const progressPercent = computed(() => {
  return (currentId.value / totalQuestions.value) * 100
})

const selectOption = (opt) => {
  store.recordAnswer(currentId.value, opt.weight)
  
  showCard.value = false
  setTimeout(() => {
    if (currentId.value < totalQuestions.value) {
      currentId.value++
      showCard.value = true
    } else {
      uni.redirectTo({
        url: '/pages/result/result'
      })
    }
  }, 400) // 略微增加动画时间让过渡更平滑
}
</script>

<style>
page {
  background-color: #fafafa;
}

.question-container {
  min-height: 100vh;
  background-color: #f8f9fa;
  /* 增加轻微点阵背景，打破空洞感 */
  background-image: radial-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px);
  background-size: 40rpx 40rpx;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, sans-serif;
}

/* 顶部导航与进度条 */
.header-nav {
  /* 增加上间距，避免和小程序右上角胶囊冲突 */
  padding: 180rpx 40rpx 20rpx;
  background: rgba(248, 249, 250, 0.85);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 100;
}

.progress-wrapper {
  display: flex;
  align-items: center;
  gap: 30rpx;
}

.progress-text {
  font-weight: 600;
  font-size: 32rpx;
  color: #212121;
}

.current-num {
  font-size: 36rpx;
}

.total-num {
  color: #9e9e9e;
  font-size: 28rpx;
}

.progress-bar {
  flex: 1;
  height: 8rpx;
  background-color: #eeeeee;
  border-radius: 4rpx;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: #1a1a1a;
  border-radius: 4rpx;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 场景背景图区域 - 填充上方空白 */
.scene-banner {
  position: relative;
  width: 100%;
  height: 320rpx;
  overflow: hidden;
  flex-shrink: 0;
}

.scene-bg {
  width: 100%;
  height: 100%;
  display: block;
}

.scene-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 40%, rgba(248, 249, 250, 0.85) 100%);
}

/* 内容区 */
.content-area {
  flex: 1;
  padding: 30rpx 40rpx 40rpx;
  display: flex;
  flex-direction: column;
  margin-top: -50rpx;
  position: relative;
  z-index: 2;
}

.question-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-in {
  opacity: 1;
  transform: translateX(0);
}

.fade-out {
  opacity: 0;
  transform: translateX(-40rpx);
}

.tag-label {
  font-size: 24rpx;
  color: #757575;
  text-transform: uppercase;
  letter-spacing: 2rpx;
  margin-bottom: 20rpx;
  font-weight: 500;
}

.q-title {
  font-size: 44rpx;
  color: #1a1a1a;
  font-weight: 700;
  margin-bottom: 30rpx;
}

.q-scene {
  font-size: 34rpx;
  color: #424242;
  font-weight: 400;
  line-height: 1.6;
  margin-bottom: 50rpx;
}

/* 选项设计 */
.options-container {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  margin-top: auto;
  margin-bottom: 40rpx;
}

.option-item {
  background: #ffffff;
  border: 2rpx solid #eeeeee;
  border-radius: 32rpx;
  padding: 40rpx 30rpx;
  display: flex;
  align-items: flex-start;
  transition: all 0.2s ease;
  box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.02);
}

.option-hover {
  background: #f5f5f5;
  border-color: #e0e0e0;
  transform: scale(0.98);
}

.option-letter {
  width: 48rpx;
  height: 48rpx;
  background: #f0f0f0;
  border-radius: 24rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24rpx;
  color: #616161;
  font-weight: 600;
  margin-right: 24rpx;
  flex-shrink: 0;
}

.option-text {
  font-size: 32rpx;
  color: #212121;
  line-height: 1.5;
  font-weight: 400;
  flex: 1;
}
</style>