<script setup>
import { ref, computed } from 'vue'
import { convertMarkdownToHtml } from '../utils';
import metaJson from '../content/meta.json';

const metaContent = ref(metaJson);
const description = computed(() => {
  return convertMarkdownToHtml(metaContent.value.description);
});
</script>

<template>
  <div class="row items-align-bottom">
    <div class="col-f4">
      <h1 style="font-size: 16pt">{{ metaContent.name }}</h1>
      <div style="font-size: 12pt" v-html="description"></div>
    </div>
    <div>
      <img class="col" src="../assets/personal-photo.jpg" width="162" alt="personal photo">
    </div>
  </div>
  <div class="row flex-start">
    <div style="color: #193C6C; font-size: 12pt" class="m-r1 m-tb-08" v-for="(contact, key) in metaContent.contact" :key="key">
      <i :class="contact.icon"></i>
      <a :href="contact.url" target="_blank" class="custom-link">{{ key }}</a>
    </div>
  </div>
</template>

<style scoped>
.custom-link {
  color: #193C6C;
  text-decoration: none;
}
.custom-link:hover {
  color: #193C6C;
  text-decoration: underline;
}
</style>
