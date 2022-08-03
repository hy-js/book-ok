import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Image from "next/image"

import Header from "../../components/Header"
import Footer from "../../components/Footer"

interface Book {
  id: string
  ISBN: string
  OLkey: string
  status: string

  title: string
  author: string

  cover: string
  publishedYear: string
  pages: string
  createdAt: string
  updatedAt: string
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

const Details = () => {
  const router = useRouter()
  const { id } = router.query
  const [details, setDetails] = useState<Book>()
  const [form, setForm] = useState<FormData>({
    id: "",
    status: "",
    ISBN: "",
    title: "",
    author: "",
    pages: "",
    publishedYear: ""
  })

  const updateBook = async (data: FormData) => {
    try {
      fetch("http://localhost:3000/api/update", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      }).then(() => {})
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (data: FormData) => {
    try {
      updateBook(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(`http://localhost:3000/api/book/${id}`).then(
        (res) => res.json()
      )
      setDetails(data)
    }

    fetchData()
  }, [])
  console.log(details)

  const deleteBook = async (BookId: string) => {
    try {
      fetch(`http://localhost:3000/api/book/${BookId}`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "DELETE"
      }).then(() => router.push("/collection"))
    } catch (error) {
      console.log("error")
    }
  }

  return (
    <>
      <div className='min-w-[80%] w-auto  max-w-min mx-auto space-y-6 '>
        <Header />

        <div className='flex flex-col items-stretch h-full'>
          <h2 className={details?.status}>{details?.status}</h2>
          <div className='flex justify-center border-b border-gray-600 p-2'>
            <div className='flex-col'>
              <a
                href={`https://openlibrary.org${details?.OLkey}`}
                target='_blank'
                rel='noopener noreferrer'>
                {details?.cover ? (
                  <>
                    <Image
                      alt={details?.title || "details cover"}
                      src={`https://covers.openlibrary.org/b/id/${details?.cover}-L.jpg`}
                      className='w-[360px] h-[548px] object-cover border-gray-500 border-solid border-2'
                      width={360}
                      height={548}
                    />
                  </>
                ) : (
                  <>
                    <div className='w-[360px] h-[548px] border-gray-500 border-solid border-2 p-2 bg-slate-400'>
                      <h2>{details?.title}</h2>
                      <h3>{details?.author}</h3>
                      <h3>{details?.publishedYear}</h3>
                      <h5>(Not actual cover)</h5>
                    </div>
                  </>
                )}
              </a>
              <h4>Last Updated: {details?.updatedAt.slice(0, 10)}</h4>
              <button
                onClick={() => deleteBook(details?.id)}
                className='bg-red-500 px-3 text-white rounded'>
                <h5>Delete Book</h5>
              </button>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit(form)
            }}
            className='flex flex-col items-stretch'>
            <select
              name='status'
              id='status'
              placeholder={details?.status}
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
              value={details?.id}
            />
            <input
              type='search'
              placeholder={details?.ISBN}
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
              placeholder={details?.title}
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
              placeholder={details?.author}
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
              placeholder={details?.publishedYear}
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
              placeholder={details?.pages}
              value={form.pages}
              onChange={(e) =>
                setForm({
                  ...form,
                  pages: e.target.value
                })
              }
            />
            <button type='submit' className='bg-blue-300'>
              <h3>Submit</h3>
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default Details
