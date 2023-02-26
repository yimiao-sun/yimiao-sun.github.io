<script setup>
defineProps({
  "demoUrl": {
    type: String,
    required: true,
  }
})
</script>

<template>
  <a class="badge badge-demo" v-if="demoUrl" target="_blank" :href="demoUrl">
    <i class="fa fa-gamepad" aria-hidden="true"></i>
    Demo
  </a>
</template>