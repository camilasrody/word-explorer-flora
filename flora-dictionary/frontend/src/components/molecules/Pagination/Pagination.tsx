import { cn } from '@/lib/utils'

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

function getPages(page: number, totalPages: number): (number | '...')[] {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)

  const pages: (number | '...')[] = [1]

  if (page > 3) pages.push('...')

  const start = Math.max(2, page - 1)
  const end = Math.min(totalPages - 1, page + 1)
  for (let i = start; i <= end; i++) pages.push(i)

  if (page < totalPages - 2) pages.push('...')

  pages.push(totalPages)
  return pages
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = getPages(page, totalPages)

  const btn =
    'inline-flex items-center justify-center min-w-[2rem] h-8 px-2 text-xs font-medium transition-colors disabled:cursor-not-allowed'

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1 pt-2 flex-wrap">
      {/* First */}
      <button
        className={cn(btn, 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 disabled:opacity-40')}
        onClick={() => onPageChange(1)}
        disabled={page <= 1}
        aria-label="First page"
      >
        «
      </button>

      {/* Prev */}
      <button
        className={cn(btn, 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 disabled:opacity-40')}
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
      >
        ‹
      </button>

      {/* Page numbers */}
      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className="inline-flex items-center justify-center min-w-[2rem] h-8 px-1 text-xs text-gray-400">
            …
          </span>
        ) : (
          <button
            key={p}
            className={cn(
              btn,
              p === page
                ? 'bg-violet-600 text-white'
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
            )}
            onClick={() => onPageChange(p)}
            aria-current={p === page ? 'page' : undefined}
          >
            {p}
          </button>
        ),
      )}

      {/* Next */}
      <button
        className={cn(btn, 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 disabled:opacity-40')}
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
      >
        ›
      </button>

      {/* Last */}
      <button
        className={cn(btn, 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 disabled:opacity-40')}
        onClick={() => onPageChange(totalPages)}
        disabled={page >= totalPages}
        aria-label="Last page"
      >
        »
      </button>
    </nav>
  )
}
