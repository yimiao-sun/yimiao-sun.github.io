<script setup>
import { ref, computed } from 'vue'
import { convertMarkdownContentToHtml } from '../utils';

import newsJson from '../content/news.json'

const initialCount = 5;
const showAll = ref(false);

const newsArr = computed(() => {
  return convertMarkdownContentToHtml(newsJson);
});

const displayedNews = computed(() => {
  return showAll.value ? newsArr.value : newsArr.value.slice(0, initialCount);
});

const idPrefix = "news";

const showMore = () => {
  showAll.value = true;
};

const showLess = () => {
  showAll.value = false;
};
</script>

<template>
  <h2 style="font-size: 16pt; color: #23380C;">News</h2>
  <div class="row items-align-top" v-for="(news, index) in displayedNews" :key="index">
    <label class="col" :for="`${idPrefix}-${index}`" style="color: #23380C; font-weight: bold; font-size: 12pt">{{ news.date }}</label>
    <div class="col flex-start tight-list" :id="`${idPrefix}-${index}`" style="font-size: 12pt; color: #23380C;" v-html="news.content"></div>
  </div>
  <button v-if="!showAll && newsArr.length > initialCount" @click="showMore" class="toggle-button">
    Show More
  </button>
  <button v-if="showAll && newsArr.length > initialCount" @click="showLess" class="toggle-button">
    Show Less
  </button>
</template>

<style scoped>
.toggle-button {
  margin-top: 5px;
  padding: 3px 12px;
  background-color: #D7DFCF;
  color: #966A4A;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold; /* 添加此行以加粗字体 */
  transition: background-color 0.15s ease, transform 0.15s ease; /* 添加过渡效果 */
}
.toggle-button:hover {
  background-color: #C0CBB7; /* 修改此处，使颜色变深 */
  transform: scale(1.03);
}

</style>