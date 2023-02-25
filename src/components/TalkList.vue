<script setup>
import { computed } from 'vue'
import SlidesBadge from './badges/SlidesBadge.vue';
import VideoBadge from './badges/VideoBadge.vue';

import newsJson from '../content/talks.json'

const talkArr = computed(() => {
  return newsJson
})
const idPrefix = "talk"

</script>

<template>
  <h2>📺 Talks</h2>
  <div class="row items-align-top" v-for="(talk, index) in talkArr" :key="index">
    <label class="col" :for="`${idPrefix}-${index}`">{{ talk.date }}</label>
    <p class="col flex-start tight-list pub" :id="`${idPrefix}-${index}`">
      {{ talk.name }} @ {{ talk.place }}
      <SlidesBadge :slides-url="talk.slides" />
      <VideoBadge :video-url="talk.video" />
    </p>
  </div>
</template>