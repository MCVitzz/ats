const xor = async (a: boolean, b: boolean) => {
  console.log({ a, b, c: (a && !b) || (!a && b) })

  return (a && !b) || (!a && b)
}

export default xor
