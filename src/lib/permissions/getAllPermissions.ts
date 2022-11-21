const getAllPermissions = async ({
  pageSize,
  pageIndex,
}: {
  pageSize: number
  pageIndex: number
}) => {
  const rows = await database.permission.findMany({
    skip: pageIndex * pageSize,
    take: pageSize,
    orderBy: {
      name: 'asc',
    },
  })

  const count = await database.permission.count()

  return { rows, count }
}

export default getAllPermissions
