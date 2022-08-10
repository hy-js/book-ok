import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/lib/primsa"
import { getSession } from "next-auth/react"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  const { id } = req.query
  if (session) {
    try {
      const interactions = await prisma.interaction.findMany({
        where: {
          bookId: id,
          userId: session.user.id,
        }
      })
      res.status(200).json(interactions)
    } catch (error) {
      console.log(error)
    }
  }
}

export default handler
