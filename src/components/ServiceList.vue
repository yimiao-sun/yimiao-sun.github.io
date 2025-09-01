<script setup>
import { computed } from 'vue'
import { convertNestedMarkdownContentToHtml } from '../utils';

import serviceJson from '../content/service.json'

const serviceArr = computed(() => {
  return convertNestedMarkdownContentToHtml(serviceJson)
})
const idPrefix = "service"
</script>

<template>
  <h2 style="font-size: 16pt; color: #23380C;">Professional Service</h2>
  <div v-for="(serviceList, listIdx) in serviceArr" :key="listIdx">
    <div class="row items-align-top" v-for="(service, index) in serviceList.list">
      <label 
        style="font-size: 12pt; font-weight: bold; color: #23380C;" 
        class="col" 
        :for="`${idPrefix}-${listIdx}-${index}`"
      >
        {{ service.date }}
      </label>
      <div 
        style="font-size: 12pt; color: #23380C;" 
        class="col flex-start tight-list" 
        :id="`${idPrefix}-${listIdx}-${index}`" 
        v-html="service.content"
      ></div>
    </div>
  </div>
</template>
