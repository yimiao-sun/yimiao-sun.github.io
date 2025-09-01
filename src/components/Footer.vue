<script setup>
import { ref, computed } from 'vue'
import { convertMarkdownToHtml } from '../utils'
import metaJson from '../content/footer.json'

const metaContent = ref(metaJson)
const description = computed(() => {
  return convertMarkdownToHtml(metaContent.value.description)
})
</script>

<template>
  <div class="footer-root"> <!-- 新增根 div 来应用圆角框样式 -->
    <div class="footer-content"> <!-- 包含内容的 div -->
      <div style="font-size: 12.5pt; color: #23380C;" v-html="description"></div> <!-- 设置字体颜色 -->
    </div>
  </div>
</template>

<style scoped>
.footer-root {
  background-color: #D7DFCF; /* 背景色 */
  border-radius: 16px; /* 圆角 */
  padding: 0px; /* 内边距 */
  box-sizing: border-box; /* 边框盒模型 */
  width: 100%; /* 占满宽度 */
  margin-top: -20px; /* 如果需要，可以在这里给 footer 上方留白 */
}

.footer-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* 如果内容需要垂直居中，可以在这里添加 align-items: center; */
}

/* 可以添加针对 Friend Link 内部链接的样式，使其颜色符合要求 */
.footer-content a {
  color: #23380C; /* Friend Link 的链接颜色 */
  text-decoration: underline; /* 保持下划线或者根据需要移除 */
  font-weight: bold; /* 如果需要加粗 */
}
</style>