import type { User, PaginatedResponse, HistoryItem, FavoriteItem } from '@/types'

const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api'

async function req<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  })

  if (res.status === 204) return undefined as T

  const data = (await res.json()) as { message?: string }
  if (!res.ok) throw new Error(data.message ?? `HTTP ${res.status}`)
  return data as T
}

export function getProfile() {
  return req<User>('/user/me')
}

export function getHistory(page = 1, limit = 20) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) })
  return req<PaginatedResponse<HistoryItem>>(`/user/me/history?${params.toString()}`)
}

export function clearHistory() {
  return req<void>('/user/me/history', { method: 'DELETE' })
}

export function getFavorites(page = 1, limit = 20) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) })
  return req<PaginatedResponse<FavoriteItem>>(`/user/me/favorites?${params.toString()}`)
}

export function addFavorite(word: string) {
  return req<void>(`/entries/en/${encodeURIComponent(word)}/favorite`, {
    method: 'POST',
  })
}

export function removeFavorite(word: string) {
  return req<void>(`/entries/en/${encodeURIComponent(word)}/unfavorite`, {
    method: 'DELETE',
  })
}
