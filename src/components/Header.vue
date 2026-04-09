<script setup lang="ts">
import JollyRoger from '../assets/jolly-roger.png'
</script>

<template>
  <header class="py-6">
    <div class="flex items-center justify-center gap-4">
      <h1 class="font-pirate text-5xl md:text-6xl text-pirate-gold text-center drop-shadow-md">
        One Piece Wiki
      </h1>
      <img :src="JollyRoger" alt="Jolly Roger" class="w-30 h-30 object-cover" />
    </div>
  </header>
</template>
