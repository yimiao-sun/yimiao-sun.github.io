<script setup lang="ts">
import { computed } from "vue"
import type { PropType } from "vue"

type Award =
  | string
  | {
      url: string
      label?: string
    }

const props = defineProps({
  award: {
    type: [String, Object] as PropType<Award>,
    default: null,
  },
  defaultLabel: {
    type: String,
    default: "Paper Award",
  },
  iconClass: {
    type: String,
    default: "fa fa-trophy",
  },
})

const awardUrl = computed(() => {
  if (!props.award) return ""
  return typeof props.award === "string" ? props.award : props.award.url
})

const awardLabel = computed(() => {
  if (!props.award) return ""
  if (typeof props.award === "string") return props.defaultLabel
  return props.award.label || props.defaultLabel
})
</script>

<template>
  <a
    v-if="awardUrl"
    class="badge badge-award"
    target="_blank"
    rel="noopener noreferrer"
    :href="awardUrl"
  >
    <i :class="iconClass" aria-hidden="true"></i>
    {{ awardLabel }}
  </a>
</template>
