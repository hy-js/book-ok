import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/primsa";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const profile = await prisma.profile.findFirst({
      select: {
        id: true,
        username: true,
        readingGoal: true,
        books: {
          select: {
            id: true,
            ISBN: true
          }
        }
      }
    })
    res.status(200).json(profile);
  } catch (error) {
    console.log(error);
  }
};

export default handler;
