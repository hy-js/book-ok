import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../lib/primsa"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { csv } = req.body
  console.log(csv)
  try {
    csv.map((row: { "ISBN/UID": string; Title: string; Authors: string }) => {
      prisma.book.create({
        data: {
          ISBN: row["ISBN/UID"],
          title: row.Title,
          author: row.Authors
        }
      })
    })
    res.status(200).json({ message: "Book Added" })
  } catch (error) {
    console.log(error)
  }
}

export default handler
