<script setup lang="ts">
</script>

<template>
    <header class="navbar">
        <div class="nav-content">
            <h2 class="logo">One Piece <span>Wiki</span></h2>
            <nav>
                <router-link to="/">Inicio</router-link>
            </nav>
        </div>
    </header>
</template>

<style scoped>
.navbar {
    color: white;
    padding: 1rem 2rem;
    position: sticky;
    top: 0;
    z-index: 100;
}

.nav-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    margin: 0;
    font-size: 1.5rem;
}

.logo span {
    color: #fbbf24;
    /* Un amarillo tipo oro pirata */
}

nav a {
    color: white;
    text-decoration: none;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background-color 0.2s;
}

nav a:hover,
nav a.router-link-active {
    /* Vue Router añade automáticamente la clase .router-link-active al enlace actual */
    background-color: #333;
    color: #fbbf24;
}
</style>