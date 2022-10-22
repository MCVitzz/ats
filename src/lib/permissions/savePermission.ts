const savePermission = async ({ id, name }: { name: string; id?: string }) => {
  if (id)
    return await database.permission.update({
      where: {
        id,
      },
      data: {
        name,
        updatedAt: new Date(),
      },
    })
  else
    return await database.permission.create({
      data: {
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })
}

export default savePermission
