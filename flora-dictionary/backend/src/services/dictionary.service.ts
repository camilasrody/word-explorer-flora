import { redis } from '../config/redis'
import { findOrCreateWord } from '../repositories/word.repository'
import { addToHistory } from '../repositories/history.repository'

const DICTIONARY_API = 'https://api.dictionaryapi.dev/api/v2/entries/en'
const CACHE_TTL = 3600

export async function getWordDetails(word: string, userId?: string) {
  const cacheKey = `dict:${word.toLowerCase()}`
  const start = Date.now()

  const cached = await redis.get(cacheKey).catch(() => null)
  if (cached) {
    if (userId) await trackView(userId, word).catch(() => null)
    return { data: JSON.parse(cached) as unknown, cached: true, responseTime: Date.now() - start }
  }

  const res = await fetch(`${DICTIONARY_API}/${encodeURIComponent(word)}`)
  if (!res.ok) {
    throw Object.assign(new Error(`Word "${word}" not found`), { statusCode: 404 })
  }

  const data: unknown = await res.json()
  await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(data)).catch(() => null)

  if (userId) await trackView(userId, word).catch(() => null)

  return { data, cached: false, responseTime: Date.now() - start }
}

async function trackView(userId: string, word: string) {
  const wordRecord = await findOrCreateWord(word.toLowerCase())
  await addToHistory(userId, wordRecord.id)
}
