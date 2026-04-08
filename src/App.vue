<script setup lang="ts">
import Navbar from './components/Navbar.vue';
</script>

<template>
  <main class="main-content">
    <Navbar />
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