import type { PaginatedResponse, WordEntry } from '@/types'

const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api'

async function req<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  })

  const data = (await res.json()) as { message?: string }
  if (!res.ok) throw new Error(data.message ?? `HTTP ${res.status}`)
  return data as T
}

export function listWords(page = 1, limit = 20, search?: string) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) })
  if (search) params.set('search', search)
  return req<PaginatedResponse<string>>(`/entries/en?${params.toString()}`)
}

export function getWordDetails(word: string) {
  return req<WordEntry[]>(`/entries/en/${encodeURIComponent(word)}`)
}
