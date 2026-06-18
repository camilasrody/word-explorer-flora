'use client'

import { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useWords } from './useWords'
import { useFavorites } from './useFavorites'
import { useDebounce } from './useDebounce'
import { setSelectedWord } from '@/store/slices/uiSlice'
import type { RootState } from '@/store'

export function useDictionaryPage() {
  const dispatch = useDispatch()
  const selectedWord = useSelector((state: RootState) => state.ui.selectedWord)

  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const debounced = useDebounce(search, 400)

  const { data, isLoading } = useWords(page, 20, debounced || undefined)
  const { data: favorites, addFavorite, removeFavorite } = useFavorites()

  const handleSearch = useCallback((v: string) => {
    setSearch(v)
    setPage(1)
  }, [])

  const handleFavoriteToggle = useCallback(
    (word: string, isFav: boolean) => {
      if (isFav) removeFavorite(word)
      else addFavorite(word)
    },
    [addFavorite, removeFavorite],
  )

  const handleWordClick = useCallback(
    (word: string) => dispatch(setSelectedWord(word)),
    [dispatch],
  )

  const handleModalClose = useCallback(
    () => dispatch(setSelectedWord(null)),
    [dispatch],
  )

  return {
    search,
    page,
    setPage,
    data,
    isLoading,
    favorites,
    selectedWord,
    handleSearch,
    handleFavoriteToggle,
    handleWordClick,
    handleModalClose,
  }
}
