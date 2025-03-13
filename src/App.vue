<script setup>
import Bio from './components/Bio.vue'
import NewsList from './components/NewsList.vue'
import EducationList from './components/EducationList.vue'
import ConfPub from './components/ConfPub.vue'
import JourPub from './components/JourPub.vue'
import Selected from './components/Selected.vue'
import AwardList from './components/AwardList.vue'
// import SoftwareList from './components/SoftwareList.vue'
// import TalkList from './components/TalkList.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <header>
    <Bio />
    <hr>
  </header>

  <NewsList />
  <hr>
  <EducationList />
  <hr>
  <Selected />
  <hr>
  <ConfPub />
  <hr>
  <JourPub />
  <hr>
  <AwardList />
  <hr>
  <!-- <TalkList /> -->
  <!-- <SoftwareList /> -->

  <footer>
    <Footer />
  </footer>
</template>

<style>

</style>
