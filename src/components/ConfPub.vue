<script setup>
import { ref, computed } from 'vue'
import Cite from 'citation-js'

import SlidesBadge from './badges/SlidesBadge.vue'
import VideoBadge from './badges/VideoBadge.vue'
import CodeBadge from './badges/CodeBadge.vue'
import DemoBadge from './badges/DemoBadge.vue'
import HomeBadge from './badges/HomeBadge.vue'
import AwardBadge from './badges/AwardBadge.vue'
import { AclCsl, Gb7714Csl } from '../utils'

import pubJson from '../content/ConfPub.json'

const pubArr = computed(() => {
  let cslConfig = Cite.plugins.config.get('@csl')
  cslConfig.templates.add("acl", AclCsl)
  cslConfig.templates.add("gb7714", Gb7714Csl)

  for (let i = 0; i < pubJson.length; i++) {
    let cite = Cite(pubJson[i]["bibtex"])
    pubJson[i]["entry"] = cite.get({ format: "real", type: "json", style: "csl" })[0]
    pubJson[i]["bibString"] = cite.get({ format: "string", type: "string", style: "bibtex" })
    pubJson[i]["acl"] = cite.format("bibliography", {
      format: 'text',
      template: "acl",
      lang: 'en-US'
    })
    pubJson[i]["gb7714"] = cite.format("bibliography", {
      format: 'text',
      template: "gb7714",
      lang: 'en-US'
    })

    let authors = []
    for (let author of pubJson[i]["entry"]["author"]) {
      let authorString = `${author.given} ${author.family}`.trim()
      let finalAuthorString = authorString
      if (pubJson[i].authors.boldAuthors && pubJson[i].authors.boldAuthors.includes(authorString)) {
        finalAuthorString = `<b>${finalAuthorString}</b>`
      }
      if (pubJson[i].authors.correspondingAuthors && pubJson[i].authors.correspondingAuthors.includes(authorString)) {
        finalAuthorString = `${finalAuthorString}<sup>*</sup>`
      }
      if (pubJson[i].authors.equalContributionAuthors && pubJson[i].authors.equalContributionAuthors.includes(authorString)) {
        finalAuthorString = `<u>${finalAuthorString}</u>`
      }
      authors.push(finalAuthorString)
    }
    pubJson[i]["entry"]["authors"] = authors.join(", ")
  }
  return pubJson
})

// 控制显示数量
const visibleCount = ref(5)
const showMore = ref(false)

function toggleShowMore() {
  if (showMore.value) {
    visibleCount.value = 5
  } else {
    visibleCount.value = pubArr.value.length
  }
  showMore.value = !showMore.value
}

let _show = {}
for (let pub of pubArr.value) {
  _show[pub.entry.id] = { abs: false, bib: false }
}
const showFlag = ref(_show)

let _copy = {}
for (let pub of pubArr.value) {
  _copy[pub.entry.id] = ""
}
const copyStatus = ref(_copy)

function copyToClipboard(text, pubId, cslTemplateType) {
  navigator.clipboard.writeText(text).then(
    () => {
      copyStatus.value[pubId] = `${cslTemplateType} copied`
      let succHandler = setInterval(() => {
        if (copyStatus.value[pubId]) {
          copyStatus.value[pubId] = ""
          clearInterval(succHandler)
        }
      }, 800)
    },
    () => {
      copyStatus.value[pubId] = `Copy ${cslTemplateType} failed`
      let failHandler = setInterval(() => {
        if (copyStatus.value[pubId]) {
          copyStatus.value[pubId] = ""
          clearInterval(failHandler)
        }
      }, 800)
    }
  )
}
</script>

<template>
  <h2 style="font-size: 16pt; color: #23380C;">Conference Paper</h2>

  <ul class="pub-list">
    <li v-for="pub in pubArr.slice(0, visibleCount)" :key="pub.entry.id">
      <div class="pub-header" style="color: #23380C;">
        <button v-if="pub.note" class="note-btn">{{ pub.note }}</button>
        <span> "</span>
        <a style="font-size: 12pt; color: #23380C; -webkit-text-stroke: 0.5px currentColor;" :href="pub.entry.URL" target="_blank">{{ pub.entry.title }}</a>
        <span>". </span><br>
        <span class="pub" style="font-size: 12pt; color: #23380C;" v-html="pub.entry.authors"></span>
        <span>. </span>
      </div>
      <div class="pub-controls">
        <!-- Abstract 和 BibTex 按钮，文本不加粗 -->
        <a class="badge badge-abs" @click="showFlag[pub.entry.id].abs = !showFlag[pub.entry.id].abs" style="color: #23380C; font-weight: bold;">Abstract</a>
        <a class="badge badge-bib" @click="showFlag[pub.entry.id].bib = !showFlag[pub.entry.id].bib" style="color: #23380C; font-weight: bold;">BibTex</a>
        <!-- 其他徽章组件，它们的文本样式由各自组件内部控制，这里只确保链接颜色 -->
        <SlidesBadge :slidesUrl="pub.resources.pdf" :color="'#23380C'" :font-weight="'bold'"/>
        <VideoBadge :videoUrl="pub.resources.slides" :color="'#23380C'" :font-weight="'bold'"/>
        <CodeBadge :codeUrl="pub.resources.code" :color="'#23380C'" :font-weight="'bold'"/>
        <DemoBadge :demoUrl="pub.resources.demo" :color="'#23380C'" :font-weight="'bold'"/>
        <HomeBadge :homeUrl="pub.resources.home" :color="'#23380C'" :font-weight="'bold'"/>
        <AwardBadge :awardUrl="pub.resources.award" :color="'#23380C'" :font-weight="'bold'"/>

        <p class="text-block" v-if="showFlag[pub.entry.id].abs" style="color: #23380C; font-weight: normal;">{{ pub.abstract }}</p>

        <div class="text-block" v-if="showFlag[pub.entry.id].bib">
          <!-- BibTex 复制按钮，文本不加粗 -->
          <button class="bib" @click.prevent="copyToClipboard(pub.bibtex, pub.entry.id, 'BibTeX')" style="color: #23380C; font-weight: normal;">Copy BibTeX</button>
          <button class="bib" @click.prevent="copyToClipboard(pub.acl, pub.entry.id, 'ACL')" style="color: #23380C; font-weight: normal;">Copy ACL</button>
          <button class="bib" @click.prevent="copyToClipboard(pub.gb7714, pub.entry.id, 'GB/T7714')" style="color: #23380C; font-weight: normal;">Copy GB/T7714</button>
          <span style="color: #23380C; font-weight: normal;">{{ copyStatus[pub.entry.id] }}</span>
          <p style="color: #23380C; font-weight: normal;">{{ pub.bibtex }}</p>
        </div>
      </div>
    </li>
  </ul>

  <!-- Show More / Show Less 按钮 -->
  <button @click="toggleShowMore" class="show-more-btn">
    {{ showMore ? 'Show Less' : 'Show More' }}
  </button>
</template>

<style scoped>
.pub-list {
  padding-left: 1em; /* 增加左边距以容纳 bullet */
  list-style: disc; /* 使用实心圆点作为 bullet */
  margin: 0;
  color: #23380C; /* 确保列表项的默认颜色 */
}

/* 每条之间的间距 */
.pub-list li {
  margin-bottom: 12px;
}

/* 使 note 显示为按钮样式，参考 Show More 的配色，边框颜色更深 */
.note-btn {
  background-color: #CDD5B8; /* 与 show-more 相近 */
  color: #23380C; /* 修改为 #23380C */
  border: 2px solid #23380C; /* 更深的边框色，与文本颜色一致 */
  padding: 0px 8px;
  border-radius: 9px;
  font-size: 12pt;
  font-weight: none; /* 保持加粗 */
  cursor: default;
  margin-right: 8px;
  transition: background-color 0.15s ease, transform 0.15s ease;
}

/* 保持原有的 Show More / Show Less 按钮样式 */
.show-more-btn {
  margin-top: 5px;
  padding: 3px 12px;
  background-color: #D7DFCF;
  color: #966A4A;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold; /* 保持加粗 */
  transition: background-color 0.15s ease, transform 0.15s ease;
}
.show-more-btn:hover {
  background-color: #C0CBB7; /* 修改此处，使颜色变深 */
  transform: scale(1.03);
}

/* 适当分组标题和控制按钮布局（可按需调整） */
.pub-header {
  display: block; /* 保持为块级元素，便于内容换行 */
  color: #23380C; /* 确保 pub-header 内部的默认文本颜色正确 */
}

.pub-controls {
  margin-top: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

</style>