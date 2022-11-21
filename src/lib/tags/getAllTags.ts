const getAllTags = async () => {
  return await database.tag.findMany()
}

export default getAllTags
