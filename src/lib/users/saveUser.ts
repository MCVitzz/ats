import generatePassword from '@/utils/generatePassword'

const saveUser = async ({
  email,
  name,
}: {
  name: string
  email: string
  id?: string
}) => {
  const password = await generatePassword()
  return await database.user.upsert({
    where: {
      email,
    },
    create: {
      email,
      name,
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    update: {
      name,
      email,
      updatedAt: new Date(),
    },
  })
}

export default saveUser
