import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/primsa";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const myBooks = await prisma.book.findMany({});
    res.status(200).json(myBooks);
  } catch (error) {
    console.log(error);
  }
};

export default handler;
