import { generate } from 'generate-password'
import createPassword from './createPassword'

const generatePassword = async () => {
  const pwd = generate({
    length: 8,
    numbers: true,
  })

  console.log(`Creating password ${pwd}`)

  return await createPassword(pwd)
}

export default generatePassword
