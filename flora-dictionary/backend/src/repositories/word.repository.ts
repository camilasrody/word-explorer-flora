import { prisma } from '../config/database'
import type { PaginationParams } from '../types'

export async function findWords(params: PaginationParams) {
  const { page, limit, search } = params
  const skip = (page - 1) * limit
  const where = search
    ? { word: { contains: search, mode: 'insensitive' as const } }
    : {}

  const [words, total] = await prisma.$transaction([
    prisma.word.findMany({ where, skip, take: limit, orderBy: { word: 'asc' } }),
    prisma.word.count({ where }),
  ])

  return { words, total }
}

export function findOrCreateWord(word: string) {
  return prisma.word.upsert({
    where: { word },
    update: {},
    create: { word },
  })
}

export function countWords() {
  return prisma.word.count()
}
