// Modules
import axios from "axios"
// Next/React
import { useState } from "react"
import { InferGetStaticPropsType } from "next"
import Image from "next/image"
// Prisma
import { prisma } from "@/lib/primsa"
// Components
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import UpdateButton from "@/components/UpdateButton"
import DeleteButton from "@/components/DeleteButton"
// Types
import { CollectionBook } from "@/lib/types"

import { motion, Variants } from "framer-motion"

// const cardVariants: Variants = {
//   twice: {
//     top: 20,
//     rotate: -3,
//     transition: {
//       type: "spring",
//       bounce: 0.3,
//       duration: 1
//     }
//   },
//   once: {
//     top: 0,
//     rotate: 3,
//     transition: {
//       type: "spring",
//       bounce: 0.2,
//       duration: 0.8
//     }
//   }
// }

interface Context {
  params: { id: string }
  locales: string
  locale: string
  defaultLocale: string
}

interface FormData {
  id: string
  status: string
  ISBN: string
  title: string
  author: string
  pages: string
  publishedYear: string
}

const Details = ({ book }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [form, setForm] = useState<FormData>("")
  const [imageLoading, setImageLoading] = useState(true)
  const [pulsing, setPulsing] = useState(true)

  const imageLoaded = () => {
    setImageLoading(false)
    setTimeout(() => setPulsing(false), 600)
  }
  return (
    <>
      <div className='min-w-[75%] w-auto  max-w-min mx-auto space-y-6 '>
        <div className='flex flex-col items-stretch h-full'>
          <div className='flex justify-center border-b border-gray-600 p-2'>
            <div className='flex  flex-wrap'>
              <div className='m-3  '>
                {book.cover ? (
                  <div
                    className={`${pulsing ? "pulse" : ""} loadable `}
                    style={{
                      width: "400px",
                      height: "600px",
                      background: "#cccccc3d"
                    }}>
                    <motion.div
                      className='card-container mx-8'
                      initial='once'
                      whileInView='twice'
                      viewport={{ once: true, amount: 0.8 }}>
                      <motion.div
                        className='card'
                        // variants={cardVariants}
                        initial={{ height: "600px", opacity: 0 }}
                        // style={{ height: imageLoading ? "6rem" : "auto" }}
                        animate={{
                          height: imageLoading ? "600px" : "auto",
                          opacity: imageLoading ? 0 : 1
                        }}
                        transition={{ opacity: { delay: 0.5, duration: 0.4 } }}>
                        <div className={book.status}>
                          <h4>{book.status}</h4>
                        </div>
                        <Image
                          onLoad={imageLoaded}
                          alt={book.title || "details cover"}
                          src={`https://covers.openlibrary.org/b/id/${book.cover}-L.jpg`}
                          className='w-[360px] h-[548px] object-cover border-gray-500 border-solid border-2'
                          width={360}
                          height={548}
                        />
                      </motion.div>
                    </motion.div>
                  </div>
                ) : (
                  <>
                    <div className={book.status}>
                      <h4>{book.status}</h4>
                    </div>
                    <div className='w-[360px] h-[548px] border-gray-500 border-solid border-2 p-2 bg-slate-400'>
                      <h2>{book.title}</h2>
                      <h3>{book.author}</h3>
                      <h3>{book.publishedYear}</h3>
                      <h5>(Not actual cover)</h5>
                    </div>
                  </>
                )}
              </div>
              <div className=''>
                <div className='border-b border-gray-500 my-4 p-2'>
                  <h2>{book.title}</h2>
                  <h2>{book.author}</h2>
                  <h3>
                    {book.publishedYear}, {book.pages} pp.
                  </h3>
                </div>
                <UpdateButton book={book} />
                <hr />
                <div className='border-b border-gray-500 my-4'>
                  <h3>Links</h3>
                  <div className='border-b border-gray-500'>
                    <ul>
                      <li className='m-2'>
                        <a
                          href={`https://trove.nla.gov.au/search/category/books?keyword=${book.ISBN}`}
                          target='_blank'
                          rel='noopener noreferrer'>
                          Trove Libraries
                        </a>
                      </li>
                      <li className='m-2'>
                        <a
                          href={`https://openlibrary.org${book.OLkey}`}
                          target='_blank'
                          rel='noopener noreferrer'>
                          Open Library
                        </a>
                      </li>
                      <li className='m-2'>
                        <a
                          href={`https://www.goodreads.com/search?q=${book.ISBN}`}
                          target='_blank'
                          rel='noopener noreferrer'>
                          GoodReads
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <h4>Last Updated: {book.updatedAt.slice(0, 10)}</h4>
                <DeleteButton book={book} />
              </div>
            </div>
          </div>
          {/* <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit(form)
            }}
            className='flex flex-col items-stretch'>
            <select
              name='status'
              id='status'
              placeholder={book.status}
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value
                })
              }>
              <option value='-'>Select Shelf</option>
              <option value='TBR'>TBR</option>
              <option value='READING'>Reading</option>
              <option value='READ'>Read</option>
              <option value='DNF'>DNF</option>
            </select>
            <input
              className='hidden'
              type='search'
              placeholder='Id'
              value={book.id}
            />
            <input
              type='search'
              placeholder={book.ISBN}
              value={form.ISBN}
              onChange={(e) =>
                setForm({
                  ...form,
                  ISBN: e.target.value
                })
              }
            />
            <input
              type='search'
              placeholder={book.title}
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value
                })
              }
            />
            <input
              type='search'
              placeholder={book.author}
              value={form.author}
              onChange={(e) =>
                setForm({
                  ...form,
                  author: e.target.value
                })
              }
            />
            <input
              type='search'
              placeholder={book.publishedYear}
              value={form.publishedYear}
              onChange={(e) =>
                setForm({
                  ...form,
                  publishedYear: e.target.value
                })
              }
            />
            <input
              type='search'
              placeholder={book.pages}
              value={form.pages}
              onChange={(e) =>
                setForm({
                  ...form,
                  pages: e.target.value
                })
              }
            />
            <button type='submit' className='bg-blue-300'>
              <h3>Update Book</h3>
            </button>
          </form> */}
        </div>
      </div>
      <Footer />
    </>
  )
}

export const getStaticProps = async (context: Context) => {
  const { id } = context.params
  const book = await prisma.book.findFirst({
    where: {
      id: Number(id)
    }
  })

  return {
    props: {
      book: JSON.parse(JSON.stringify(book))
    }
  }
}

export async function getStaticPaths() {
  const res = await axios(`http://localhost:3000/api/books`)
  const books = res.data

  const ids = books.map((book: CollectionBook) => book.id)
  const paths = ids.map((id: number) => ({ params: { id: id.toString() } }))

  return {
    paths,
    fallback: false
  }
}

export default Details
