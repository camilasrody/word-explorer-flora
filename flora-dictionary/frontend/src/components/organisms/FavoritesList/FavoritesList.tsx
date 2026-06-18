'use client'

import { WordCard } from '@/components/molecules/WordCard'
import { Pagination } from '@/components/molecules/Pagination'
import { Spinner } from '@/components/atoms/Spinner'
import { EmptyState } from '@/components/atoms/EmptyState'
import { useFavoritesList } from '@/hooks/useFavoritesList'

export function FavoritesList() {
  const { page, setPage, data, isLoading, removeFavorite, handleWordClick } = useFavoritesList()

  if (isLoading) {
    return (
      <div className="flex justify-center py-16" aria-live="polite" aria-busy>
        <Spinner size="lg" />
      </div>
    )
  }

  if (!data?.results.length) {
    return (
      <EmptyState
        title="No favorites yet"
        description="Explore words and mark them as favorites."
      />
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col gap-1" role="list">
        {data.results.map(({ word, id }) => (
          <li key={id}>
            <WordCard
              word={word}
              isFavorite
              onClick={() => handleWordClick(word)}
              onFavoriteToggle={() => removeFavorite(word)}
            />
          </li>
        ))}
      </ul>
      <Pagination page={page} totalPages={data.totalPages} onPageChange={setPage} />
    </div>
  )
}
