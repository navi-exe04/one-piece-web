<script setup lang="ts">
import type { Character } from '../types/OnePiece.types'

defineProps<{
  character: Character
  imageUrl?: string
}>()
</script>

<template>
  <div class="wanted-poster flex flex-col justify-between items-center text-center p-4">
    <p class="font-body text-5xl font-bold text-print-letter">WANTED</p>
    <img :src="imageUrl" alt="Jolly Roger" class="w-55 h-40 border-2 border-print-letter" />
    <div>
      <p class="font-body text-2xl font-bold text-print-letter">DEAD OR ALIVE</p>
      <h2 class="font-pirate text-3xl font-black text-print-letter tracking-wider">
        {{ character.name }}
      </h2>
      <p v-if="character.bounty !== ''" class="font-body text-2xl text-print-letter">
        <span class="font-bold">฿ </span>{{ character.bounty }}
      </p>
    </div>
  </div>
</template>
