import type { PaginationParams, PaginatedResult } from '../types'

export function parsePagination(query: Record<string, unknown>): PaginationParams {
  const page = Math.max(1, Number(query.page) || 1)
  const limit = Math.min(100, Math.max(1, Number(query.limit) || 20))
  const search =
    typeof query.search === 'string' && query.search.trim()
      ? query.search.trim()
      : undefined
  return { page, limit, search }
}

export function buildPaginatedResult<T>(
  results: T[],
  totalDocs: number,
  params: PaginationParams,
): PaginatedResult<T> {
  const totalPages = Math.ceil(totalDocs / params.limit)
  return {
    results,
    totalDocs,
    page: params.page,
    totalPages,
    hasNext: params.page < totalPages,
    hasPrev: params.page > 1,
  }
}
