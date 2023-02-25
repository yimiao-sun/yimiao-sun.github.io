<script setup>
import { ref, computed } from 'vue'
import { convertMarkdownToHtml } from '../utils'
import metaJson from '../content/meta.json'

const metaContent = ref(metaJson)
const description = computed(() => {
  return convertMarkdownToHtml(metaContent.value.description)
})
</script>

<template>
  <div class="row items-align-bottom">
    <div class="col-f4">
      <h1 style="font-size: 20pt">{{ metaContent.name }}</h1>
      <div style="font-size: 13.5pt" v-html="description"></div>
    </div>
    <div>
      <img class="col" src="../assets/personal-photo.jpg" width="140" alt="personal photo">
    </div>
  </div>
  <div class="row flex-start">
    <div style="font-size: 15pt" class="m-r1 m-tb-05" v-for="(contact, key) in metaContent.contact" :key="key">
      <i :class="contact.icon"></i>
      <a :href="contact.url" target="_blank">{{ key }}</a>
    </div>
  </div>
</template>