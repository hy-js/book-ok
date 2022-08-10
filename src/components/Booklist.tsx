import { useState } from "react"
import { motion } from "framer-motion"

import Image from "next/image"
import { useRouter } from "next/router"

import axios from "axios"

import { OLBOOK } from "../lib/types"
import AddButton from "./AddButton"

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

const Booklist = (props: { books: OLBOOK[]; myBooks: Books }) => {
  return (
    <motion.article
      layout
      transition={{ duration: 0.8 }}
      animate={{ x: 0, opacity: 1 }}
      initial={{ x: 300, opacity: 0 }}
      exit={{ x: -300, opacity: 0 }}>
      <ul className='flex flex-col'>
        {props.books.map((book) => (
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
                      <div className={book.status} />

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
                  <AddButton book={book} myBooks={props.myBooks} />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </motion.article>
  )
}

export default Booklist
