// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { hash } from 'argon2'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: await hash('ats') })
}
