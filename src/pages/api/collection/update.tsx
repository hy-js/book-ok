import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/lib/primsa"
import { getSession } from "next-auth/react"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, status } = req.body
  const session = await getSession({ req })
  console.log(session)
  if (session) {
    try {
      const interaction = await prisma.interaction.create({
        data: {
          status: status,
          userId: session.user.id,
          bookId: id
        }
      })
      res.status(200).json({ interaction })
    } catch (error) {
      console.log(error)
    }
  }
}

export default handler
