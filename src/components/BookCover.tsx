import { motion } from "framer-motion"
import moment from "moment";
import Image from "next/image"
import Link from "next/link"
// Types


const BookCover = ({ interaction, book, time }) => {

  return (
    <Link href={`/details/${book.id}`} key={book.id}>
      <li className='p-2 '>
        {book.cover ? (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            {time && <h5>{moment(interaction.createdAt).fromNow()}</h5>}
            <div className={interaction.status} />
            <Image
              layout='fixed'
              alt={book.title || "book cover"}
              width={180}
              height={274}
              src={`https://covers.openlibrary.org/b/id/${book.cover}-M.jpg`}
              className='border-gray-500 border-solid border-2 cursor-pointer '
            />
          </motion.div>
        ) : (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            {time && <h5>{moment(interaction.createdAt).fromNow()}</h5>}
            <div className={interaction.status} />
            <div className='w-[180px] h-[274px] border-gray-500 border-solid border-2 p-2 bg-slate-400'>
              <h4>{book.title}</h4>
              <h5>{book.author}</h5>
            </div>
          </motion.div>
        )}
      </li>
    </Link>
  )
}

export default BookCover
