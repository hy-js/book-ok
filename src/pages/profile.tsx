import { getSession, signIn, signOut } from "next-auth/react"

import Image from 'next/image';
import { prisma } from '@/lib/primsa';
import { motion } from 'framer-motion';
import BookCover from '@/components/BookCover';

export interface Profile {
  id: number;
  username: string;
  readingGoal: number;
}

const config = {
  type: 'spring',
  damping: 20,
  stiffness: 100
};

export default function Home({ profile, interactions }) {
  // Stats Logic
  // CHALLENGE
  const year = new Date().getFullYear()
  const READ = interactions.filter((book) => book.status === "READ")
  const readThisYear = READ.filter((book) => book.createdAt.includes(year))
  // RATE
  let now = new Date()
  let onejan = new Date(now.getFullYear(), 0, 1)
  let week = Math.ceil(((now.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7)
  let rate = 0
  const percentYear = week / 52
  const projected = percentYear * profile.readingGoal
  const amount = projected - readThisYear.length
  if (Math.sign(amount) === 1) {
    rate = `${Math.floor(amount)} books behind schedule!`
  } else if (Math.sign(amount) === -1) {
    rate = `${Math.ceil(-amount)} books ahead of schedule!`
  } else {
    rate = `Right on schedule!`
  }
  // Pages
  const totalPages = readThisYear.reduce((accum, item) => (item.book.pages !== null ? accum + item.book.pages : accum + 0),0)
  // Pages max
  const pageArray = [...readThisYear].map((o) => o.book.pages)
  const max = Math.max.apply(null, pageArray.filter(Boolean))
  const min = Math.min.apply(null, pageArray.filter(Boolean))
  // DECADES
  let years = readThisYear.map((item) => {
    return item.book["publishedYear"]
  })
  let allDecades: any[] = []
  years.forEach((year) => {
    allDecades.push(Math.floor(year / 10) * 10)
  })
  allDecades.sort()
  const decades = [...new Set(allDecades)]

  return (
    <main className='mb-auto h-max'>
      <div className=' min-w-[80%] w-auto  max-w-min mx-auto space-y-6 '>
        <motion.div
          className=' bg-yellow-200 text-center '
          transition={config}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ x: 0, opacity: 0 }}>
          <Image
            alt={profile.name}
            src={profile.image}
            className=' rounded-full'
            width={100}
            height={100}
          />
          <h2 className='capitalize'> {profile.name}</h2>
        </motion.div>
        <div className='flex flex-col items-stretch h-full'>
          <>
            <h2 className='bg-gray-200 capitalise '>Stats</h2>
            <ul className='flex flex-col flex-wrap border-b border-gray-600 p-2 '>
            <li className='p-2'>
                <h3>Reading Challenge</h3>
                <div className='flex flex-wrap '>
                  {[...Array(readThisYear.length)].map((e, i) => (
                    <h3 className='text-red-800' key={i}>
                      ♦
                    </h3>
                  ))}
                  {[...Array(profile.readingGoal - readThisYear.length)].map(
                    (e, i) => (
                      <h3 key={i}>♦</h3>
                    )
                  )}
                  <h3 className='mx-4'>
                    {readThisYear.length}/{profile.readingGoal}
                  </h3>
                </div>
                <h4>{rate}</h4>
              </li>
              <li className='p-2'>
                <h3>Pages Read</h3>
                <h4>
                  {readThisYear.length} books totalling {totalPages} pp.
                </h4>
                <h4>
                  That's {Math.floor(totalPages / readThisYear.length)} pp.
                  average per book
                </h4>
              </li>
              <li className='p-2'>
                <h3>The Long and Short of It</h3>
                <h4>Longest book is {max} pp.</h4>
                <h4>Shortest book is {min} pp.</h4>
              </li>
              <li className='p-2 '>
                <h3>Decades Read</h3>
                <div className='flex'>
                  {decades.map((decade) => (
                    <>
                      <h4>-</h4>
                      <h4>{decade}</h4>
                      <h4>-</h4>
                    </>
                  ))}
                </div>
              </li>
            </ul>
            <h2 className='bg-gray-200 capitalise'>Activity</h2>
            <ul className='flex  flex-wrap border-b border-gray-600 p-2 '>
              {interactions.map((book) => (
                <BookCover
                  time={true}
                  interaction={book}
                  book={book.book}
                  key={book.id}
                  showStats={true}
                />
              ))}
            </ul>
          </>
        </div>
      </div>
    </main>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      props: {
        session: null
      }
    };
  }

  const profile = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      readingGoal: true,
      image: true
    }
  });

  let interactions = await prisma.interaction.findMany({
    where: {
      NOT: {
        status: "COLLECTION"
      },
      userId: profile.id
    },
    include: {
      book: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });



  return {
    props: {
      session,
      profile: JSON.parse(JSON.stringify(profile)),
      interactions: JSON.parse(JSON.stringify(interactions))
    }
  };

};