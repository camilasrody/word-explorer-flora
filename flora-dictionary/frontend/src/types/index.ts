export interface User {
  id: string
  name: string
  email?: string
  createdAt?: string
}

export interface Phonetic {
  text?: string
  audio?: string
}

export interface Definition {
  definition: string
  example?: string
  synonyms: string[]
  antonyms: string[]
}

export interface Meaning {
  partOfSpeech: string
  definitions: Definition[]
  synonyms: string[]
  antonyms: string[]
}

export interface WordEntry {
  word: string
  phonetics: Phonetic[]
  meanings: Meaning[]
  sourceUrls?: string[]
}

export interface PaginatedResponse<T> {
  results: T[]
  totalDocs: number
  page: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface HistoryItem {
  id: string
  word: string
  added: string
}

export interface FavoriteItem {
  id: string
  word: string
  added: string
}

export interface AuthResponse {
  id: string
  name: string
  token: string
}
