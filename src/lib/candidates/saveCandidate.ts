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

  const tagNames = tags.map((t) => ({ name: t.name }))

  await database.tag.createMany({
    data: tagNames,
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
      tags: { connect: tagNames },
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
      tags: { set: tagNames },
      phone,
      zipCode,
      ownerId,
      updatedAt: new Date(),
    },
  })
}

export default saveCandidate
