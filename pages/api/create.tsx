import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/primsa";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { ISBN } = req.body;
  console.log(ISBN);

  try {
    await prisma.book.create({
      data: {
        ISBN,
      },
    });
    res.status(200).json({ message: "Book Added" });
  } catch (error) {
    console.log(error);
  }
};

export default handler;
