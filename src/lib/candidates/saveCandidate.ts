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
    tags,
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
    tags: { id?: string; name: string }[]
  },
  user: SessionUser
) => {
  const p_ownerId = ownerId ?? user.id

  await database.tag.createMany({
    data: tags.filter((t) => !t.id).map((t) => ({ name: t.name })),
    skipDuplicates: true,
  })

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
      tags: { connect: tags },
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
      tags: { connect: tags },
      phone,
      zipCode,
      ownerId,
      updatedAt: new Date(),
    },
  })
}

export default saveCandidate
