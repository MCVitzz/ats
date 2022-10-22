/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client'

namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string
    DATABASE_URL: string
    NEXTAUTH_SECRET: string
    NEXTAUTH_URL: string
    PASSWORD_RECOVERY_TOKEN_SALT: string
    PASSWORD_DEFINITION_SALT: string
  }
}

declare global {
  // eslint-disable-next-line no-var
  var database: PrismaClient
}
