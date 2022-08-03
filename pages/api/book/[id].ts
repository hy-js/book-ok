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
    console.log("Book could not be deleted");
  }
};

export default handler;
