import { findWords } from '../repositories/word.repository'
import { buildPaginatedResult } from '../utils/pagination.util'
import type { PaginationParams } from '../types'

export async function listWords(params: PaginationParams) {
  const { words, total } = await findWords(params)
  return buildPaginatedResult(
    words.map((w) => w.word),
    total,
    params,
  )
}
