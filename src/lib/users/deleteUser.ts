const deleteUser = async ({ id }: { id: string }) => {
  return await database.user.delete({ where: { id } })
}

export default deleteUser
