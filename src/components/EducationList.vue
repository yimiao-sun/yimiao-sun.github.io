<script setup>
import { computed } from 'vue'
import { convertMarkdownContentToHtml } from '../utils';

import eduJson from '../content/education.json'

const eduArr = computed(() => {
  return convertMarkdownContentToHtml(eduJson)
})
const idPrefix = "education"

</script>

<template>
  <h2 style="font-size: 20pt">🎓 Education</h2>
  <div class="row items-align-top" v-for="(education, index) in eduArr" :key="index">
    <label class="col" :for="`${idPrefix}-${index}`">{{ education.date }}</label>
    <div class="col flex-start tight-list" :id="`${idPrefix}-${index}`" v-html="education.content"></div>
  </div>
</template>