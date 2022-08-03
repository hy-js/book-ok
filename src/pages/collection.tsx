import Header from "../components/Header"
import { GetServerSideProps } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import Link from "next/link"
import { useState } from "react"
import { prisma } from "../lib/primsa"

import Footer from "../components/Footer"

interface Books {
  books: {
    id: string
    ISBN: string
    OLkey: string
    status: string

    title: string
    author: string

    cover: string
    publishedYear: string
    pages: string
  }[]
}

interface FormData {
  id: string
  query: string
  status: string
}

const Collection = ({ books }: Books) => {
  const [view, setView] = useState(false)
  const [form, setForm] = useState<FormData>({
    id: "",
    query: "",
    status: ""
  })
  const router = useRouter()

  const refreshData = () => {
    router.replace(router.asPath)
  }

  const createBook = async (data: FormData) => {
    try {
      fetch("http://localhost:3000/api/create", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      }).then(() => {
        if (data.id) {
          deleteBook(data.id)
          setForm({ query: "", id: "", status: "" })
          refreshData()
        } else {
          setForm({ query: "", id: "", status: "" })
          refreshData()
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const deleteBook = async (id: string) => {
    try {
      fetch(`http://localhost:3000/api/book/${id}`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "DELETE"
      }).then(() => refreshData())
    } catch (error) {
      console.log("error")
    }
  }

  const checkBook = async (id: string) => {
    try {
      fetch(`http://localhost:3000/api/check/${id}`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "GET"
      })
    } catch (error) {
      console.log("error")
    }
  }

  const handleSubmit = async (data: FormData) => {
    try {
      createBook(data)
    } catch (error) {
      console.log(error)
    }
  }

  const TBR = books.filter((book) => book.status === "TBR")
  const READ = books.filter((book) => book.status === "READ")
  const READING = books.filter((book) => book.status === "READING")
  const DNF = books.filter((book) => book.status === "DNF")

  return (
    <>
      <div className='min-w-[80%] w-auto  max-w-min mx-auto space-y-6 '>
        <Header />
        <div className='flex flex-col items-stretch h-full'>
          <h2 className='READ capitalize'>{books.length} in collection</h2>
          <button
            className='bg-slate-800 text-white rounded p-1'
            onClick={() => setView(!view)}>
            <h5>Change View =</h5>
          </button>
          {view ? (
            <>
              <ul className='flex flex-col-reverse'>
                {books.map((book) => (
                  <li key={book.id} className='border-b border-gray-600 p-2'>
                    <Link href={`/details/${book.id}`}>
                      <div className='flex justify-between'>
                        <div className='flex'>
                          <a
                            href={`https://openlibrary.org${book.OLkey}`}
                            target='_blank'
                            rel='noopener noreferrer'>
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
                          </a>
                          <div className='flex-col p-3'>
                            <h4>{book.publishedYear}</h4>
                            <h2 className='font-bold'>{book.title}</h2>
                            <h3 className='font-bold'>{book.author}</h3>
                            <h4>{book.ISBN}</h4>
                            {book.pages && <h4>{book.pages} pp.</h4>}
                            {/* <button
                              onClick={() => {
                                setForm({
                                  id: book.id,
                                  query: book.ISBN,
                                  status: book.status
                                })
                              }}
                              className='bg-blue-500 mr-3 px-3 text-white rounded'>
                              <h5>Update</h5>
                            </button> */}
                            <button
                              onClick={() => deleteBook(book.id)}
                              className='bg-red-500 px-3 text-white rounded'>
                              <h5>X</h5>
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <ul className='flex  flex-wrap border-b border-gray-600 p-2'>
              {books.map((book) => (
                <li key={book.id} className='p-2'>
                  <Link href={`/details/${book.id}`}>
                    {book.cover ? (
                      <Image
                        placeholder='empty'
                        alt={book.title || "book cover"}
                        width={180}
                        height={274}
                        src={`https://covers.openlibrary.org/b/id/${book.cover}-M.jpg`}
                        className='w-[180px] h-[274px] object-cover border-gray-500 border-solid border-2'
                      />
                    ) : (
                      <div className='w-[180px] h-[274px] border-gray-500 border-solid border-2 p-2 bg-slate-400'>
                        <h4>{book.title}</h4>
                        <h5>{book.author}</h5>
                      </div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Collection

export const getServerSideProps: GetServerSideProps = async () => {
  const books = await prisma.book.findMany({
    select: {
      id: true,
      ISBN: true,
      OLkey: true,
      status: true,

      title: true,
      author: true,

      cover: true,
      pages: true,
      publishedYear: true
    }
  })

  return {
    props: {
      books
    }
  }
}
