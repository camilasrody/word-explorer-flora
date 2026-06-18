'use client'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useFavorites } from './useFavorites'
import { setSelectedWord } from '@/store/slices/uiSlice'

export function useFavoritesList() {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const { data, isLoading, removeFavorite } = useFavorites(page)

  function handleWordClick(word: string) {
    dispatch(setSelectedWord(word))
  }

  return { page, setPage, data, isLoading, removeFavorite, handleWordClick }
}
