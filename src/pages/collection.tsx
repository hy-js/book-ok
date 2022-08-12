// Next/React
import { getSession } from "next-auth/react"
import { GetServerSideProps } from "next"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import moment from 'moment';

// Prisma
import { prisma } from '@/lib/primsa';
// Components
import SearchbarShelves from '@/components/SearchbarShelves';
import BookCover from '@/components/BookCover';

// Types
import { CollectionBook } from '@/lib/types';

const Collection = ({ books, interactions, profiles }) => {
  const [view, setView] = useState(false);
  // searching
  const [searchTerm, setSearchTerm] = useState('');
  // sorting
  const [data, setData] = useState([]);
  const [sortType, setSortType] = useState('createdAt');
  useEffect(() => {
    const sortArray = (type: string) => {
      const types = {
        createdAt: 'createdAt',
        pages: 'pages',
        title: 'title',
        author: 'author'
      };
      const sortProperty = types[type];
      console.log(sortProperty);
      if (sortProperty === 'pages' || sortProperty === 'createdAt') {
        const sorted: CollectionBook[] = [...books].sort(
          (a, b) => a[sortProperty] - b[sortProperty]
        );
        setData(sorted);
      } else {
        const sorted: CollectionBook[] = [...books].sort((a, b) =>
          a[sortProperty].localeCompare(b[sortProperty])
        );
        setData(sorted);
      }
    };

    sortArray(sortType);
  }, [sortType]);

  return (
    <main className='mb-auto h-max'>
      <div className='min-w-[80%] w-auto max-w-min mx-auto space-y-6 '>
        <h2 className='bg-gray-200 bg-orange-200 capitalize'>
          Community
        </h2>
        <h2 className='bg-gray-200 capitalise'>Users</h2>
        <ul className='flex  flex-wrap border-b border-gray-600 p-2 '>
          {profiles.map((profile) => (
            <>
              <Link href={`/profile/${profile.id}`} key={profile.id}>
                <Image
                  key={profile.id}
                  alt={profile.name}
                  src={profile.image}
                  className=' rounded-full cursor-pointer mx-2'
                  width={100}
                  height={100}
                />
              </Link>
              <ul className="flex flex-col justify-center">
                {interactions.slice(0, 1).map(
                  (interaction) =>
                    interaction.userId === profile.id && (
                      <>
                        <li className="text-xl bold capitalize">{interaction.book.title}</li>
                        <li className={interaction.status}>
                          {interaction.status}
                        </li>
                        <li>{moment(interaction.createdAt).fromNow()}</li>
                      </>
                    )
                )}
              </ul>
            </>
          ))}
        </ul>
        <div className='flex flex-col items-stretch h-full'>
        <h2 className='bg-gray-200 capitalise'>Sort Entire Collection</h2>
          <div className='mb-6 flex flex-col'>
            <button
              className='bg-slate-800 text-white rounded p-1'
              onClick={() => setView(!view)}>
              <h5>Change View</h5>
            </button>

            <select onChange={(e) => setSortType(e.target.value)}>
              <option value='createdAt'>Added</option>
              <option value='pages'>Pages</option>
              <option value='title'>Title</option>
              <option value='author'>Author</option>
            </select>
          </div>
          {view ? (
            <>
              <div className='mb-6 flex flex-col'>
                <h2 className='bg-gray-200  capitalize'>Search Collection</h2>
                <input
                  autoFocus
                  type='search'
                  placeholder='Author or title...'
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <ul className='flex flex-col'>
                {data
                  .filter((val: CollectionBook) => {
                    if (searchTerm === '') {
                      return val;
                    } else if (
                      val.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      val.author
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .map((book: CollectionBook) => (
                    <li key={book.id} className='border-b border-gray-600 p-2'>
                      <Link href={`/details/${book.id}`}>
                        <div className='flex justify-between'>
                          <div className='flex'>
                            {book.cover ? (
                              <>
                                <Image
                                  alt={book.title || 'book cover'}
                                  src={`https://covers.openlibrary.org/b/id/${book.cover}-M.jpg`}
                                  className='w-[180px] h-[274px] object-cover border-gray-500 border-solid border-2'
                                  width={180}
                                  height={274}
                                />
                              </>
                            ) : (
                              <>
                                <div className='w-[180px] h-[274px] border-gray-500 border-solid border-2 p-2 bg-slate-400'>
                                  <h4>{book.title}</h4>
                                  <h5>{book.author}</h5>
                                </div>
                              </>
                            )}
                            <div className='flex-col p-3 '>
                              <h4>{book.publishedYear}</h4>
                              <h2 className='font-bold'>{book.title}</h2>
                              <h3 className='font-bold'>{book.author}</h3>
                              <h4>{book.ISBN}</h4>
                              {book.pages && <h4>{book.pages} pp.</h4>}
                              {/* <UpdateButton book={book} /> */}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
              </ul>
            </>
          ) : (
            <>
              {/* <div className='mb-4 flex flex-col'>
                <h2 className='bg-gray-200  capitalize'>Add to collection</h2>
                <SearchbarShelves />
              </div> */}
              <ul className='flex  flex-wrap border-b border-gray-600 p-2'>
                {data.map((book) => (
                  <BookCover interaction={book} book={book} key={book.id} />
                ))}
              </ul>
              <h2 className='capitalize'>{data.length} Total</h2>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Collection;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  const books = await prisma.book.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  if (!session) {
    return {
      props: {
        session: null,
        books: JSON.parse(JSON.stringify(books))
      }
    };
  }

  let profiles = await prisma.user.findMany({
    where: {
      NOT: {
        id: session.user.id
      }
    }
  });
  console.log(profiles);
  let interactions = await prisma.interaction.findMany({
    select: {
      userId: true,
      status: true,
      book: true
    },
    where: {
      status: {
        not: "COLLECTION",
      },
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return {
    props: {
      session,
      books: JSON.parse(JSON.stringify(books)),
      interactions: JSON.parse(JSON.stringify(interactions)),
      profiles: JSON.parse(JSON.stringify(profiles))
    }
  };
};






































