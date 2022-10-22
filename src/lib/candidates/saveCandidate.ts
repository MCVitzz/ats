import { SessionUser } from '@/types/next-auth'

const saveCandidate = async (
  {
    email,
    address,
    city,
    desiredPay,
    firstName,
    lastName,
    ownerId,
    phone,
    zipCode,
  }: {
    id?: string
    email: string
    address: string
    city: string
    desiredPay: string
    firstName: string
    lastName: string
    phone: string
    zipCode: string
    ownerId?: string
  },
  user: SessionUser
) => {
  const p_ownerId = ownerId ?? user.id

  console.log({ p_ownerId })

  return await database.candidate.upsert({
    where: {
      email,
    },
    create: {
      email,
      address,
      city,
      desiredPay,
      firstName,
      lastName,
      phone,
      zipCode,
      ownerId: p_ownerId,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    update: {
      email,
      address,
      city,
      desiredPay,
      firstName,
      lastName,
      phone,
      zipCode,
      ownerId,
      updatedAt: new Date(),
    },
  })
}

export default saveCandidate
