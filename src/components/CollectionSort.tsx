import { useEffect, useState } from "react"

import Image from "next/image"

import axios from "axios"

// Types
import { CollectionBook } from "@/lib/types"

const CollectionSort = (props: { books: OLBOOK[] }) => {
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
    <>
      <h2 className='bg-gray-200  capitalize'>Sort Entire Collection</h2>

      <select onChange={(e) => setSortType(e.target.value)}>
        <option value='createdAt'>Added</option>
        <option value='pages'>Pages</option>
        <option value='title'>Title</option>
        <option value='author'>Author</option>
      </select>
    </>
  )
}

export default CollectionSort
