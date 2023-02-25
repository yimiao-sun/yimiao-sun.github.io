<script setup>
import { computed } from 'vue'

import {convertNestedMarkdownContentToHtml} from '../utils'

import softwareJson from '../content/softwares.json'


const softwareArr = computed(() => {
  return convertNestedMarkdownContentToHtml(softwareJson)
})
const idPrefix = "software"

</script>

<template>
  <h2>🕹️ Selected Softwares</h2>
  <p>Know me through my code 👀.</p>
  <div v-for="(softwareList, listIdx) in softwareArr" :key="listIdx">
    <h3>{{ softwareList.category }}</h3>
    <div class="row items-align-top" v-for="(software, index) in softwareList.list" :key="index">
      <label class="col" :for="`${idPrefix}-${listIdx}-${index}`">
        <a :href="software.url">{{ software.name }}</a>
      </label>
      <div class="col flex-start tight-list" :id="`${idPrefix}-${listIdx}-${index}`" v-html="software.content"></div>
    </div>
  </div>
</template>