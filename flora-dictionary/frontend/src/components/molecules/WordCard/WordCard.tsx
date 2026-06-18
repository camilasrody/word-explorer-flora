import { memo } from 'react'
import { cn } from '@/lib/utils'

interface WordCardProps {
  word: string
  isFavorite?: boolean
  onClick?: () => void
  onFavoriteToggle?: () => void
  className?: string
}

export const WordCard = memo(function WordCard({
  word,
  isFavorite,
  onClick,
  onFavoriteToggle,
  className,
}: WordCardProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between border border-gray-200 bg-white px-4 py-2.5 transition-colors hover:border-violet-300 hover:bg-violet-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-violet-600 dark:hover:bg-gray-750',
        className,
      )}
    >
      <button
        type="button"
        onClick={onClick}
        className="flex-1 text-left text-sm font-medium text-gray-800 dark:text-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
        aria-label={`View details for ${word}`}
      >
        {word}
      </button>
      {onFavoriteToggle && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onFavoriteToggle()
          }}
          aria-label={isFavorite ? `Remove ${word} from favorites` : `Add ${word} to favorites`}
          aria-pressed={isFavorite}
          className="ml-3 text-lg leading-none text-gray-400 transition-colors hover:text-yellow-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
        >
          {isFavorite ? '★' : '☆'}
        </button>
      )}
    </div>
  )
})
