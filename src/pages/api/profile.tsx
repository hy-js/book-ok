import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/primsa";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const profile = await prisma.profile.findFirst();
    res.status(200).json(profile);
  } catch (error) {
    console.log(error);
  }
};

export default handler;
