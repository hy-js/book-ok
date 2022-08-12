import { getSession } from "next-auth/react"
// Modules
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import axios from "axios"
// Next/React
import { useState } from "react"
import { InferGetStaticPropsType } from "next"
import Image from "next/image"
// Prisma
import { prisma } from "@/lib/primsa"
// Components
import UpdateButton from "@/components/UpdateButton"
import DeleteButton from "@/components/DeleteButton"
// Types
import { CollectionBook } from "@/lib/types"

import { motion, Variants } from "framer-motion"



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
  const [imageLoading, setImageLoading] = useState(true);
  const [pulsing, setPulsing] = useState(true);
  const {
    data: interactions,
    isLoading,
    isError
  } = useQuery(['interaction'], async () => {
    return await axios(`/api/interaction/${book.id}`).then((res) => res.data);
  });

  const imageLoaded = () => {
    setImageLoading(false);
    setTimeout(() => setPulsing(false), 600);
  };

  if (isError) {
    return <h1> Sorry, there was an error </h1>;
  }

  if (isLoading) {
    return <h1> Loading...</h1>;
  }

  return (
    <>
      <div className='min-w-[80%] w-auto  max-w-min mx-auto space-y-6 '>
        <div className='flex flex-col items-stretch h-full justify-center'>
          <div className='flex justify-center border-b border-gray-600 m-2 p-2 '>
            <div className='flex flex-wrap justify-center'>
              <div>
                {book.cover ? (
                  <div className={`${pulsing ? 'pulse' : ''} loadable `}>
                    <motion.div
                      className='card-container mx-8'
                      initial='once'
                      whileInView='twice'
                      viewport={{ once: true, amount: 0.8 }}>
                      <motion.div
                        className='w-[360px] h-[548px]  '
                        initial={{ height: '600px', opacity: 0 }}
                        animate={{
                          height: imageLoading ? '600px' : 'auto',
                          opacity: imageLoading ? 0 : 1
                        }}
                        transition={{ opacity: { delay: 0.5, duration: 0.4 } }}>
                        {interactions.length > 0 && (
                          <div className={interactions?.[0].status} />
                        )}
                        <Image
                          layout='fixed'
                          placeholder='blur'
                          blurDataURL='data:...'
                          onLoad={imageLoaded}
                          alt={book.title || 'details cover'}
                          src={`https://covers.openlibrary.org/b/id/${book.cover}-L.jpg`}
                          width={360}
                          height={548}
                        />
                      </motion.div>
                    </motion.div>
                  </div>
                ) : (
                  <>
                    <div className='card-container mx-8'>
                      {interactions.length > 0 && (
                        <div className={interactions?.[0].status} />
                      )}
                      <div className='w-[360px] h-[548px] border-gray-500 border-solid border-2 p-2 bg-slate-400'>
                        <h2>{book.title}</h2>
                        <h3>{book.author}</h3>
                        <h5>(Not actual cover)</h5>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div>
                <div className='border-b border-gray-500 my-4 p-2'>
                  <h2 className='capitalize w-[360px]'>{book.title}</h2>
                  <h2>{book.author}</h2>
                  <h4>
                    {book.ISBN} ISBN {book.ISBN.length}
                  </h4>
                  <h4>{book.publishedYear}</h4>
                  <h4>{book.pages} pp.</h4>
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
              </div>
            </div>
          </div>
          {interactions.length > 0 && (
            <>
              {interactions.map((interaction) => (
                <div
                  key={interaction.id}
                  className='min-w-[80%] w-auto  max-w-min mx-auto my-2'>
                  <h4>{interaction.userId}</h4>
                  <h5 className={interaction.status}>
                    {interaction.status}{' '}
                    {moment(interaction.createdAt).format('DD-MM-YYYY')}
                  </h5>
                </div>
              ))}
              {/* <DeleteButton book={book} /> */}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async (context: Context) => {
  const { id } = context.params;
  const book = await prisma.book.findFirst({
    where: {
      id: id
    }
  });

  return {
    props: {
      book: JSON.parse(JSON.stringify(book))
      // interactions: JSON.parse(JSON.stringify(interactions))
    }
  };
};

export async function getStaticPaths() {
  const res = await axios(`http://localhost:3000/api/books`);
  const books = res.data;

  const ids = books.map((book: CollectionBook) => book.id);
  const paths = ids.map((id: string) => ({ params: { id: id } }));

  return {
    paths,
    fallback: false
  };
}



























export default Details