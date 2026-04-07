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
    <main class="container">
        <h1>Multiverso de One Piece 🏴‍☠️</h1>

        <div v-if="isLoading" class="loader">
            Navegando por el Grand Line...
        </div>

        <div v-else-if="error" class="error">
            {{ error }}
            <button @click="fetchCharacters">Reintentar Búsqueda</button>
        </div>

        <div v-else>
            <p class="summary">Piratas y Marines en la base de datos: {{ totalCharacters }}</p>

            <div class="grid">
                <router-link v-for="character in characters" :key="character.id"
                    :to="{ name: 'character-detail', params: { id: character.id } }" class="card-link">
                    <div class="card">
                        <h2>{{ character.name }}</h2>
                        <p>Recompensa: {{ character.bounty }}</p>
                    </div>
                </router-link>
            </div>
        </div>
    </main>
</template>

<style scoped>
.container {
    padding: 2rem;
    font-family: system-ui, -apple-system, sans-serif;
    max-width: 1200px;
    margin: 0 auto;
}

.summary {
    font-size: 1.2rem;
    color: #555;
    margin-bottom: 2rem;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
}

.card {
    border: 2px solid #eaeaea;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.error {
    color: #991b1b;
    background: #fee2e2;
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
}

button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 4px;
}
</style>