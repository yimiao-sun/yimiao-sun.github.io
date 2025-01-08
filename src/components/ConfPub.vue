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
    pubJson[i]["acl"] = cite.format(
      "bibliography",
      {
        format: 'text',
        template: "acl",
        lang: 'en-US'
      }
    )
    pubJson[i]["gb7714"] = cite.format(
      "bibliography",
      {
        format: 'text',
        template: "gb7714",
        lang: 'en-US'
      }
    )

    let authors = []
    for (let author of pubJson[i]["entry"]["author"]) {
      let authorString = `${author.given} ${author.family}`.trim()
      let finalAuthorString = authorString
      if (
        pubJson[i].authors.boldAuthors
        && pubJson[i].authors.boldAuthors.includes(authorString)
      ) {
        finalAuthorString = `<b>${finalAuthorString}</b>`
      }
      if (
        pubJson[i].authors.correspondingAuthors
        && pubJson[i].authors.correspondingAuthors.includes(authorString)
      ) {
        finalAuthorString = `${finalAuthorString}<sup>*</sup>`
      }
      if (
        pubJson[i].authors.equalContributionAuthors
        && pubJson[i].authors.equalContributionAuthors.includes(authorString)
      ) {
        finalAuthorString = `<u>${finalAuthorString}</u>`
      }
      authors.push(finalAuthorString)
    }
    pubJson[i]["entry"]["authors"] = authors.join(", ")
  }
  return pubJson
})

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
  <h2  style="font-size: 18pt">Conference Paper</h2>
  <!-- <p>
    <b>bold</b>: myself.
    <sup>*</sup>: corresponding author(s).
    <u>underline</u>: equal contributions.
  </p> -->
  <ul class="pub-list" reversed>
    <li v-for="pub in pubArr" :key="pub.entry.id">
      <div>
        <span style="color: #005ae0; font-size: 13pt; font-weight: bold" class="pub note" v-if="pub.note" font-style="Arial" >[{{ pub.note }}]</span>
        <span> "</span>
        <span style="font-size: 13pt; text-decoration: underline;" :href="pub.entry.URL" target="_blank" font-style="Arial">{{ pub.entry.title }}</span>
        <span>". </span><br>
        <span class="pub" style="font-size: 13pt" v-html="pub.entry.authors" font-style="Arial"></span>
        <span>. </span>
        <!-- <span class="pub" style="font-size: 13pt" >{{ pub.entry.issued["date-parts"][0][0] }}.</span> -->
        <!-- <span class="pub" style="font-size: 11pt" font-style="Arial"><em>{{ pub.entry["container-title"] }}</em>. {{ pub.entry.issued["date-parts"][0][0] }}.</span> -->
      </div>
      <div>
        <div>
          <a class="badge badge-abs" @click="showFlag[pub.entry.id].abs = !showFlag[pub.entry.id].abs">Abstract</a>
          <a class="badge badge-bib" @click="showFlag[pub.entry.id].bib = !showFlag[pub.entry.id].bib">BibTex</a>
          <SlidesBadge :slidesUrl="pub.resources.pdf" />
          <VideoBadge :videoUrl="pub.resources.slides" />
          <CodeBadge :codeUrl="pub.resources.code" />
          <DemoBadge :demoUrl="pub.resources.demo" />
          <HomeBadge :homeUrl="pub.resources.home" />
          <AwardBadge :awardUrl="pub.resources.award" />
        </div>
        
        <p class="text-block" v-if="showFlag[pub.entry.id].abs">{{ pub.abstract }}  </p>
        
        <div class="text-block" v-if="showFlag[pub.entry.id].bib">  
          <button class="bib" @click.prevent="copyToClipboard(pub.bibtex, pub.entry.id, 'BibTeX')">Copy BibTeX</button>
          <button class="bib" @click.prevent="copyToClipboard(pub.acl, pub.entry.id, 'ACL')">Copy ACL</button>
          <button class="bib" @click.prevent="copyToClipboard(pub.gb7714, pub.entry.id, 'GB/T7714')">Copy
            GB/T7714</button>
          <span>{{ copyStatus[pub.entry.id] }}</span>
          <p>{{ pub.bibtex }}</p>
        </div>
      </div>
    </li>
  </ul>
</template>
