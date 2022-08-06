// Next/React
import { GetServerSideProps } from "next"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, Variants } from "framer-motion"

// Prisma
import { prisma } from "@/lib/primsa"
// Components
import SearchbarShelves from "@/components/SearchbarShelves"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import BookCover from "@/components/BookCover"
import DeleteButton from "@/components/DeleteButton"
import UpdateButton from "@/components/UpdateButton"
// Types
import { CollectionBook } from "../lib/types"

const cardVariants: Variants = {
  offscreen: {
    y: 300
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
  }
}

const Collection = ({ books }: CollectionBook[]) => {
  const [view, setView] = useState(true)
  // searching
  const [searchTerm, setSearchTerm] = useState("")
  // sorting
  const [data, setData] = useState([])
  const [sortType, setSortType] = useState("createdAt")

  useEffect(() => {
    const sortArray = (type: string) => {
      const types = {
        createdAt: "createdAt",
        pages: "pages",
        title: "title",
        author: "author"
      }
      const sortProperty = types[type]
      console.log(sortProperty)
      if (sortProperty === "pages" || sortProperty === "createdAt") {
        const sorted: CollectionBook[] = [...books].sort(
          (a, b) => a[sortProperty] - b[sortProperty]
        )
        setData(sorted)
      } else {
        const sorted: CollectionBook[] = [...books].sort((a, b) =>
          a[sortProperty].localeCompare(b[sortProperty])
        )
        setData(sorted)
      }
    }

    sortArray(sortType)
  }, [sortType])

  return (
    <main className='mb-auto h-1'>
      <div className='min-w-[75%] w-auto max-w-min mx-auto space-y-6 '>
        <div className='flex flex-col items-stretch h-full'>
          <div className='mb-6 flex flex-col'>
            <button
              className='bg-slate-800 text-white rounded p-1'
              onClick={() => setView(!view)}>
              <h5>Change View</h5>
            </button>
            <h2 className='bg-gray-200  capitalize'>Sort Collection</h2>

            <select onChange={(e) => setSortType(e.target.value)}>
              <option value='createdAt'>Added</option>
              <option value='pages'>Pages</option>
              <option value='title'>Title</option>
              <option value='author'>Author</option>
            </select>
          </div>
          {view ? (
            <>
              <div className='mb-6 flex flex-col'>
                <h2 className='bg-gray-200  capitalize'>Search Collection</h2>
                <input
                  autoFocus
                  type='search'
                  placeholder='Author or title...'
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <ul className='flex flex-col'>
                {data
                  .filter((val: CollectionBook) => {
                    if (searchTerm === "") {
                      return val
                    } else if (
                      val.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      val.author
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return val
                    }
                  })
                  .map((book: CollectionBook) => (
                    <li key={book.id} className='border-b border-gray-600 p-2'>
                      <Link href={`/details/${book.id}`}>
                        <div className='flex justify-between'>
                          <div className='flex'>
                            {book.cover ? (
                              <>
                                <Image
                                  alt={book.title || "book cover"}
                                  src={`https://covers.openlibrary.org/b/id/${book.cover}-M.jpg`}
                                  className='w-[180px] h-[274px] object-cover border-gray-500 border-solid border-2'
                                  width={180}
                                  height={274}
                                />
                              </>
                            ) : (
                              <>
                                <div className='w-[180px] h-[274px] border-gray-500 border-solid border-2 p-2 bg-slate-400'>
                                  <h4>{book.title}</h4>
                                  <h5>{book.author}</h5>
                                </div>
                              </>
                            )}
                            <div className='flex-col p-3 '>
                              <h4>{book.publishedYear}</h4>
                              <h2 className='font-bold'>{book.title}</h2>
                              <h3 className='font-bold'>{book.author}</h3>
                              <h4>{book.ISBN}</h4>
                              {book.pages && <h4>{book.pages} pp.</h4>}
                              {/* <UpdateButton book={book} /> */}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
              </ul>
            </>
          ) : (
            <>
              <div className='mb-4 flex flex-col'>
                <h2 className='bg-gray-200  capitalize'>Add to collection</h2>
                <SearchbarShelves />
              </div>
              <ul className='flex  flex-wrap border-b border-gray-600 p-2'>
                {data.map((book) => (
                  <BookCover book={book} key={book.id} />
                ))}
              </ul>
              <h2 className='capitalize'>{data.length} Total</h2>
            </>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default Collection

export const getServerSideProps: GetServerSideProps = async () => {
  const books = await prisma.book.findMany({
    orderBy: {
      createdAt: "desc"
    }
  })

  return {
    props: {
      books: JSON.parse(JSON.stringify(books))
    }
  }
}
