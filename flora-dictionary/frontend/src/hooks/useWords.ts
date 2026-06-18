import { useQuery } from '@tanstack/react-query'
import { listWords, getWordDetails } from '@/services/words.service'

export function useWords(page = 1, limit = 20, search?: string) {
  return useQuery({
    queryKey: ['words', page, limit, search],
    queryFn: () => listWords(page, limit, search),
    placeholderData: (prev) => prev,
  })
}

export function useWordDetails(word: string | null) {
  return useQuery({
    queryKey: ['word', word],
    queryFn: () => getWordDetails(word!),
    enabled: !!word,
    staleTime: 5 * 60 * 1000,
  })
}
