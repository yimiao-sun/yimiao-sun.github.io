<script setup>
defineProps({
  "homeUrl": {
    type: String,
    required: true,
  }
})
</script>

<template>
  <a class="badge badge-home" v-if="homeUrl" target="_blank" :href="homeUrl">
    <i class="fa fa-home" aria-hidden="true"></i>
    Homepage
  </a>
</template>
