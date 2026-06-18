import { prisma } from '../config/database'
import type { PaginationParams } from '../types'

export function addToHistory(userId: string, wordId: string) {
  return prisma.history.create({ data: { userId, wordId } })
}

export async function getHistory(userId: string, params: PaginationParams) {
  const { page, limit } = params
  const skip = (page - 1) * limit

  const [history, total] = await prisma.$transaction([
    prisma.history.findMany({
      where: { userId },
      skip,
      take: limit,
      orderBy: { viewedAt: 'desc' },
      include: { word: { select: { word: true } } },
    }),
    prisma.history.count({ where: { userId } }),
  ])

  return { history, total }
}

export function clearHistory(userId: string) {
  return prisma.history.deleteMany({ where: { userId } })
}
