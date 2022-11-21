const getAllTags = async () => {
  return await database.tag.findMany({
    orderBy: {
      name: 'asc',
    },
  })
}

export default getAllTags
