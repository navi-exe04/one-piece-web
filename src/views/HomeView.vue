<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useOnePieceStore } from '@/stores/useOnePieceStore'
import OnePieceLogo from '@/assets/op-logo.png'
import LoadingIcon from '@/components/LoadingIcon.vue'
import WanterPoster from '@/components/WanterPoster.vue'

const store = useOnePieceStore()

const { characters, isLoading, error, totalCharacters, charactersMedia } = storeToRefs(store)
const { fetchOnePieceInformation } = store

onMounted( () => {
  fetchOnePieceInformation()
})
</script>

<template>
  <main class="container mx-auto px-4 py-8 max-w-7xl">
    <div v-if="isLoading" class="font-body text-2xl text-wanted-paper text-center animate-pulse">
      <span>Browsing the Grand Line...</span>
      <LoadingIcon />
    </div>

    <div
      v-else-if="error"
      class="bg-red-100 text-red-800 p-4 rounded-lg text-center max-w-lg mx-auto"
    >
      <p class="font-bold">{{ error }}</p>
      <button
        @click="fetchOnePieceInformation"
        class="mt-4 px-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition-colors cursor-pointer"
      >
        Retry Search
      </button>
    </div>

    <div v-else>
      <p class="font-body text-xl text-white text-center mb-8">
        Pirates and marines in the sea: {{ totalCharacters }}
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        <router-link
          v-for="character in characters"
          :key="character.id"
          :to="{ name: 'character-detail', params: { id: character.id } }"
          class="block transition-transform duration-300 hover:-translate-y-2 hover:drop-shadow-2xl"
        >
          <WanterPoster
            :character="character"
            :image-url="store.getCharacterImage(character.name) || OnePieceLogo"
          />
        </router-link>
      </div>
    </div>
  </main>
</template>
