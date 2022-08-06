import { useEffect, useState } from "react"
import useDebounce from "../hooks/useDebounce"

import { OLBOOK } from "../lib/types"
import BooklistSmall from "./BooklistSmall"

const SearchbarShelves = () => {
  const [books, setBooks] = useState<OLBOOK[]>([])
  const [search, setSearch] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const debouncedSearch = useDebounce(search, 500)
  useEffect(() => {
    async function fetchData() {
      setLoading(true)

      setBooks([])

      const data = await fetch(
        `https://openlibrary.org/search.json?q=${debouncedSearch}&limit=3&language=eng`
      ).then((res) => res.json())
      setBooks(data.docs)
      setLoading(false)
    }

    if (debouncedSearch) fetchData()
  }, [debouncedSearch])
  return (
    <div className='flex flex-col items-stretch'>
      <input
        autoFocus
        type='search'
        placeholder='Add book...'
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && (
        <h3>
          Loading<span className='animate:pulse'>...</span>
        </h3>
      )}
      {books && <BooklistSmall books={books} />}
    </div>
  )
}

export default SearchbarShelves
