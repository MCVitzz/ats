const getAllRoles = async ({
  pageSize,
  pageIndex,
}: {
  pageSize: number
  pageIndex: number
}) => {
  const rows = await database.role.findMany({
    skip: pageIndex * pageSize,
    take: pageSize,
    orderBy: {
      name: 'asc',
    },
  })

  const count = await database.role.count()

  return { rows, count }
}

export default getAllRoles
