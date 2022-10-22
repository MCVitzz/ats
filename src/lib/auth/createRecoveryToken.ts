import database from '@/utils/database'
import sendEmail from '@/utils/sendMail'
import { hash } from 'argon2'
import { add } from 'date-fns'
import { v4 as uuid } from 'uuid'

const createRecoveryToken = async ({ email }: { email: string }) => {
  const user = await database.user.findUnique({ where: { email } })

  if (!user) return

  const token = uuid()

  if (!process.env.PASSWORD_RECOVERY_TOKEN_SALT) return

  const hashedToken = await hash(token, {
    salt: Buffer.from(process.env.PASSWORD_RECOVERY_TOKEN_SALT),
  })

  const res = await database.userPasswordReset.create({
    data: {
      expiry: add(new Date(), {
        days: 1,
      }),
      token: hashedToken,
      userId: user.id,
    },
  })

  //TODO: Think about error handling
  if (!res.id) return

  sendEmail({ destination: user.email, token })
}

export default createRecoveryToken
