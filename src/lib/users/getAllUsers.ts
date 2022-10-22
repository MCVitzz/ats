const getAllUsers = async ({
  pageSize,
  pageIndex,
}: {
  pageSize: number
  pageIndex: number
}) => {
  const rows = await database.user.findMany({
    skip: pageIndex * pageSize,
    take: pageSize,
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  const count = await database.user.count()

  return { rows, count }
}

export default getAllUsers
