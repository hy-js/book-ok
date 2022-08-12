import { getSession } from 'next-auth/react';

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
  const { id } = context.params;
  const session = await getSession(context);

  if (!session) {
    return {
      props: {
        session: null
      }
    };
  }

  const profile = await prisma.user.findUnique({
    where: {
      id: id
    },
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
      userId: id
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

