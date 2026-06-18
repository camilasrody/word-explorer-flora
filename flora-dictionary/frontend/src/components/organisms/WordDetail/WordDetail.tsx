'use client'

import { Badge } from '@/components/atoms/Badge'
import { Button } from '@/components/atoms/Button'
import { Spinner } from '@/components/atoms/Spinner'
import { EmptyState } from '@/components/atoms/EmptyState'
import { useWordDetails } from '@/hooks/useWords'
import { useWordFavorite } from '@/hooks/useWordFavorite'
import type { WordEntry } from '@/types'

interface WordDetailProps {
  word: string
}

export function WordDetail({ word }: WordDetailProps) {
  const { data, isLoading, error } = useWordDetails(word)
  const { isFav, toggle: handleFavoriteToggle, isLoading: isFavLoading } = useWordFavorite(word)

  if (isLoading) {
    return (
      <div className="flex justify-center py-16" aria-live="polite" aria-busy>
        <Spinner size="lg" />
      </div>
    )
  }

  if (error) return <EmptyState title="Word not found" description={error.message} />
  if (!data || data.length === 0) return <EmptyState title="No details available" />

  const entry: WordEntry = data[0]

  return (
    <article className="flex flex-col gap-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{entry.word}</h1>
          {entry.phonetics.map(
            (p, i) =>
              p.text && (
                <p key={i} className="text-sm text-gray-500 dark:text-gray-400">
                  {p.text}
                </p>
              ),
          )}
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleFavoriteToggle}
          loading={isFavLoading}
          aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
          aria-pressed={isFav}
        >
          {isFav ? '★ Favorited' : '☆ Favorite'}
        </Button>
      </header>

      {entry.meanings.map((meaning, i) => (
        <section key={i}>
          <Badge variant="violet" className="mb-3">
            {meaning.partOfSpeech}
          </Badge>
          <ol className="flex flex-col gap-3">
            {meaning.definitions.map((def, j) => (
              <li key={j} className="flex flex-col gap-1">
                <p className="text-sm text-gray-800 dark:text-gray-200">{def.definition}</p>
                {def.example && (
                  <p className="text-xs italic text-gray-500 dark:text-gray-400">
                    &ldquo;{def.example}&rdquo;
                  </p>
                )}
              </li>
            ))}
          </ol>
          {meaning.synonyms.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-1">
              <span className="text-xs font-medium text-gray-500">Synonyms:</span>
              {meaning.synonyms.slice(0, 6).map((s) => (
                <Badge key={s}>{s}</Badge>
              ))}
            </div>
          )}
        </section>
      ))}
    </article>
  )
}
