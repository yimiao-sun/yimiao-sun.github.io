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
  <div class="profile-root">
    <div class="profile-box">
      <div class="profile-left">
        <h1 class="name">{{ metaContent.name }}</h1>
        <div class="desc" v-html="description"></div>

        <div class="contacts" aria-hidden="false">
          <a
            v-for="(contact, key) in metaContent.contact"
            :key="key"
            :href="contact.url"
            class="contact-link"
            :aria-label="key"
            :title="key"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i :class="contact.icon" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </div>

    <div class="profile-photo">
      <img src="../assets/photo.jpg" alt="personal photo" />
    </div>
  </div>
</template>

<style scoped>
.profile-root {
  display: flex;
  align-items: stretch;
  gap: 16px;
  width: 100%;
  box-sizing: border-box;
}

/* 左侧的圆角矩形框：仅包文字部分 */
.profile-box {
  flex: 1 1 auto;
  background-color: #D7DFCF;
  border-radius: 16px;
  padding: 18px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

.profile-left {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #23380C; /* 文字颜色 */
  min-width: 0;
}

.name {
  font-size: 16pt;
  margin: 0 0 8px 0;
  color: #23380C;
  line-height: 1.1;
}

.desc {
  font-size: 12.5pt;
  color: #23380C;
  white-space: pre-wrap;
  word-break: break-word;
}

/* 缩短 contacts 与上一行的距离（从 12px -> 6px） */
.contacts {
  margin-top: -25px;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 调整 icon 链接尺寸与交互 */
.contact-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 36px;
  text-decoration: none;
  border-radius: 6px;
  transition: background 0.15s ease, transform 0.12s ease;
  background: transparent;
  border: none;
  padding: 0;
}

/* 默认图标颜色与大小 */
.contact-link i {
  color: #966A4A; /* 图标颜色 */
  font-size: 2rem;
  line-height: 1;
  transition: color 0.12s ease, transform 0.12s ease;
}

/* hover 时图标颜色更深并微微放大 */
.contact-link:hover {
  cursor: pointer;
  transform: translateY(-1px);
}

.contact-link:hover i {
  color: #78553B; /* 更深的颜色（比 #966A4A 深） */
  transform: scale(1.06);
}

/* 右侧图片，不在圆角框内 */
.profile-photo {
  flex: 0 0 182px; /* 固定宽度 */
  display: flex;
  align-items: stretch;
  overflow: hidden;
}

.profile-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

@media (max-width: 600px) {
  .profile-root {
    flex-direction: column;
  }
  .profile-photo {
    flex: 0 0 auto;
    width: 100%;
    height: 180px;
    margin-top: 12px;
  }
  .profile-photo img {
    height: 100%;
  }
}
</style>
