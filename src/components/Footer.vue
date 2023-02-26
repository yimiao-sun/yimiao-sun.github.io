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
<div class="col-f4">
      <div style="font-size: 12pt" v-html="description"></div>
    </div>
</template>