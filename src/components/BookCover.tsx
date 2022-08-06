// Next/React
import Image from "next/image"
import Link from "next/link"
// Types
import { CollectionBook } from "../lib/types"

const BookCover = ({ book }: CollectionBook) => {
  return (
    <Link href={`/details/${book.id}`} key={book.id}>
      <li className='p-2 '>
        {book.cover ? (
          <>
            {/* <h5>{book.updatedAt.slice(0, 10)}</h5> */}
            <div className={book.status} />
            <Image
              placeholder='empty'
              alt={book.title || "book cover"}
              width={180}
              height={274}
              src={`https://covers.openlibrary.org/b/id/${book.cover}-M.jpg`}
              className='border-gray-500 border-solid border-2 cursor-pointer'
            />
          </>
        ) : (
          <>
            {/* {showStats && (
              <>
                <h5>{book.updatedAt.slice(0, 10)}</h5>
                <h5 className={book.status}>{book.status}</h5>
              </>
            )} */}
            <div className={book.status} />
            <div className='w-[180px] h-[274px] border-gray-500 border-solid border-2 p-2 bg-slate-400'>
              <h4>{book.title}</h4>
              <h5>{book.author}</h5>
            </div>
          </>
        )}
      </li>
    </Link>
  )
}

export default BookCover
