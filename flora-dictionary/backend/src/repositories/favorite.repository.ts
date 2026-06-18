import { prisma } from '../config/database'
import type { PaginationParams } from '../types'

export function addFavorite(userId: string, wordId: string) {
  return prisma.favorite.create({
    data: { userId, wordId },
    include: { word: { select: { word: true } } },
  })
}

export function removeFavorite(userId: string, wordId: string) {
  return prisma.favorite.deleteMany({ where: { userId, wordId } })
}

export async function getFavorites(userId: string, params: PaginationParams) {
  const { page, limit } = params
  const skip = (page - 1) * limit

  const [favorites, total] = await prisma.$transaction([
    prisma.favorite.findMany({
      where: { userId },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { word: { select: { word: true } } },
    }),
    prisma.favorite.count({ where: { userId } }),
  ])

  return { favorites, total }
}

export async function isFavorite(userId: string, wordId: string) {
  const f = await prisma.favorite.findUnique({
    where: { userId_wordId: { userId, wordId } },
    select: { id: true },
  })
  return !!f
}
