import Head from "next/head"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import useDebounce from "../hooks/useDebounce"
import axios from "axios"

import Header from "../components/Header"
import Footer from "../components/Footer"

import { OLBOOK } from "../lib/types"

const Search = () => {
  const router = useRouter()

  const [query, setQuery] = useState("")
  const [books, setBooks] = useState<OLBOOK[]>([])
  const [search, setSearch] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const debouncedSearch = useDebounce(search, 500)

  useEffect(() => {
    // search the api

    async function fetchData() {
      setLoading(true)

      setBooks([])

      const data = await fetch(
        `https://openlibrary.org/search.json?q=${debouncedSearch}&limit=50&language=eng`
      ).then((res) => res.json())
      setBooks(data.docs)
      setLoading(false)
    }

    if (debouncedSearch) fetchData()
  }, [debouncedSearch])

  const createBook = async (query: string,) => {
    try {
      console.log(query)
      await axios({
        method: "post",
        url:
          "http://localhost:3000/api/create",
        headers: {},
        data: {
          query
        }
      })
      await router.push('/collection/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className="mb-auto h-1">
      <div className='min-w-[80%] w-auto  max-w-min mx-auto space-y-6'>
        <Header />
        <div className='flex flex-col items-stretch h-full'>
          <>
            <h2 className='TBR capitalize'>
              {books.length} Open Library results
            </h2>
            <input
              autoFocus
              type='search'
              placeholder='Search books, authors, etc...'
              onChange={(e) => setSearch(e.target.value)}
            />

            {loading && <h3>Loading<span className="animate:pulse">...</span></h3>}
            <ul className='flex flex-col'>
              {books.map((book) => (
                <li key={book.key} className='border-b border-gray-600 p-2'>
                  <div className='flex justify-between'>
                    <div className='flex'>
                      <a
                        href={`https://openlibrary.org${book.key}`}
                        target='_blank'
                        rel='noopener noreferrer'>
                        {book.cover_i ? (
                          <>
                            <Image
                              alt={book.title || "book cover"}
                              src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                              className='w-[180px] h-[274px] object-cover border-gray-500 border-solid border-2'
                              width={180}
                              height={274}
                            />
                          </>
                        ) : (
                          <>
                            <div className='w-[180px] h-[274px] border-gray-500 border-solid border-2 p-2 bg-slate-400'>
                              <h4>{book.title}</h4>
                              <h5>{book.author_name?.[0]}</h5>
                            </div>
                          </>
                        )}
                      </a>
                      <div className='flex-col p-3'>
                        <h4>{book.first_publish_year}</h4>
                        <h2 className='font-bold'>{book.title}</h2>
                        <h3 className='font-bold'>{book.author_name?.[0]}</h3>
                        <h4>{book.isbn?.[0]}</h4>
                        {book.number_of_pages_median && (
                          <h4>{book.number_of_pages_median} pp.</h4>
                        )}
                        <button
                          onClick={() => {
                            setQuery(book.title + book.isbn?.[0])
                            createBook(query)
                          }}
                          className='bg-blue-300 mr-3 px-3 text-white rounded'>
                          <h5>Add to Collection</h5>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default Search
