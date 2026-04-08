<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useOnePieceStore } from '../stores/useOnePieceStore';

const store = useOnePieceStore();

const { characters, isLoading, error, totalCharacters } = storeToRefs(store);
const { fetchCharacters } = store;

onMounted(() => {
    fetchCharacters();
});
</script>

<template>
    <main class="container mx-auto px-4 py-8 max-w-7xl">

        <h1 class="font-elegant text-5xl md:text-6xl text-pirate-gold text-center mb-8 drop-shadow-md">
            One Wiki Piece 🏴‍☠️
        </h1>

        <div v-if="isLoading" class="font-body text-2xl text-wanted-paper text-center animate-pulse">
            Browsing the Grand Line...
        </div>

        <div v-else-if="error" class="bg-red-100 text-red-800 p-4 rounded-lg text-center max-w-lg mx-auto">
            <p class="font-bold">{{ error }}</p>
            <button @click="fetchCharacters"
                class="mt-4 px-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition-colors cursor-pointer">
                Retry Search
            </button>
        </div>

        <div v-else>
            <p class="font-body text-xl text-wanted-paper/80 text-center mb-8">
                Pirates and marines in the sea: {{ totalCharacters }}
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">

                <router-link v-for="character in characters" :key="character.id"
                    :to="{ name: 'character-detail', params: { id: character.id } }"
                    class="block transition-transform duration-300 hover:-translate-y-2 hover:drop-shadow-2xl">
                    <div class="wanted-poster flex flex-col justify-between items-center text-center p-4">
                        <p class="font-body text-5xl font-bold text-print-letter">
                            WANTED
                        </p>
                        <div>
                        </div>
                        <div>
                            <p class="font-body text-2xl font-bold text-print-letter">
                                DEAD OR ALIVE
                            </p>
                            <h2 class="font-pirate text-3xl font-black text-print-letter tracking-wider">
                                {{ character.name }}
                            </h2>
                            <p class="font-body text-2xl text-print-letter">
                                <span class="font-bold">฿ </span>{{ character.bounty }}
                            </p>
                        </div>
                    </div>
                </router-link>

            </div>
        </div>
    </main>
</template>