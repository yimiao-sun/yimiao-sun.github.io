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
        <!-- 顶部一行：name 在左，icons 在右 -->
        <div class="top-row">
          <h1 class="name">{{ metaContent.name }}</h1>

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

        <!-- 描述放在顶行下面，自动换行 -->
        <div class="desc" v-html="description"></div>
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

/* 顶部一行：姓名 + 图标（右对齐） */
.top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  margin-bottom: 0; /* Changed from 0px to 0 */
}

/* 顶部一行：姓名 + 图标（右对齐） */
.top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  margin-bottom: 0px; /* Changed from 0px to 0 */
}

.name {
  font-size: 16pt;
  margin: 0;
  color: #23380C;
  line-height: 1.1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 描述文字 */
.desc {
  font-size: 12.5pt;
  color: #23380C;
}

.desc :last-child {
  margin-bottom: 0 !important;
  padding-bottom: 0 !important;
}


/* contacts：与 name 同一行右侧 */
.contacts {
  margin-top: 0; /* 已放到顶行，因此不需要负 margin */
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 调整 icon 链接尺寸与交互 */
.contact-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;   /* 缩小一点以节省水平空间 */
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
  font-size: 2rem; /* 稍微调整为常规尺寸，避免占太多高度 */
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

/* 小屏时：顶行垂直排列，图标放到 name 下方（更友好） */
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

  .top-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .name {
    font-size: 18px;
  }

  .contact-link {
    width: 44px;
  }
}
</style>
