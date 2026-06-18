export interface JwtPayload {
  sub: string
  email: string
  iat?: number
  exp?: number
}

export interface PaginationParams {
  page: number
  limit: number
  search?: string
}

export interface PaginatedResult<T> {
  results: T[]
  totalDocs: number
  page: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface AppError extends Error {
  statusCode: number
}
