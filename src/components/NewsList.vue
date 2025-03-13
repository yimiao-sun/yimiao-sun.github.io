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
  <h2 style="font-size: 16pt">News</h2>
  <div class="row items-align-top" v-for="(news, index) in displayedNews" :key="index">
    <label class="col" :for="`${idPrefix}-${index}`" style="color: #DB2327;font-weight: bold;font-size: 12pt">{{ news.date }}</label>
    <div class="col flex-start tight-list" :id="`${idPrefix}-${index}`" style="font-size: 12pt" v-html="news.content"></div>
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
  margin-top: 10px;
  padding: 6px 12px;
  background-color: #79A9D9;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.toggle-button:hover {
  background-color: #117BB2;
}
</style>
