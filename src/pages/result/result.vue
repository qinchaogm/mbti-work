<template>
  <view class="result-container" :style="{ backgroundColor: pageBgColor }">
    <!-- 背景装饰 -->
    <view class="result-bg">
      <view class="result-bg-shape shape-1"></view>
      <view class="result-bg-shape shape-2"></view>
      <view class="result-bg-shape shape-3" :style="{ background: (character.color || '#607D8B') + '25' }"></view>
    </view>
    <!-- 加载状态 - 丰富过渡动画 -->
    <view v-if="loading" class="loading-state">
      <view class="loading-cards">
        <view 
          v-for="(code, i) in mbtiCodes" 
          :key="code" 
          class="loading-card"
          :class="{ 'loading-card-active': cyclingIndex === i }"
        >
          <text class="loading-code">{{ code }}</text>
        </view>
      </view>
      <view class="loading-dots">
        <view class="dot" v-for="i in 3" :key="i" :class="{ 'dot-active': dotIndex === i - 1 }"></view>
      </view>
      <view class="loading-text">正在解析你的职场灵魂</view>
      <view class="loading-sub">16 种人格 · 精准匹配</view>
    </view>
    
    <!-- 结果内容 -->
    <view v-else class="result-content fade-in">
      <view class="result-header">
        <text class="result-title">你的职场人格</text>
        <view class="result-header-line"></view>
      </view>
      <view class="card-wrapper" id="share-card">
        <view class="main-card" :style="{ '--char-color': character.color }">
          <view class="card-glow"></view>
          <view class="card-accent" :style="{ background: character.color }"></view>
          <view class="card-header">
            <view class="mbti-badge">{{ resultCode }}</view>
            <text class="char-name">{{ character.name }}</text>
          </view>
          
          <view class="illustration-area">
            <view v-if="character.imgUrl" class="avatar-wrapper">
              <image class="avatar-img" :src="character.imgUrl" mode="aspectFill" />
            </view>
            <view v-else class="avatar-fallback" :style="{ backgroundColor: character.color + '20', borderColor: character.color + '50' }">
              <text class="avatar-text" :style="{ color: character.color }">{{ character.name ? character.name.substring(0, 1) : '?' }}</text>
            </view>
          </view>

          <view class="quote-section">
            <text class="quote-text">「 {{ character.quote }} 」</text>
          </view>
          
          <view class="tags-row">
            <view class="tag-pill" v-for="(tag, index) in character.tags" :key="index" :style="{ borderColor: (character.color || '#607D8B') + '40' }">
              #{{ tag }}
            </view>
          </view>

          <view class="match-section" :style="{ borderLeft: '4rpx solid ' + (character.color || '#607D8B') }">
            <text class="match-label">灵魂搭子</text>
            <text class="match-value">{{ character.match }}</text>
          </view>
        </view>
      </view>

      <view class="action-footer">
        <button class="btn-primary" @click="generateShareCard">保存分享图</button>
        <button class="btn-secondary" @click="restart">重新测试</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMbtiStore } from '../../store/mbti'

const store = useMbtiStore()
const loading = ref(true)
const resultCode = ref('')
const cyclingIndex = ref(0)
const dotIndex = ref(0)

const mbtiCodes = ['INTJ', 'ENFP', 'ISTJ', 'INFP', 'ENTJ', 'ESFJ', 'ISTP', 'ENFJ', 'ESTJ', 'INTP', 'ESFP', 'INFJ', 'ENTP', 'ISFJ', 'ESTP', 'ISFP']

onMounted(() => {
  const cycleInterval = setInterval(() => {
    cyclingIndex.value = (cyclingIndex.value + 1) % mbtiCodes.length
  }, 120)
  const dotInterval = setInterval(() => {
    dotIndex.value = (dotIndex.value + 1) % 3
  }, 400)
  
  setTimeout(() => {
    clearInterval(cycleInterval)
    clearInterval(dotInterval)
    resultCode.value = store.calculateResult()
    if (!resultCode.value || resultCode.value.length < 4) {
      resultCode.value = 'INTJ'
    }
    loading.value = false
  }, 1400)
})


const character = computed(() => {
  if (!resultCode.value) return {}
  return store.characters[resultCode.value] || store.characters['INTJ']
})

const pageBgColor = computed(() => {
  if (loading.value || !character.value.color) return '#f5f5f7'
  return `${character.value.color}0a`
})

const restart = () => {
  store.reset()
  uni.reLaunch({ url: '/pages/index/index' })
}

const generateShareCard = () => {
  uni.showToast({ title: '请截图保存分享', icon: 'none', duration: 2000 })
}
</script>

<style>
page {
  background-color: #f5f5f7;
}

.result-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: background-color 0.6s ease;
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, sans-serif;
  position: relative;
}

.result-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.result-bg-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(100rpx);
  opacity: 0.8;
  animation: resultFloat 15s ease-in-out infinite alternate;
}

.result-bg-shape.shape-1 {
  width: 500rpx;
  height: 500rpx;
  background: linear-gradient(135deg, #e8f4fc 0%, #f0e8f8 100%);
  top: -100rpx;
  right: -100rpx;
}

.result-bg-shape.shape-2 {
  width: 400rpx;
  height: 400rpx;
  background: linear-gradient(135deg, #fff5e8 0%, #fce8f0 100%);
  bottom: 20%;
  left: -80rpx;
  animation-delay: -5s;
}

.result-bg-shape.shape-3 {
  width: 350rpx;
  height: 350rpx;
  bottom: -80rpx;
  right: 10%;
  animation-delay: -10s;
}

@keyframes resultFloat {
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(30rpx, -20rpx) scale(1.1); }
  100% { transform: translate(0, 0) scale(1); }
}

/* 加载页 - 丰富动画 */
.loading-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 48rpx;
}

.loading-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16rpx;
  margin-bottom: 48rpx;
  max-width: 520rpx;
}

.loading-card {
  width: 100rpx;
  height: 72rpx;
  background: #fff;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.06);
  opacity: 0.4;
  transform: scale(0.9);
  transition: all 0.3s ease;
}

.loading-card-active {
  opacity: 1;
  transform: scale(1.05);
  box-shadow: 0 8rpx 24rpx rgba(26, 26, 26, 0.15);
  background: #1a1a1a;
}

.loading-code {
  font-size: 24rpx;
  font-weight: 700;
  color: #616161;
}

.loading-card-active .loading-code {
  color: #fff;
}

.loading-dots {
  display: flex;
  gap: 16rpx;
  margin-bottom: 32rpx;
}

.dot {
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  background: #d0d0d0;
  transition: all 0.3s ease;
}

.dot-active {
  background: #1a1a1a;
  transform: scale(1.3);
}

.loading-text {
  font-size: 32rpx;
  color: #212121;
  font-weight: 600;
  margin-bottom: 8rpx;
}

.loading-sub {
  font-size: 24rpx;
  color: #9e9e9e;
}

/* 结果内容区 */
.result-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 140rpx 32rpx 48rpx;
  position: relative;
  z-index: 2;
}

.result-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32rpx;
}

.result-title {
  font-size: 28rpx;
  color: #9e9e9e;
  letter-spacing: 6rpx;
  font-weight: 500;
  margin-bottom: 12rpx;
}

.result-header-line {
  width: 48rpx;
  height: 6rpx;
  border-radius: 4rpx;
  background: linear-gradient(90deg, #a1c4fd, #fdcbf1);
}

.fade-in {
  animation: fadeIn 0.5s ease forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(24rpx); }
  to { opacity: 1; transform: translateY(0); }
}

.card-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-card {
  width: 100%;
  position: relative;
  background: #fff;
  border-radius: 32rpx;
  padding: 48rpx 36rpx 40rpx;
  box-sizing: border-box;
  box-shadow: 0 20rpx 60rpx rgba(0,0,0,0.08), 0 0 0 1rpx rgba(0,0,0,0.04);
  overflow: hidden;
}

.card-accent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 8rpx;
  border-radius: 32rpx 32rpx 0 0;
  opacity: 0.9;
}

.card-glow {
  position: absolute;
  top: -80rpx;
  right: -80rpx;
  width: 200rpx;
  height: 200rpx;
  border-radius: 50%;
  background: radial-gradient(circle, var(--char-color, #607D8B) 0%, transparent 70%);
  opacity: 0.12;
}

.card-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32rpx;
}

.mbti-badge {
  padding: 6rpx 20rpx;
  border-radius: 100rpx;
  font-size: 24rpx;
  font-weight: 700;
  letter-spacing: 2rpx;
  margin-bottom: 12rpx;
  background: var(--char-color, #607D8B);
  color: #fff;
}

.char-name {
  font-size: 44rpx;
  color: #1a1a1a;
  font-weight: 800;
  letter-spacing: 2rpx;
}

.illustration-area {
  margin-bottom: 32rpx;
  display: flex;
  justify-content: center;
}

.avatar-wrapper {
  width: 240rpx;
  height: 240rpx;
  border-radius: 50%;
  overflow: hidden;
  border: 4rpx solid rgba(0,0,0,0.06);
}

.avatar-img {
  width: 100%;
  height: 100%;
}

.avatar-fallback {
  width: 240rpx;
  height: 240rpx;
  border-radius: 50%;
  border: 4rpx solid;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-text {
  font-size: 96rpx;
  font-weight: bold;
}

.quote-section {
  text-align: center;
  margin-bottom: 28rpx;
  padding: 0 8rpx;
}

.quote-text {
  font-size: 30rpx;
  color: #424242;
  font-weight: 500;
  line-height: 1.5;
}

.tags-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12rpx;
  margin-bottom: 28rpx;
}

.tag-pill {
  background: #f8f9fa;
  color: #616161;
  padding: 8rpx 20rpx;
  border-radius: 100rpx;
  font-size: 22rpx;
  font-weight: 500;
  border: 2rpx solid rgba(0,0,0,0.06);
}

.match-section {
  background: #f8f9fa;
  padding: 20rpx 28rpx;
  border-radius: 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rpx;
  border-left: 4rpx solid #607D8B;
}

.match-label {
  font-size: 22rpx;
  color: #9e9e9e;
}

.match-value {
  font-size: 28rpx;
  color: #212121;
  font-weight: 600;
}

.action-footer {
  margin-top: 40rpx;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  width: 100%;
}

.btn-primary, .btn-secondary {
  width: 100%;
  height: 96rpx;
  border-radius: 48rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30rpx;
  font-weight: 600;
}

.btn-primary::after, .btn-secondary::after {
  border: none;
}

.btn-primary {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: #fff;
  box-shadow: 0 8rpx 24rpx rgba(26,26,26,0.25);
}

.btn-primary:active {
  transform: scale(0.98);
}

.btn-secondary {
  background: rgba(255,255,255,0.8);
  color: #616161;
  border: 2rpx solid #e0e0e0;
  backdrop-filter: blur(8px);
}

.btn-secondary:active {
  background: #f5f5f5;
}
</style>
