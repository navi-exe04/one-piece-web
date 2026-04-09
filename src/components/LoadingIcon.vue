<script setup lang="ts">
import Loading from '../assets/loading.png';
</script>

<template>
    <div class="flex items-center justify-center h-full animate-spin">
        <img :src="Loading" alt="Loading" class="w-25 h-25">
    </div>
</template>