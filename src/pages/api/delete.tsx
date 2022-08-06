import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../lib/primsa"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body
  console.log(id)
  try {
    const book = await prisma.book.delete({
      where: { id: Number(id) }
    })
    res.status(200).json({ message: "Book Deleted", book })
  } catch (error) {
    console.log(error)
  }
}

export default handler
