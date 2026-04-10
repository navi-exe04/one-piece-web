// src/stores/useOnePieceStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Character } from '../types/OnePiece.types'

export const useOnePieceStore = defineStore('onePiece', () => {
  const characters = ref<Character[]>([])
  const selectedCharacter = ref<Character | null>(null)
  const charactersMedia = ref<any[]>([])
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const totalCharacters = computed<number>(() => characters.value.length)

  // // Functions and actions
  // Obtain all the characters from API
  const fetchCharacters = async (): Promise<void> => {
    error.value = null
    try {
      const response = await fetch('https://api.api-onepiece.com/v2/characters/en')

      if (!response.ok) {
        throw new Error('Error in the request to the Grand Line')
      }

      const data: Character[] = await response.json()
      characters.value = data
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = 'Error: An unexpected error occurred.'
      }
      console.error(err)
    }
  }

  //Obtain a character from API
  const fetchCharacterById = async (id: string): Promise<void> => {
    isLoading.value = true
    try {
      const response = await fetch(`https://api.api-onepiece.com/v2/characters/en/${id}`)
      const data: Character = await response.json()
      selectedCharacter.value = data
    } catch (err) {
      console.error('Error searching the character:', err)
    } finally {
      isLoading.value = false
    }
  }

  // Obtain all the media information from Jikan
  const fetchCharactersMedia = async () => {
    try {
      // One Piece Id is 21 in MyAnimeList
      const res = await fetch('https://api.jikan.moe/v4/anime/21/characters')
      const data = await res.json()
      charactersMedia.value = data.data
    } catch (error) {
      console.error('Error al obtener el Cast de Jikan:', error)
    }
  }

  const fetchOnePieceInformation = async () => {
    isLoading.value = true
    try {
      if (!characters.value.length) {
        await fetchCharacters()
      }

      if (!charactersMedia.value.length) {
        await fetchCharactersMedia()
      }
    } catch (err) {
      console.error('Error obtaining the One Piece information:', err)
    } finally {
      isLoading.value = false
    }
  }

  // Obtain the imagen of the character
  const getCharacterImage = (apiName: string): string | null => {
    if (!charactersMedia.value.length) return null
    // Normalize the name to match the Jikan API
    const searchParts = apiName.toLowerCase().replaceAll(/[.,]/g, '').split(' ')

    // Search the caracter in media
    const match = charactersMedia.value.find((media) => {
      const characterName = media.character.name.toLowerCase().replaceAll(/[.,]/g, '')
      return searchParts.every((part) => characterName.includes(part))
    })

    return match ? match.character.images.jpg.image_url : null
  }

  return {
    characters,
    isLoading,
    error,
    selectedCharacter,
    charactersMedia,
    totalCharacters,
    fetchOnePieceInformation,
    fetchCharacterById,
    fetchCharactersMedia,
    fetchCharacters,
    getCharacterImage,
  }
})
