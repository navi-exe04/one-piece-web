<script setup lang="ts">
import Header from './components/Header.vue';
</script>

<template>
  <main class="main-content">
    <Header />
    <section class="router-content">
      <router-view></router-view>
    </section>
  </main>
</template>

<style scoped>
.main-content {
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}
</style>