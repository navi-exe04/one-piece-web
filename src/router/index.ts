// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue' // Tu lista de personajes

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/character/:id',
      name: 'character-detail',
      component: () => import('../views/CharacterDetail.vue'),
    },
  ],
})

export default router
