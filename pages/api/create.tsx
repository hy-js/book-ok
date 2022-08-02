import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/primsa";
import axios from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { ISBN } = req.body;
  console.log(ISBN);
  try {
    const response = await axios.get(
      `https://openlibrary.org/isbn/${ISBN}.json`
    );
    let { data } = response;

    try {
      await prisma.book.create({
        data: {
          ISBN: data.isbn_13[0],
          OLkey: data.key,
          title: data.title,
          publishedYear: data.publish_date,
          publisher: data.publishers[0],
          pages: data.number_of_pages,
        },
      });
      res.status(200).json({ message: "Book Added" });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {}
};

export default handler;
