<script setup>
defineProps({
  "awardUrl": {
    type: String,
    required: true,
  }
})
</script>

<template>
  <a class="badge badge-award" v-if="awardUrl" target="_blank" :href="awardUrl">
    <i class="fa fa-trophy" aria-hidden="true"></i>
    Paper Award
  </a>
</template>
