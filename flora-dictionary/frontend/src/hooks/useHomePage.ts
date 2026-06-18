'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useWords } from './useWords'
import { useDebounce } from './useDebounce'
import { useFavorites } from './useFavorites'
import { useHistory } from './useHistory'

export function useHomePage() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const debounced = useDebounce(search, 400)

  const { data: words, isLoading } = useWords(page, 20, debounced || undefined)
  const { data: history } = useHistory()
  const { data: favorites, addFavorite, removeFavorite } = useFavorites()

  const handleWordClick = useCallback(
    (word: string) => router.push(`/words/${encodeURIComponent(word)}`),
    [router],
  )

  const handleSearch = useCallback((value: string) => {
    setSearch(value)
    setPage(1)
  }, [])

  const handleFavoriteToggle = useCallback(
    (word: string, isFav: boolean) => {
      if (isFav) removeFavorite(word)
      else addFavorite(word)
    },
    [addFavorite, removeFavorite],
  )

  return {
    search,
    page,
    setPage,
    debounced,
    words,
    isLoading,
    history,
    favorites,
    handleWordClick,
    handleSearch,
    handleFavoriteToggle,
  }
}
