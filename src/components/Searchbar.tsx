import { useEffect, useState } from "react"
import useDebounce from "../hooks/useDebounce"

import { OLBOOK } from "../lib/types"
import Booklist from "./Booklist"

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

const Searchbar = ({ myBooks }: Books) => {
  const [books, setBooks] = useState<OLBOOK[]>([])
  const [search, setSearch] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const debouncedSearch = useDebounce(search, 500)
  useEffect(() => {
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

  return (
    <>
      <h2 className='bg-gray-200  capitalize'>
        {books.length} Results
      </h2>
      <input
        autoFocus
        type='search'
        placeholder='Search books, authors, etc...'
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && (
        <h3>
          Loading<span className='animate:pulse'>...</span>
        </h3>
      )}
      {books && <Booklist books={books} myBooks={myBooks} />}
    </>
  )
}

export default Searchbar
