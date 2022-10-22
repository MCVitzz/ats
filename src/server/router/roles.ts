import deleteRole from '@/lib/roles/deleteRole'
import getAllRoles from '@/lib/roles/getAllRoles'
import saveRole from '@/lib/roles/saveRole'
import { z } from 'zod'
import { authedProcedure, t } from '../trpc'

export const rolesRouter = t.router({
  getAll: authedProcedure
    .input(
      z.object({
        pageIndex: z.number().min(0),
        pageSize: z.number().min(0),
      })
    )
    .query(({ input }) => getAllRoles(input)),
  save: authedProcedure
    .input(
      z.object({
        id: z.string().optional(),
        name: z.string().min(1),
      })
    )
    .mutation(({ input }) => saveRole(input)),
  delete: authedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input }) => deleteRole(input)),
})
