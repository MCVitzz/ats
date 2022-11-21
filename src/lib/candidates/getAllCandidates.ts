import { Prisma } from '@prisma/client'

const getAllCandidates = async ({
  pageSize,
  pageIndex,
}: {
  pageSize: number
  pageIndex: number
}) => {
  const rows = await getData({ pageIndex, pageSize })

  const count = await database.candidate.count()

  return { rows, count }
}

const getData = async ({
  pageIndex,
  pageSize,
}: {
  pageIndex: number
  pageSize: number
}) => {
  const rows = await database.candidate.findMany({
    skip: pageIndex * pageSize,
    take: pageSize,
    include: {
      tags: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      lastName: 'asc',
    },
  })
  return rows
}

export type FullCandidate = ArrayElement<
  Prisma.PromiseReturnType<typeof getData>
>

export default getAllCandidates
