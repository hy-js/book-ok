import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../lib/primsa"
import axios from "axios"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, status, ISBN, title, author, pages, publishedYear } =
    req.body
  try {
    const updateBook = await prisma.book.update({
      where: {
        id: id
      },
      data: {
        status,
        ISBN,
        title,
        author,
        pages,
        publishedYear
      }
    })
    res.status(200).json({ message: "Book Updated", updateBook })
  } catch (error) {
    console.log(error)
  }
}

export default handler
