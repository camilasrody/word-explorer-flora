import { getHistory, clearHistory } from '../repositories/history.repository'
import { buildPaginatedResult } from '../utils/pagination.util'
import type { PaginationParams } from '../types'

export async function getUserHistory(userId: string, params: PaginationParams) {
  const { history, total } = await getHistory(userId, params)
  const results = history.map((h) => ({
    id: h.id,
    word: h.word.word,
    added: h.viewedAt,
  }))
  return buildPaginatedResult(results, total, params)
}

export function deleteUserHistory(userId: string) {
  return clearHistory(userId)
}
