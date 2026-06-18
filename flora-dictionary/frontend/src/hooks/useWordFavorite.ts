'use client'

import { useFavorites } from './useFavorites'

export function useWordFavorite(word: string) {
  const { data: favData, addFavorite, removeFavorite, isAdding, isRemoving } = useFavorites()

  const isFav = favData?.results.some((f) => f.word === word) ?? false

  function toggle() {
    if (isFav) removeFavorite(word)
    else addFavorite(word)
  }

  return { isFav, toggle, isLoading: isAdding || isRemoving }
}
