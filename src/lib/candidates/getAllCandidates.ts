const getAllCandidates = async ({
  pageSize,
  pageIndex,
}: {
  pageSize: number
  pageIndex: number
}) => {
  const rows = await database.candidate.findMany({
    skip: pageIndex * pageSize,
    take: pageSize,
  })

  const count = await database.candidate.count()

  return { rows, count }
}

export default getAllCandidates
