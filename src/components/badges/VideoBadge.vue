<script setup>
defineProps({
  "videoUrl": {
    type: String,
    required: true,
  }
})
</script>

<template>
  <a class="badge badge-video" v-if="videoUrl" target="_blank" :href="videoUrl">
    <i class="fa fa-video-camera" aria-hidden="true"></i>
    Slides
  </a>
</template>