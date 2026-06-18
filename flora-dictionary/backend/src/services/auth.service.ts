import { hashPassword, comparePassword } from '../utils/hash.util'
import { signToken } from '../utils/jwt.util'
import { createUser, findUserByEmail } from '../repositories/user.repository'
import type { SignupInput, SigninInput } from '../schemas/auth.schema'

function makeAppError(message: string, statusCode: number): Error {
  return Object.assign(new Error(message), { statusCode })
}

export async function signup(data: SignupInput) {
  const existing = await findUserByEmail(data.email)
  if (existing) throw makeAppError('Email already in use', 409)

  const password = await hashPassword(data.password)
  const user = await createUser({ ...data, password })
  const token = signToken({ sub: user.id, email: user.email })

  return { user, token }
}

export async function signin(data: SigninInput) {
  const user = await findUserByEmail(data.email)
  if (!user) throw makeAppError('Invalid credentials', 401)

  const valid = await comparePassword(data.password, user.password)
  if (!valid) throw makeAppError('Invalid credentials', 401)

  const token = signToken({ sub: user.id, email: user.email })
  const { password: _pw, ...safeUser } = user

  return { user: safeUser, token }
}
