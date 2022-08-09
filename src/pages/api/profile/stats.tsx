import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import { prisma } from "../../../lib/primsa"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  if (session) {
    const profile = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        name: true,
        email: true,
        readingGoal: true,
        image: true,
        books: true
      }
    })
    res.status(200).json(profile)
  } else {
    res.status(403).json({
      message: "You must be sign in to view the protected content on this page."
    })
  }
}

export default handler
