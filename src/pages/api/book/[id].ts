import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/primsa";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const bookId = req.query.id;

  if (req.method === "DELETE") {
    const book = await prisma.book.delete({
      where: { id: Number(bookId) },
    });
    res.json(book);
  } else {
    const details = await prisma.book.findUnique({
      where: {
        id: Number(bookId)
      }
    })
    res.status(200).json(details);
  }
};

export default handler;
