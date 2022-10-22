import deleteUser from '@/lib/users/deleteUser'
import getAllUsers from '@/lib/users/getAllUsers'
import saveUser from '@/lib/users/saveUser'
import { z } from 'zod'
import { authedProcedure, t } from '../trpc'

export const usersRouter = t.router({
  getAll: authedProcedure
    .input(
      z.object({
        pageIndex: z.number().min(0),
        pageSize: z.number().min(0),
      })
    )
    .query(({ input }) => getAllUsers(input)),
  save: authedProcedure
    .input(
      z.object({
        id: z.string().optional(),
        name: z.string().min(1),
        email: z.string().min(1),
      })
    )
    .mutation(({ input }) => saveUser(input)),
  delete: authedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input }) => deleteUser(input)),
})
