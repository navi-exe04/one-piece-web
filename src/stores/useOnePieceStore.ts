// src/stores/useOnePieceStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Character } from '../types/OnePiece.types'

export const useOnePieceStore = defineStore('onePiece', () => {
  const characters = ref<Character[]>([])
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const selectedCharacter = ref<Character | null>(null)

  const totalCharacters = computed<number>(() => characters.value.length)

  // 4. ACTIONS
  const fetchCharacters = async (): Promise<void> => {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch('https://api.api-onepiece.com/v2/characters/en')

      if (!response.ok) {
        throw new Error('Error en la petición al Grand Line')
      }

      const data: Character[] = await response.json()
      characters.value = data
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = '¡Rayos! Ocurrió un error inesperado.'
      }
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  const fetchCharacterById = async (id: string): Promise<void> => {
    isLoading.value = true
    try {
      const response = await fetch(`https://api.api-onepiece.com/v2/characters/en/${id}`)
      const data: Character = await response.json()
      selectedCharacter.value = data
    } catch (err) {
      console.error('Error al buscar el pirata:', err)
    } finally {
      isLoading.value = false
    }
  }

  return {
    characters,
    isLoading,
    error,
    selectedCharacter,
    totalCharacters,
    fetchCharacters,
    fetchCharacterById,
  }
})
