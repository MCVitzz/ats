import getAllTags from '@/lib/tags/getAllTags'
import { authedProcedure, t } from '../trpc'

export const tagsRouter = t.router({
  getAll: authedProcedure.query(() => getAllTags()),
})
