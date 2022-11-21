import deleteCandidate from '@/lib/candidates/deleteCandidate'
import getAllCandidates from '@/lib/candidates/getAllCandidates'
import saveCandidate from '@/lib/candidates/saveCandidate'
import { z } from 'zod'
import { authedProcedure, t } from '../trpc'

export const candidatesRouter = t.router({
  getAll: authedProcedure
    .input(
      z.object({
        pageIndex: z.number().min(0),
        pageSize: z.number().min(0),
      })
    )
    .query(({ input }) => getAllCandidates(input)),
  save: authedProcedure
    .input(
      z.object({
        id: z.string().optional(),
        email: z.string().email(),
        address: z.string(),
        city: z.string(),
        desiredPay: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        phone: z.string(),
        zipCode: z.string(),
        ownerId: z.string().optional(),
        tags: z.array(
          z.object({ id: z.string().optional(), name: z.string() })
        ),
      })
      // .refine(({ id, ownerId }) => !xor(!!id, !!ownerId)) //If we have id, we need an ownerId, if not, we create it in business logic
    )
    .mutation(({ input, ctx: { session } }) =>
      saveCandidate(input, session.user)
    ),
  delete: authedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input }) => deleteCandidate(input)),
})
