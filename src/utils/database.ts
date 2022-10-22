import { PrismaClient } from '@prisma/client'

// See here: https://github.com/prisma/prisma-client-js/issues/228#issuecomment-618433162
let database: PrismaClient

if (process.env.NODE_ENV === 'production') {
  database = new PrismaClient()
}
// `stg` or `dev`
else {
  if (!global.database) {
    global.database = new PrismaClient()
  }

  database = global.database
}

export default database
