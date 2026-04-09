<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useOnePieceStore } from '../stores/useOnePieceStore';
import OnePieceLogo from '../assets/op-logo.png';

const route = useRoute();
const router = useRouter();
const store = useOnePieceStore();

const { selectedCharacter, isLoading } = storeToRefs(store);

onMounted(() => {
    const id = route.params.id as string;
    store.fetchCharacterById(id);
});
</script>

<template>
    <div class="detail-container">
        <button @click="router.back()" class="back-btn">← Volver al Grand Line</button>

        <div v-if="isLoading">Cargando detalles del pirata...</div>

        <div v-else-if="selectedCharacter" class="detail-card">
            <h1>{{ selectedCharacter.name }}</h1>
            <div class="info">
                <p><strong>Recompensa:</strong> {{ selectedCharacter.bounty }}</p>
                <p><strong>Tamaño:</strong> {{ selectedCharacter.size }}</p>
                <div v-if="selectedCharacter.fruit" class="fruit-info">
                    <h3>Fruta: {{ selectedCharacter.fruit.name }}</h3>
                    <p>{{ selectedCharacter.fruit.description }}</p>
                </div>
                <div class="image-container">
                    <img :src="store.getCharacterImage(selectedCharacter.name) || OnePieceLogo"
                        :alt="selectedCharacter.name">
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.detail-container {
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
}

.back-btn {
    margin-bottom: 1rem;
    cursor: pointer;
    border: none;
    background: #333;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
}

.detail-card {
    background: #f9f9f9;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
</style>