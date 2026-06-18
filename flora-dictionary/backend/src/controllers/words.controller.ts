import type { Request, Response, NextFunction } from 'express'
import { listWords } from '../services/word.service'
import { getWordDetails } from '../services/dictionary.service'
import { parsePagination } from '../utils/pagination.util'
import { sendSuccess } from '../utils/response.util'

export async function handleListWords(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const params = parsePagination(req.query as Record<string, unknown>)
    const result = await listWords(params)
    sendSuccess(res, result)
  } catch (err) {
    next(err)
  }
}

export async function handleGetWord(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const word = req.params.word as string
    const userId = req.user?.sub
    const { data, cached, responseTime } = await getWordDetails(word, userId)
    res.set('x-cache', cached ? 'HIT' : 'MISS')
    res.set('x-response-time', `${responseTime}ms`)
    sendSuccess(res, data)
  } catch (err) {
    next(err)
  }
}
