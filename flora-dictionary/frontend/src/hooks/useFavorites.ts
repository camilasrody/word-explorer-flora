import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getFavorites, addFavorite, removeFavorite } from '@/services/user.service'

export function useFavorites(page = 1) {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['favorites', page],
    queryFn: () => getFavorites(page),
  })

  const addMutation = useMutation({
    mutationFn: addFavorite,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['favorites'] }),
  })

  const removeMutation = useMutation({
    mutationFn: removeFavorite,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['favorites'] }),
  })

  return {
    ...query,
    addFavorite: addMutation.mutate,
    removeFavorite: removeMutation.mutate,
    isAdding: addMutation.isPending,
    isRemoving: removeMutation.isPending,
  }
}
