//
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/primsa";
import axios from "axios";
import { OLBOOK } from "../../../lib/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const bookId = req.query.id;
  const specificBook = await prisma.book.findFirst({
    where: {
      id: Number(bookId),
    },
  });
  const bookISBN = specificBook?.ISBN;

  try {
    const response = await axios.get(
      `https://openlibrary.org/isbn/${bookISBN}.json`
    );
    let { data } = response;

    try {
      const updateBook = await prisma.book.update({
        where: {
          id: specificBook?.id,
        },
        data: {
          OLkey: data.key,
          title: data.title,
          publishedYear: data.publish_date,
          pages: data.number_of_pages,
        },
      });
      res.status(200).json({ updateBook, message: "Book Added" });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

export default handler;
