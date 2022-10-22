import { hash } from 'argon2'

const createPassword = async (password: string) => {
  if (!process.env.PASSWORD_DEFINITION_SALT)
    throw new Error('Wrong Environment Variables!!')
  return await hash(password, {
    salt: Buffer.from(process.env.PASSWORD_DEFINITION_SALT),
  })
}

export default createPassword
