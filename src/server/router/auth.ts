import createRecoveryToken from '@/lib/auth/createRecoveryToken'
import resetPassword from '@/lib/auth/resetPassword'
import { z } from 'zod'
import { t } from '../trpc'

export const authRouter = t.router({
  recoverPassword: t.procedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .mutation(({ input }) => {
      createRecoveryToken(input)
    }),
  resetPassword: t.procedure
    .input(
      z.object({
        token: z.string(),
        password: z.string(),
      })
    )
    .mutation(({ input }) => resetPassword(input)),
})
