const deleteCandidate = async ({ id }: { id: string }) => {
  return await database.candidate.delete({ where: { id } })
}

export default deleteCandidate
