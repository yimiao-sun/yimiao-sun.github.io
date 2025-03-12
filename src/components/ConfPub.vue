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
  <h2 style="font-size: 18pt">Conference Paper</h2>
  
  <ul class="pub-list" reversed>
    <li v-for="pub in pubArr.slice(0, visibleCount)" :key="pub.entry.id">
      <div>
        <span style="color: #193C6C; font-size: 13pt; font-weight: bold" class="pub note" v-if="pub.note">[{{ pub.note }}]</span>
        <span> "</span>
        <span style="font-size: 13pt; text-decoration: underline;" :href="pub.entry.URL" target="_blank">{{ pub.entry.title }}</span>
        <span>". </span><br>
        <span class="pub" style="font-size: 13pt" v-html="pub.entry.authors"></span>
        <span>. </span>
      </div>
      <div>
        <a class="badge badge-abs" @click="showFlag[pub.entry.id].abs = !showFlag[pub.entry.id].abs">Abstract</a>
        <a class="badge badge-bib" @click="showFlag[pub.entry.id].bib = !showFlag[pub.entry.id].bib">BibTex</a>
        <SlidesBadge :slidesUrl="pub.resources.pdf" />
        <VideoBadge :videoUrl="pub.resources.slides" />
        <CodeBadge :codeUrl="pub.resources.code" />
        <DemoBadge :demoUrl="pub.resources.demo" />
        <HomeBadge :homeUrl="pub.resources.home" />
        <AwardBadge :awardUrl="pub.resources.award" />
        
        <p class="text-block" v-if="showFlag[pub.entry.id].abs">{{ pub.abstract }}</p>

        <div class="text-block" v-if="showFlag[pub.entry.id].bib">
          <button class="bib" @click.prevent="copyToClipboard(pub.bibtex, pub.entry.id, 'BibTeX')">Copy BibTeX</button>
          <button class="bib" @click.prevent="copyToClipboard(pub.acl, pub.entry.id, 'ACL')">Copy ACL</button>
          <button class="bib" @click.prevent="copyToClipboard(pub.gb7714, pub.entry.id, 'GB/T7714')">Copy GB/T7714</button>
          <span>{{ copyStatus[pub.entry.id] }}</span>
          <p>{{ pub.bibtex }}</p>
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
.show-more-btn {
  margin-top: 10px;
  padding: 6px 12px;
  background-color: #79A9D9;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.show-more-btn:hover {
  background-color: #117BB2;
}
</style>
