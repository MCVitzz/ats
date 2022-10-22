import createPassword from '@/utils/createPassword'
import { hash } from 'argon2'

const resetPassword = async ({
  token,
  password,
}: {
  token: string
  password: string
}) => {
  try {
    if (!process.env.PASSWORD_RECOVERY_TOKEN_SALT) return
    //Tokens are hashed in the Database
    const hashedToken = await hash(token, {
      salt: Buffer.from(process.env.PASSWORD_RECOVERY_TOKEN_SALT),
    })

    //Find the token, if it's not expired
    const resetToken = await database.userPasswordReset.findFirst({
      where: {
        token: hashedToken,
        // expiry: {
        // lte: new Date(),
        // },
      },
    })

    //TODO: Think about error handling
    if (!resetToken) return

    const userId = resetToken.userId

    //Hashing Password
    const hashedPassword = await createPassword(password)

    //Deleting all records of password resets for the user
    await database.userPasswordReset.deleteMany({ where: { userId } })

    //Update the password to the new password
    await database.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    })
  } catch (err) {
    console.log(err)
  }
}

export default resetPassword
