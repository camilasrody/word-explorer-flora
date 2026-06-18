'use client'

import { memo, useCallback } from 'react'
import { WordCard } from '@/components/molecules/WordCard'
import { Pagination } from '@/components/molecules/Pagination'
import { Spinner } from '@/components/atoms/Spinner'
import { EmptyState } from '@/components/atoms/EmptyState'
import type { PaginatedResponse, FavoriteItem } from '@/types'

interface WordListProps {
  data?: PaginatedResponse<string>
  isLoading: boolean
  page: number
  onPageChange: (page: number) => void
  onWordClick: (word: string) => void
  favorites?: FavoriteItem[]
  onFavoriteToggle?: (word: string, isFav: boolean) => void
}

export const WordList = memo(function WordList({
  data,
  isLoading,
  page,
  onPageChange,
  onWordClick,
  favorites,
  onFavoriteToggle,
}: WordListProps) {
  const handleFavToggle = useCallback(
    (word: string, isFav: boolean) => onFavoriteToggle?.(word, isFav),
    [onFavoriteToggle],
  )

  if (isLoading) {
    return (
      <div className="flex justify-center py-16" aria-live="polite" aria-busy>
        <Spinner size="lg" />
      </div>
    )
  }

  if (!data?.results.length) {
    return <EmptyState title="No words found" description="Try a different search term." />
  }

  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col gap-1" role="list" aria-label="Word list">
        {data.results.map((word) => {
          const isFav = favorites?.some((f) => f.word === word) ?? false
          return (
            <li key={word}>
              <WordCard
                word={word}
                isFavorite={isFav}
                onClick={() => onWordClick(word)}
                onFavoriteToggle={
                  onFavoriteToggle ? () => handleFavToggle(word, isFav) : undefined
                }
              />
            </li>
          )
        })}
      </ul>
      <Pagination page={page} totalPages={data.totalPages} onPageChange={onPageChange} />
    </div>
  )
})
