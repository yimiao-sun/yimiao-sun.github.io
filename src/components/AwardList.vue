<script setup>
import { ref, computed } from 'vue'
import { convertNestedMarkdownContentToHtml } from '../utils';

import awardJson from '../content/awards.json'

const awardArr = computed(() => {
  return convertNestedMarkdownContentToHtml(awardJson)
})
const idPrefix = "award"

// 控制显示数量：默认显示 5 条
const visibleCount = ref(5)
const showMore = ref(false)

// 将嵌套的 awardArr 扁平化为 [{ listIdx, index, award }, ...]
const flattened = computed(() => {
  const arr = []
  awardArr.value.forEach((awardList, listIdx) => {
    if (!awardList || !Array.isArray(awardList.list)) return
    awardList.list.forEach((award, index) => {
      arr.push({ listIdx, index, award })
    })
  })
  return arr
})

// 根据 visibleCount 返回可见的条目
const visibleAwards = computed(() => {
  return flattened.value.slice(0, visibleCount.value)
})

function toggleShowMore() {
  if (showMore.value) {
    visibleCount.value = 5
  } else {
    visibleCount.value = flattened.value.length
  }
  showMore.value = !showMore.value
}
</script>

<template>
  <h2 style="font-size: 16pt; color: #23380C;">Awards &amp; Honors</h2>

  <div class="award-list">
    <div
      class="row items-align-top"
      v-for="item in visibleAwards"
      :key="`${idPrefix}-${item.listIdx}-${item.index}`"
    >
      <label
        style="font-size: 12pt; color: #23380C;"
        class="col"
        :for="`${idPrefix}-${item.listIdx}-${item.index}`"
      >
        <!-- 当有 note 字段时使用你想要的样式显示 note，否则显示 date -->
        <span
          style="color: #23380C; font-size: 12pt; font-weight: bold"
          class="pub note"
          v-if="item.award.note"
        >
          [{{ item.award.note }}]
        </span>
        <span v-else style="font-weight: bold;"> <!-- 对日期加粗 -->
          {{ item.award.date }}
        </span>
      </label>

      <div
        style="font-size: 12pt; color: #23380C;"
        class="col flex-start tight-list"
        :id="`${idPrefix}-${item.listIdx}-${item.index}`"
        v-html="item.award.content"
      ></div>
    </div>
  </div>

  <!-- 当总条目多于 5 条时显示按钮 -->
  <div style="margin-top:8px;" v-if="flattened.length > 5">
    <button @click="toggleShowMore" class="show-more-btn">
      {{ showMore ? 'Show Less' : 'Show More' }}
    </button>
  </div>
</template>

<style scoped>
.show-more-btn {
  margin-top: 5px;
  padding: 3px 12px;
  background-color: #D7DFCF;
  color: #966A4A;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold; /* 添加此行以加粗字体 */
  transition: background-color 0.15s ease, transform 0.15s ease; /* 添加过渡效果 */
}
.show-more-btn:hover {
  background-color: #C0CBB7; /* 修改此处，使颜色变深 */
  transform: scale(1.03);
}

/* 不再覆盖 .row .col 等类，保留你项目已有的样式以保证间距一致 */
</style>