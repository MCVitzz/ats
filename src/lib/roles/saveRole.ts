const saveRole = async ({ id, name }: { name: string; id?: string }) => {
  if (id)
    return await database.role.update({
      where: {
        id,
      },
      data: {
        name,
        updatedAt: new Date(),
      },
    })
  else
    return await database.role.create({
      data: {
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })
}

export default saveRole
