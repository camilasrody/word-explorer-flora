import {
  addFavorite,
  removeFavorite,
  getFavorites,
  isFavorite,
} from '../repositories/favorite.repository'
import { findOrCreateWord } from '../repositories/word.repository'
import { buildPaginatedResult } from '../utils/pagination.util'
import type { PaginationParams } from '../types'

export async function addWordToFavorites(userId: string, word: string) {
  const wordRecord = await findOrCreateWord(word.toLowerCase())
  const already = await isFavorite(userId, wordRecord.id)
  if (already) throw Object.assign(new Error('Word already favorited'), { statusCode: 409 })
  return addFavorite(userId, wordRecord.id)
}

export async function removeWordFromFavorites(userId: string, word: string) {
  const wordRecord = await findOrCreateWord(word.toLowerCase())
  await removeFavorite(userId, wordRecord.id)
}

export async function getUserFavorites(userId: string, params: PaginationParams) {
  const { favorites, total } = await getFavorites(userId, params)
  const results = favorites.map((f) => ({
    id: f.id,
    word: f.word.word,
    added: f.createdAt,
  }))
  return buildPaginatedResult(results, total, params)
}
