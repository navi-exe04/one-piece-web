<script setup lang="ts">
</script>

<template>
  <main class="main-content">
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