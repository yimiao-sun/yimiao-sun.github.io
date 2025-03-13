<script setup>
import { computed } from 'vue'
import { convertNestedMarkdownContentToHtml } from '../utils';

import awardJson from '../content/awards.json'

const awardArr = computed(() => {
  return convertNestedMarkdownContentToHtml(awardJson)
})
const idPrefix = "award"

</script>

<template>
  <h2 style="font-size: 16pt">Awards & Honors</h2>
  <div v-for="(awardList, listIdx) in awardArr" :key="listIdx">
    <div class="row items-align-top" v-for="(award, index) in awardList.list">
      <label style="font-size: 12pt" class="col" :for="`${idPrefix}-${listIdx}-${index}`" >{{ award.date }}</label>
      <div style="font-size: 12pt" class="col flex-start tight-list" :id="`${idPrefix}-${listIdx}-${index}`" v-html="award.content"></div>
    </div>
  </div>
</template>