import { useState } from "react"

import Image from "next/image"

import axios from "axios"

import { OLBOOK } from "../lib/types"
import AddButton from "./AddButton"

const BooklistSmall = (props: { books: OLBOOK[] }) => {
  return (
    <ul className='flex flex-col border border-gray-600 bg-gray-100'>
      {props.books.map((book) => (
        <li key={book.key} className='border-b border-gray-600 p-2 relative'>
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
                      className='object-cover border-gray-500 border-solid border-2'
                      width={45}
                      height={69}
                    />
                  </>
                ) : (
                  <>
                    <div className='w-[45px] h-[69px] border-gray-500 border-solid border-2 p-2 bg-slate-400'></div>
                  </>
                )}
              </a>
              <div className='flex-col p-3'>
                <p className='font-bold'>
                  {book.title} - {book.author_name?.[0]}
                </p>
                <AddButton book={book} />
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default BooklistSmall
