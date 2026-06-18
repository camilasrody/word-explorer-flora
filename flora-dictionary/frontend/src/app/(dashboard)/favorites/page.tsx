'use client'

import { useDispatch, useSelector } from 'react-redux'
import { FavoritesList } from '@/components/organisms/FavoritesList'
import { WordModal } from '@/components/organisms/WordModal'
import { setSelectedWord } from '@/store/slices/uiSlice'
import type { RootState } from '@/store'

export default function FavoritesPage() {
  const dispatch = useDispatch()
  const selectedWord = useSelector((state: RootState) => state.ui.selectedWord)

  return (
    <>
      <div className="flex flex-col gap-6">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Favorites</h1>
        <FavoritesList />
      </div>
      <WordModal word={selectedWord} onClose={() => dispatch(setSelectedWord(null))} />
    </>
  )
}

