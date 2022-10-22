// src/pages/api/trpc/[trpc].ts
import { createNextApiHandler } from '@trpc/server/adapters/next'
import { appRouter } from '@/server/router'
import { createContext } from '@/server/context'

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext,
  onError:
    process.env.NODE_ENV === 'development'
      ? ({ path, error, input }) => {
          console.log(input)

          console.error(`❌ tRPC failed on ${path}: ${error}`)
        }
      : undefined,
})
