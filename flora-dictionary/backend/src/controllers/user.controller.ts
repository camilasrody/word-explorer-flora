import type { Request, Response, NextFunction } from 'express'
import { findUserById } from '../repositories/user.repository'
import { getUserHistory, deleteUserHistory } from '../services/history.service'
import {
  getUserFavorites,
  addWordToFavorites,
  removeWordFromFavorites,
} from '../services/favorite.service'
import { parsePagination } from '../utils/pagination.util'
import { sendSuccess, sendNoContent, sendError } from '../utils/response.util'

export async function handleGetProfile(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const user = await findUserById(req.user!.sub)
    if (!user) { sendError(res, 'User not found', 404); return }
    sendSuccess(res, user)
  } catch (err) {
    next(err)
  }
}

export async function handleGetHistory(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const params = parsePagination(req.query as Record<string, unknown>)
    const result = await getUserHistory(req.user!.sub, params)
    sendSuccess(res, result)
  } catch (err) {
    next(err)
  }
}

export async function handleClearHistory(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await deleteUserHistory(req.user!.sub)
    sendNoContent(res)
  } catch (err) {
    next(err)
  }
}

export async function handleGetFavorites(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const params = parsePagination(req.query as Record<string, unknown>)
    const result = await getUserFavorites(req.user!.sub, params)
    sendSuccess(res, result)
  } catch (err) {
    next(err)
  }
}

export async function handleAddFavorite(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await addWordToFavorites(req.user!.sub, req.params.word as string)
    sendNoContent(res)
  } catch (err) {
    next(err)
  }
}

export async function handleRemoveFavorite(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await removeWordFromFavorites(req.user!.sub, req.params.word as string)
    sendNoContent(res)
  } catch (err) {
    next(err)
  }
}
