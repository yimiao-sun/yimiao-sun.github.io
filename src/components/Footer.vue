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
<div class="col items-align-center">
  <div class="row flex-start">
    <div style="font-size: 19.35pt" class="m-r1 m-tb-05" v-for="(contact, key) in metaContent.contact" :key="key">
      <i :class="contact.icon"></i>
      <a :href="contact.url" target="_blank">{{ key }}</a>
    </div>
  </div>
</div>
</template>