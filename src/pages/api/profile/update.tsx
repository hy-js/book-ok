import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/lib/primsa"
import { getSession } from "next-auth/react"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  const {name, goal} = req.body

  if (session) {
    try {
      const updateUser = await prisma.user.update({
         where: { id: session.user.id },
         data: {
           name,
           readingGoal: Number(goal)
         }
       })
      res.status(200).json(updateUser)
    } catch (error) {
      console.log(error)
    }
  }
}

export default handler
