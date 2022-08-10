import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/primsa";
import { getSession } from "next-auth/react"
import axios from "axios"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  const { key } = req.body
  const OLkey = key.split("/")[2]

  if (session) {
    try {
      const response = await axios.get(
        `http://openlibrary.org/search.json?q=${OLkey}`
      )
      let {
        data: { docs }
      } = response
      console.log(docs)

      try {
        const newBook = await prisma.book.create({
          data: {
            ISBN: docs[0].isbn[0],
            OLkey: docs[0].key,

            title: docs[0].title,
            author: docs[0].author_name[0],

            cover: docs[0].cover_i,
            pages: docs[0].number_of_pages_median,
            publishedYear: docs[0].first_publish_year
          }
        })
        // Add to logged in user's collection
        const interaction = await prisma.interaction.create({
          data: {
            status: "COLLECTION",
            userId: session.user.id,
            bookId: newBook.id
          }
        })
        res.status(200).json({ message: "Book Added", interaction })
      } catch (error) {
        console.log(error)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export default handler;
