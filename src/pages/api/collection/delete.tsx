import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/lib/primsa"
import { getSession } from "next-auth/react"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body
  const session = await getSession({ req })
  if (session) {
    try {
      const deletedBook = await prisma.interaction.deleteMany({
        where: {
          bookId: id,
          userId: session.user.id,
        }
      })
      res.status(200).json({ deletedBook })
    } catch (error) {
      console.log(error)
    }
  }
}

export default handler
