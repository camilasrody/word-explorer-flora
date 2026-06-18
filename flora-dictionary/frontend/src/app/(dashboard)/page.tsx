'use client'

import { SearchBar } from '@/components/molecules/SearchBar'
import { WordList } from '@/components/organisms/WordList'
import { WordModal } from '@/components/organisms/WordModal'
import { useDictionaryPage } from '@/hooks/useDictionaryPage'
import { useHistory } from '@/hooks/useHistory'

export default function HomePage() {
  const {
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
  } = useDictionaryPage()

  const { data: history } = useHistory()

  return (
    <>
      <div className="flex flex-col gap-6">
        <SearchBar
          value={search}
          onChange={handleSearch}
          className="sm:max-w-sm"
          placeholder="Search words…"
        />

        {history?.results && history.results.length > 0 && !search && (
          <section aria-labelledby="history-heading">
            <h2
              id="history-heading"
              className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500"
            >
              Recent searches
            </h2>
            <ul className="flex flex-wrap gap-2" role="list">
              {history.results.slice(0, 10).map(({ id, word }) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => handleWordClick(word)}
                    className="border border-gray-200 bg-white px-3 py-1 text-xs text-gray-700 transition-colors hover:border-violet-300 hover:bg-violet-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  >
                    {word}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        <WordList
          data={data}
          isLoading={isLoading}
          page={page}
          onPageChange={setPage}
          onWordClick={handleWordClick}
          favorites={favorites?.results}
          onFavoriteToggle={handleFavoriteToggle}
        />
      </div>

      <WordModal word={selectedWord} onClose={handleModalClose} />
    </>
  )
}
