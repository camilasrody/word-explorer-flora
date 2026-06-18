import { z } from 'zod'

export const paginationQuerySchema = z.object({
  page: z.coerce.number().positive().default(1),
  limit: z.coerce.number().positive().max(100).default(20),
  search: z.string().max(100).optional(),
})
