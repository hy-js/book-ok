import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/primsa";
import axios from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req.body;
  console.log(query);
  try {
    const response = await axios.get(
      `http://openlibrary.org/search.json?q=${query}`
    );
    let {
      data: { docs },
    } = response;
    // console.log(docs[0].author_name[0]);

    try {
      await prisma.book.create({
        data: {
          ISBN: docs[0].isbn[0],
          OLkey: docs[0].key,

          title: docs[0].title,
          author: docs[0].author_name[0],

          cover: docs[0].cover_i,
          pages: docs[0].number_of_pages_median,
          publishedYear: docs[0].first_publish_year,
        },
      });
      res.status(200).json({ message: "Book Added" });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {}
};

export default handler;
