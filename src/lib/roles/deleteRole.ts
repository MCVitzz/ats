const deleteRole = async ({ id }: { id: string }) => {
  return await database.role.delete({ where: { id } })
}

export default deleteRole
