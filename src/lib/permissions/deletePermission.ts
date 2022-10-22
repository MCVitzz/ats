const deletePermission = async ({ id }: { id: string }) => {
  return await database.permission.delete({ where: { id } })
}

export default deletePermission
