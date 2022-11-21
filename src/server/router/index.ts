// src/server/trpc/router/index.ts
import { t } from '../trpc'
import { authRouter } from './auth'
import { rolesRouter } from './roles'
import { usersRouter } from './users'
import { permissionsRouter } from './permissions'
import { candidatesRouter } from './candidates'
import { tagsRouter } from './tags'

export const appRouter = t.router({
  auth: authRouter,
  users: usersRouter,
  roles: rolesRouter,
  permissions: permissionsRouter,
  candidates: candidatesRouter,
  tags: tagsRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
