
import { getSession } from "next-auth/react"
import { prisma } from "@/lib/primsa"

import BookCover from "@/components/BookCover"

const Shelves = ({interactions}) => {

  const TBR = interactions.filter((book) => book.status === "TBR")
  const READ = interactions.filter((book) => book.status === "READ")
  const READING = interactions.filter((book) => book.status === "READING")
  const DNF = interactions.filter((book) => book.status === "DNF" || book.status === "COLLECTION")


  return (
    <main className='mb-auto h-max'>
      <div className='min-w-[75%] w-auto  max-w-min mx-auto space-y-6 '>
      <h2 className='bg-gray-200 bg-red-200 capitalize'>
              Your Shelves
            </h2>
        <div className='flex flex-col items-stretch'>

          <>
            <h2 className=' bg-gray-200 capitalise'>
              {READING.length} Reading
            </h2>
            <ul className='flex  flex-wrap border-b border-gray-600 p-2 '>
              {READING.map((book) => (
                <BookCover
                  interaction={book}
                  book={book.book}
                  key={book.id}
                  showStats={true}
                />
              ))}
            </ul>
            <h2 className='bg-gray-200 capitalise'>{TBR.length} TBR</h2>
            <ul className='flex  flex-wrap border-b border-gray-600 p-2 '>
              {TBR.map((book) => (
                <BookCover
                  interaction={book}
                  book={book.book}
                  key={book.id}
                  showStats={true}
                />
              ))}
            </ul>
            <h2 className='bg-gray-200 capitalize'>{READ.length} Read</h2>
            <ul className='flex  flex-wrap border-b border-gray-600 p-2'>
              {READ.map((book) => (
                <BookCover
                  interaction={book}
                  book={book.book}
                  key={book.id}
                  showStats={true}
                />
              ))}
            </ul>
            <h2 className='bg-gray-200 capitalize'>
              {DNF.length} Unsorted / DNF
            </h2>
            <ul className='flex  flex-wrap border-b border-gray-600 p-2'>
              {DNF.map((book) => (
                <BookCover
                  interaction={book}
                  book={book.book}
                  key={book.id}
                  showStats={true}
                />
              ))}
            </ul>
            <h2 className='capitalize'>{interactions.length} Total</h2>
          </>
        </div>
      </div>
    </main>
  )
}

export default Shelves

export const getServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      props: {
        session: null
      }
    }
  }

  let interactions = await prisma.interaction.findMany({
    where: { userId: session.user.id  },
    include: {
      book: true
    },
    orderBy: {
      createdAt: "desc"
    },
    distinct: ['bookId']
  })


  return {
    props: {
      session,
      interactions: JSON.parse(JSON.stringify(interactions))
    }
  }
}