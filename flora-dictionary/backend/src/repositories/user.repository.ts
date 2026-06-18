import { prisma } from '../config/database'
import type { SignupInput } from '../schemas/auth.schema'

export function createUser(data: SignupInput & { password: string }) {
  return prisma.user.create({
    data,
    select: { id: true, name: true, email: true, createdAt: true },
  })
}

export function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } })
}

export function findUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, createdAt: true },
  })
}
