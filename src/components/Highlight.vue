<script setup>
import { computed } from 'vue'
import highlightJson from '../content/Highlight.json' // 请确保路径正确

const highlights = computed(() => {
  return highlightJson.map(item => {
    // 将YouTube普通链接转换为嵌入式链接
    if (item.link && item.link.includes('watch?v=')) {
      const videoId = item.link.split('watch?v=')[1];
      const ampersandPosition = videoId.indexOf('&');
      const cleanVideoId = ampersandPosition !== -1 ? videoId.substring(0, ampersandPosition) : videoId;
      item.embedLink = `https://www.youtube.com/embed/${cleanVideoId}`;
    }
    return item;
  });
})
</script>

<template>
  <div>
    <h2 style="font-size: 16pt; color: #23380C;">Research Highlights</h2>
    <div class="video-grid">
      <div v-for="(item, index) in highlights" :key="index" class="video-item">
        <div class="video-container">
          <iframe
            :src="item.embedLink"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div class="video-info">
          <!-- 第一排: Title -->
          <div class="title-row">
            <a
              :href="item.link"
              target="_blank"
              class="title-link"
            >{{ item.title }}</a>
          </div>

          <!-- 第二排: Pub 和 Note -->
          <div class="details-row">
            <span class="pub-tag">{{ item.pub }}</span>
            <span class="note-text">{{ item.note }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.video-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* 视频之间的间距 */
}

.video-item {
  flex: 1 1 calc(33.333% - 20px); /* 一排三个，减去间距 */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.video-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 宽高比 */
  height: 0;
  overflow: hidden;
  width: 100%;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.video-info {
  margin-top: 10px;
  text-align: center;
}

.title-row {
  margin-bottom: 8px;
  /* 为两行文字设定一个固定的容器高度，以保证布局统一 */
  height: 2.8em; /* line-height (1.4) * 2 lines */
  display: flex;
  align-items: center;
  justify-content: center;
}

.title-link {
  font-size: 12pt;
  color: #23380C;
  -webkit-text-stroke: 0.5px currentColor;
  text-decoration: none; /* 移除下划线 */
  line-height: 1.4;

  /* 以下属性确保文本最多显示两行，超出部分会用省略号表示 */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 限制为两行 */
  -webkit-box-orient: vertical;
}

.details-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.pub-tag {
  background-color: #CDD5B8;
  color: #23380C;
  border: 2px solid #23380C;
  padding: 0px 8px;
  border-radius: 9px;
  font-size: 12pt;
  font-weight: normal;
  cursor: default;
  transition: background-color 0.15s ease, transform 0.15s ease;
}

.note-text {
  color: #966A4A;
  font-weight: bold;
  font-size: 12pt;
}

/* 响应式设计，在较小的屏幕上一排只显示一个 */
@media (max-width: 768px) {
  .video-item {
    flex: 1 1 100%;
  }
}
</style>