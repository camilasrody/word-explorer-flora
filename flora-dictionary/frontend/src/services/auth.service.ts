import type { AuthResponse } from '@/types'

const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api'

async function req<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  })

  if (res.status === 204) return undefined as T

  const data = (await res.json()) as { message?: string }
  if (!res.ok) throw new Error(data.message ?? `HTTP ${res.status}`)
  return data as T
}

export function signup(name: string, email: string, password: string) {
  return req<AuthResponse>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  })
}

export function signin(email: string, password: string) {
  return req<AuthResponse>('/auth/signin', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export function signout() {
  return req<void>('/auth/signout', { method: 'POST' })
}
