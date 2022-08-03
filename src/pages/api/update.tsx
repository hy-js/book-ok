import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../lib/primsa"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    id: bookId,
    status,
    ISBN,
    title,
    author,
    pages,
    publishedYear
  } = req.body
  console.log(status)
  try {
    const updateBook = await prisma.book.update({
      where: {
        id: bookId
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
