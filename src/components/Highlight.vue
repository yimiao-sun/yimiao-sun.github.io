<script setup>
import { computed } from 'vue'
import highlightJson from '../content/Highlight.json'

const highlights = computed(() => {
  return highlightJson.map(item => {
    const newItem = { ...item }

    // YouTube 视频
    if (item.type === 'youtube' && item.link) {
      try {
        const url = new URL(item.link)
        const videoId = url.searchParams.get('v')

        if (videoId) {
          newItem.embedLink = `https://www.youtube.com/embed/${videoId}`
        }
      } catch (e) {
        console.error('Invalid YouTube URL:', item.link)
      }
    }

    // 本地 MP4 视频
    if (item.type === 'local' && item.link) {
      newItem.embedLink =
        `${import.meta.env.BASE_URL}${item.link.replace(/^\/+/, '')}`
    }

    return newItem
  })
})
</script>

<template>
  <div>
    <h2 style="font-size: 16pt; color: #23380C;">
      Research Highlights
    </h2>

    <div class="video-grid">
      <div
        v-for="(item, index) in highlights"
        :key="index"
        class="video-item"
      >
        <div class="video-container">

          <!-- YouTube 视频 -->
          <iframe
            v-if="item.type === 'youtube'"
            :src="item.embedLink"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>

          <!-- 本地 MP4 视频 -->
          <video
            v-else-if="item.type === 'local'"
            :src="item.embedLink"
            controls
            playsinline
            preload="metadata"
          ></video>

        </div>

        <div class="video-info">

          <!-- 第一排：Title -->
          <div class="title-row">
            <a
              :href="item.type === 'local' ? item.embedLink : item.link"
              target="_blank"
              class="title-link"
            >
              {{ item.title }}
            </a>
          </div>

          <!-- 第二排：Pub 和 Note -->
          <div class="details-row">
            <span class="pub-tag">
              {{ item.pub }}
            </span>

            <span class="note-text">
              {{ item.note }}
            </span>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.video-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px 20px;
}

.video-item {
  min-width: 0;
  display: flex;
  flex-direction: column;
}

/* 统一所有视频为 16:9 */
.video-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

/* YouTube 和本地 MP4 保持完全相同尺寸 */
.video-container iframe,
.video-container video {
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  border: 0;
  border-radius: 0 !important;
  object-fit: cover;
}

.video-info {
  margin-top: 10px;
  text-align: center;
}

/* Title */
.title-row {
  margin-bottom: 8px;

  height: 2.8em;

  display: flex;
  align-items: center;
  justify-content: center;
}

.title-link {
  font-size: 12pt;
  color: #23380C;

  -webkit-text-stroke: 0.5px currentColor;

  text-decoration: none;
  line-height: 1.4;

  overflow: hidden;
  text-overflow: ellipsis;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.title-link:hover {
  text-decoration: underline;
}

/* Pub + Note */
.details-row {
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 10px;

  flex-wrap: wrap;
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

  transition:
    background-color 0.15s ease,
    transform 0.15s ease;
}

.note-text {
  color: #966A4A;
  font-weight: bold;
  font-size: 12pt;
}

/* 手机端：单列 */
@media (max-width: 768px) {
  .video-grid {
    grid-template-columns: 1fr;
  }
}
</style>