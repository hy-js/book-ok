import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import { prisma } from "../../lib/primsa"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  if (session) {
    const interaction = await prisma.interaction.findMany({
      where: { userId: session.user.id }
    })
    res.status(200).json(interaction)
  } else {
    res.status(403).json({
      message: "You must be sign in to view the protected content on this page."
    })
  }
}

export default handler
