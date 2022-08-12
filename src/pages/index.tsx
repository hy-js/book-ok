import Head from 'next/head';
import { getSession } from 'next-auth/react';
import { useState } from 'react';
import { prisma } from '../lib/primsa';

import LoginButton from '../components/LoginButton';

export default function Home({ session, profile }) {
  const [editing, setEditing] = useState(false);
  return (
    <div className=''>
      <Head>
        <title>Book OK</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='mb-auto h-max'>
        <div className=' min-w-[80%] w-auto  max-w-min mx-auto space-y-6 '>
          <div className='flex flex-col items-stretch h-full'>
            <h2 className='bg-gray-200 capitalise border-b '>Welcome</h2>
            <ul className='flex flex-col flex-wrap border-b border-gray-600 p-2 '>
              <li className='p-2'>
                <h3>Profile - track your reading with stats</h3>
              </li>
              <li className='p-2'>
                <h3>Shelve - list your books</h3>
              </li>
              <li className='p-2'>
                <h3>Search - find more books</h3>
              </li>
              <li className='p-2 '>
                <h3>Collect - organise your colelction</h3>
              </li>
            </ul>
            <h2 className='bg-gray-200 capitalise '>Account</h2>
            <ul className='flex flex-col flex-wrap border-b border-gray-600 p-2 '>
              <li>{profile.name}</li>
              <li>{profile.readingGoal}</li>
              <li className='p-2'>
                <LoginButton />
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
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
    where: { id: session.user.id }
  });

  return {
    props: {
      session,
      profile: JSON.parse(JSON.stringify(profile))
    }
  };
};

