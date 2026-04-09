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
    <section class="max-w-200 mx-auto">
        <button @click="router.back()" class="bg-danger-red text-pirate-gold font-bold p-2 rounded-md cursor-pointer">
            ← Go back to the Grand Line
        </button>

        <div v-if="isLoading">Searching the character details...</div>

        <div v-else-if="selectedCharacter"
            class="bg-wanted-paper mt-8 px-4 py-6 rounded-md flex justify-between mx-auto">
            <div className="w-1/3 border-print-letter object-cover">
                <img :src="store.getCharacterImage(selectedCharacter.name) || OnePieceLogo"
                    :alt="selectedCharacter.name" class="w-full h-full object-cover shadow-lg">
            </div>
            <div className="w-2/3 flex flex-col justify-center">
                <div class="text-center mb-6">
                    <h1 class="font-pirate text-5xl text-print-letter">
                        {{ selectedCharacter.name }}
                    </h1>
                    <p v-if="selectedCharacter.bounty !== ''" class="font-body text-3xl text-print-letter">
                        <span class="font-bold">฿ </span>{{ selectedCharacter.bounty }}
                    </p>
                    <p class="font-body text-2xl text-print-letter">
                        {{ selectedCharacter.job }}
                    </p>
                    <p v-if="selectedCharacter.crew" class="font-body text-xl text-print-letter font-bold">
                        {{ selectedCharacter.crew.name }}
                    </p>
                    <div class="flex content-between font-body text-xl text-print-letter gap-4 justify-center mt-4">
                        <span v-if="selectedCharacter.size !== ''"><strong>Size:</strong> {{ selectedCharacter.size
                            }}</span>
                        <span v-if="selectedCharacter.age !== ''"><strong>Age:</strong> {{ selectedCharacter.age
                            }}</span>
                        <span v-if="selectedCharacter.status !== ''"><strong>Status:</strong> {{
                            selectedCharacter.status }}</span>
                    </div>
                </div>
                <div v-if="selectedCharacter.fruit" class="flex flex-col items-center">
                    <p class="text-xl text-print-letter font-pirate">
                        {{ selectedCharacter.fruit.name }}
                    </p>
                    <img :src="selectedCharacter.fruit.filename" alt="Fruit" class="w-30 h-30">
                </div>
            </div>
        </div>
    </section>
</template>