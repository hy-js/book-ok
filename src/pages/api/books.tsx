import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/primsa";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let allBooks = await prisma.book.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });
    res.status(200).json(allBooks);
  } catch (error) {
    console.log(error);
  }
};

export default handler;
