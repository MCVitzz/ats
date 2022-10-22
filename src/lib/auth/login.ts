import { User } from '@prisma/client'
import database from '@/utils/database'
import { verify } from 'argon2'

export default async function login(
  email: string,
  password: string
): Promise<User> {
  const user = await database.user.findUnique({ where: { email } })
  if (!user) throw new Error('Credentials not valid.')

  const valid = await verify(user.password, password)

  if (valid) return user
  else throw new Error('Credentials not valid.')
}
