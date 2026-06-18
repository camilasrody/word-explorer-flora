import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getHistory, clearHistory } from '@/services/user.service'

export function useHistory(page = 1) {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['history', page],
    queryFn: () => getHistory(page),
  })

  const clearMutation = useMutation({
    mutationFn: clearHistory,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['history'] }),
  })

  return {
    ...query,
    clearHistory: clearMutation.mutate,
    isClearing: clearMutation.isPending,
  }
}
