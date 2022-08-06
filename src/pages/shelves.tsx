// Next/React
import { InferGetStaticPropsType } from "next"

// Prisma
import { prisma } from "@/lib/primsa"
// Components
import Header from "@/components/Header"
import Footer from "@/components/Footer"
// Types
import BookCover from "@/components/BookCover"

const Shelves = ({ books }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const TBR = books.filter((book) => book.status === "TBR")
  const READ = books.filter((book) => book.status === "READ")
  const READING = books.filter((book) => book.status === "READING")
  const DNF = books.filter(
    (book) => book.status === "DNF" || book.status === "COLLECTION"
  )

  return (
    <main className='mb-auto h-1'>
      <div className='min-w-[75%] w-auto  max-w-min mx-auto space-y-6 '>
        <Header />
        <div className='flex flex-col items-stretch'>
          <>
            <h2 className=' bg-gray-200 capitalise'>
              {READING.length} Reading
            </h2>
            <ul className='flex  flex-wrap border-b border-gray-600 p-2 '>
              {READING.map((book) => (
                <BookCover book={book} key={book.id} showStats={false} />
              ))}
            </ul>
            <h2 className='bg-gray-200 capitalise'>{TBR.length} TBR</h2>
            <ul className='flex  flex-wrap border-b border-gray-600 p-2 '>
              {TBR.map((book) => (
                <BookCover book={book} key={book.id} showStats={false} />
              ))}
            </ul>
            <h2 className='bg-gray-200 capitalize'>{READ.length} Read</h2>
            <ul className='flex  flex-wrap border-b border-gray-600 p-2'>
              {READ.map((book) => (
                <BookCover book={book} key={book.id} showStats={false} />
              ))}
            </ul>
            <h2 className='bg-gray-200 capitalize'>
              {DNF.length} Unsorted/DNF
            </h2>
            <ul className='flex  flex-wrap border-b border-gray-600 p-2'>
              {DNF.map((book) => (
                <BookCover book={book} key={book.id} showStats={false} />
              ))}
            </ul>
            <h2 className='capitalize'>{books.length} Total</h2>
          </>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default Shelves

export const getStaticProps = async () => {
  const allBooks = await prisma.book.findMany()
  // Limit to 100 books at a time
  const books = allBooks.slice(0, 101)

  return {
    props: {
      books: JSON.parse(JSON.stringify(books))
    }
  }
}
