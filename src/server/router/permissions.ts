import deletePermission from '@/lib/permissions/deletePermission'
import getAllPermissions from '@/lib/permissions/getAllPermissions'
import savePermission from '@/lib/permissions/savePermission'
import { z } from 'zod'
import { authedProcedure, t } from '../trpc'

export const permissionsRouter = t.router({
  getAll: authedProcedure
    .input(
      z.object({
        pageIndex: z.number().min(0),
        pageSize: z.number().min(0),
      })
    )
    .query(({ input }) => getAllPermissions(input)),
  save: authedProcedure
    .input(
      z.object({
        id: z.string().optional(),
        name: z.string().min(1),
      })
    )
    .mutation(({ input }) => savePermission(input)),
  delete: authedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input }) => deletePermission(input)),
})
