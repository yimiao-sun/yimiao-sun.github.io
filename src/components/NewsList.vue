<script setup>
import { computed } from 'vue'
import { convertMarkdownContentToHtml } from '../utils';

import newsJson from '../content/news.json'

const newsArr = computed(() => {
  return convertMarkdownContentToHtml(newsJson)
})
const idPrefix = "news"

</script>

<template>
  <h2 style="font-size: 20pt">📰 News</h2>
  <div class="row items-align-top" v-for="(news, index) in newsArr" :key="index">
    <label class="col" :for="`${idPrefix}-${index}`" style="color: red;font-weight: bold">{{ news.date }}</label>
    <div class="col flex-start tight-list" :id="`${idPrefix}-${index}`" v-html="news.content"></div>
  </div>
</template>